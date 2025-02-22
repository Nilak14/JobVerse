"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { handleError } from "@/lib/utils";
import { ChangePasswordSchema } from "@/schema/JobSeekerSettingSchema";
import { createSafeActionClient } from "next-safe-action";
import bcrypt from "bcryptjs";

const action = createSafeActionClient();

export const changePassword = action
  .schema(ChangePasswordSchema)
  .action(
    async ({
      parsedInput: { confirmPassword, currentPassword, newPassword },
    }) => {
      try {
        if (newPassword !== confirmPassword) {
          throw new Error("New and Confirm Password do not match");
        }
        const session = await auth();
        if (!session || !session.user) {
          throw new Error("Not Authorized");
        }
        if (session.user.isOAuthUser) {
          throw new Error("OAuth User cannot change password");
        }
        const user = await prisma.user.findUnique({
          where: { id: session.user.id },
        });
        if (!user) {
          throw new Error("User not found");
        }

        if (!user.password) {
          throw new Error("Password not found");
        }

        const isPasswordValid = await bcrypt.compare(
          currentPassword,
          user.password
        );
        if (!isPasswordValid) {
          throw new Error("Current Password is incorrect");
        }

        const isPasswordSame = await bcrypt.compare(newPassword, user.password);

        if (isPasswordSame) {
          throw new Error("New Password cannot be same as Current Password");
        }

        // change password

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await prisma.user.update({
          where: { id: user.id },
          data: {
            password: hashedPassword,
          },
        });
        return { success: true, message: "Password Changed Successfully" };
      } catch (error) {
        return handleError({ error: error, errorIn: "Change Password Action" });
      }
    }
  );
