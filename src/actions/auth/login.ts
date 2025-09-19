"use server";

import { getUserByEmail } from "@/data-access/user";
import { LoginSchema } from "@/schema/LoginSchema";
import { createSafeActionClient } from "next-safe-action";
import bcrypt from "bcryptjs";
import { signIn } from "@/auth";
import {
  DEFAULT_LOGIN_REDIRECT_ADMIN,
  DEFAULT_LOGIN_REDIRECT_EMPLOYER,
  DEFAULT_LOGIN_REDIRECT_JOB_SEEKER,
} from "@/routes";
import { AuthError } from "next-auth";
import { sendTwoFactorCode } from "./sendTwoFactorCode";
import { getTwoFactorTokenByEmail } from "@/data-access/tokens/twoFactorToken";
import prisma from "@/lib/prisma";
import { getTwoFactorConfirmationByUserId } from "@/data-access/tokens/twoFactorConfirmation";
import { after } from "next/server";
import { storeUserLocation } from "../user/storeLoc";
const action = createSafeActionClient();

export const login = action
  .schema(LoginSchema)
  .action(
    async ({
      parsedInput: { identifier, password, code, latitude, longitude },
    }) => {
      const existingUser = await getUserByEmail(identifier);

      if (!existingUser || !existingUser.email || !existingUser.password) {
        return { error: "Invalid Credentials" };
      }
      const isPasswordValid = await bcrypt.compare(
        password,
        existingUser.password
      );

      if (!isPasswordValid) {
        return { error: "Invalid Credentials" };
      }
      //todo: check for email verified or not and send email verification link
      const isEmailVerified = existingUser.emailVerified;
      if (!isEmailVerified) {
        return { error: "e" };
      }

      //todo: check if two factor is on or off and send token according to that

      const isTwoFactorEnabled = existingUser.isTwoFactorEnabled;

      if (isTwoFactorEnabled && existingUser.email && existingUser.password) {
        if (code) {
          // verify code
          const dbToken = await getTwoFactorTokenByEmail(existingUser.email);
          if (!dbToken) {
            return { error: "Code Not Valid" };
          }
          if (dbToken.token !== code) {
            return { error: "Invalid Code Provided" };
          }
          const hasExpired = new Date(dbToken.expires) < new Date();

          if (hasExpired) {
            return { error: "Code has expired, Please request a new one" };
          }

          await prisma.twoFactorToken.delete({
            where: { id: dbToken.id },
          });

          const existingConfirmation = await getTwoFactorConfirmationByUserId(
            existingUser.id
          );

          if (existingConfirmation) {
            await prisma.twoFactorConfirmation.delete({
              where: { id: existingConfirmation.id },
            });
          }
          await prisma.twoFactorConfirmation.create({
            data: {
              userId: existingUser.id,
            },
          });
        } else {
          // send two factor code
          const res = await sendTwoFactorCode(existingUser.email);
          if (res.error) {
            return { error: res.error };
          } else {
            return { twoFactor: true };
          }
        }
      }

      let redirectLink;
      if (existingUser.userType === "JOB_SEEKER") {
        redirectLink = DEFAULT_LOGIN_REDIRECT_JOB_SEEKER;
      } else if (existingUser.userType === "EMPLOYER") {
        redirectLink = DEFAULT_LOGIN_REDIRECT_EMPLOYER;
      } else if (existingUser.userType === "ADMIN") {
        redirectLink = DEFAULT_LOGIN_REDIRECT_ADMIN;
      } else {
        redirectLink = "/choose";
      }

      after(async () => {
        if (latitude && longitude) {
          await storeUserLocation({
            latitude,
            longitude,
            userId: existingUser.id,
          });
        }
      });

      try {
        await signIn("credentials", {
          identifier,
          password,
          redirect: false, // Disable automatic redirection
        });
        return { redirectLink };
      } catch (error) {
        if (error instanceof AuthError) {
          switch (error.type) {
            case "CredentialsSignin":
              return { error: "Invalid Credentials" };
            case "AccessDenied":
              return { error: error.cause?.err?.message };
            default:
              return { error: "Something went wrong" };
          }
        }
        throw error;
      }
    }
  );
