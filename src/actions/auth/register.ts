"use server";
import { getUserByEmail } from "@/data-access/user";
import { RegisterSchema } from "@/schema/RegisterSchema";
import { createSafeActionClient } from "next-safe-action";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { sendEmailVerificationLink } from "@/lib/emails";
import { generateEmailVerificationToken } from "@/lib/token";
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
      const token = await generateEmailVerificationToken(email);
      if (token === null) {
        return { error: "Error Generating Token" };
      }
      console.log("token generated");

      const error = await sendEmailVerificationLink({ email, name, token });
      if (error) {
        return { error: "Error Sending Email" };
      }
      console.log("email sent");

      return { success: "Confirmation Email Sent, Please Check Your Email" };
    }
  );
