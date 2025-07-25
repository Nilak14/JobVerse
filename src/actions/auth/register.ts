"use server";
import { getUserByEmail } from "@/data-access/user";
import { RegisterSchema } from "@/schema/RegisterSchema";
import { createSafeActionClient } from "next-safe-action";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { sendEmailVerificationLink } from "./sendEmailVerification";
import { after } from "next/server";
import { discordNewUserRegisterBot } from "../discord_bot/bot";
const action = createSafeActionClient();
export const register = action
  .schema(RegisterSchema)
  .action(
    async ({
      parsedInput: { confirmPassword, email, name, password, userType },
    }) => {
      const existingUser = await getUserByEmail(email);

      if (existingUser) {
        return {
          error: "Email Is already in use",
        };
      }

      if (password !== confirmPassword) {
        return { error: "Passwords do not match" };
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      try {
        await prisma.$transaction(async (prisma) => {
          const newUser = await prisma.user.create({
            data: {
              email,
              name,
              password: hashedPassword,
              userType,
            },
          });

          if (userType === "JOB_SEEKER") {
            await prisma.jOB_SEEKER.create({
              data: {
                userId: newUser.id,
                JobSeekerProfile: {
                  create: {},
                },
              },
            });
          } else if (userType === "EMPLOYER") {
            await prisma.employer.create({
              data: {
                userId: newUser.id,
              },
            });
          }
        });

        const res = await sendEmailVerificationLink(email, name);
        after(async () => {
          await discordNewUserRegisterBot({ name, email, role: userType });
        });
        if (res.success) {
          return { success: res.success };
        } else {
          return { error: res.error };
        }
      } catch (error) {
        return {
          error: "Couldn't register you at a moment, please try again later",
        };
      }
    }
  );
