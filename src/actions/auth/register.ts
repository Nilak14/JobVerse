"use server";
import { getUserByEmail } from "@/data-access/user";
import { RegisterSchema } from "@/schema/RegisterSchema";
import { createSafeActionClient } from "next-safe-action";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { sendEmailVerificationLink } from "@/lib/emails";
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
      await prisma.user.create({
        data: {
          email,
          name,
          password: hashedPassword,
          userType,
        },
      });
      sendEmailVerificationLink({ email, name, token: "token" });
      return { success: "Confirmation Email Sent, Please Check Your Email" };
    }
  );
