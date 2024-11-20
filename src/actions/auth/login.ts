"use server";

import { getUserByEmail } from "@/data-access/user";
import { LoginSchema } from "@/schema/LoginSchema";
import { createSafeActionClient } from "next-safe-action";
import bcrypt from "bcryptjs";
import { signIn } from "@/auth";
import {
  DEFAULT_LOGIN_REDIRECT_ADMIN,
  DEFAULT_LOGIN_REDIRECT_COMPANY,
  DEFAULT_LOGIN_REDIRECT_JOB_SEEKER,
} from "@/routes";
import { AuthError } from "next-auth";
const action = createSafeActionClient();

export const login = action
  .schema(LoginSchema)
  .action(async ({ parsedInput: { identifier, password } }) => {
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

    let redirectLink;
    if (existingUser.userType === "JOB_SEEKER") {
      redirectLink = DEFAULT_LOGIN_REDIRECT_JOB_SEEKER;
    } else if (existingUser.userType === "COMPANY") {
      redirectLink = DEFAULT_LOGIN_REDIRECT_COMPANY;
    } else if (existingUser.userType === "ADMIN") {
      redirectLink = DEFAULT_LOGIN_REDIRECT_ADMIN;
    } else {
      redirectLink = "/choose";
    }

    try {
      await signIn("credentials", {
        identifier,
        password,
        redirectTo: redirectLink,
      });
      return { success: "Logged In Successfully" };
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
  });
