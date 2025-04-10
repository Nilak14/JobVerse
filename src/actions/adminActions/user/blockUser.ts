"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { handleError } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export const blockUser = async (userId: string) => {
  try {
    const session = await auth();
    if (!session || session.user.type !== "ADMIN") {
      throw new Error("Unauthorized");
    }
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      throw new Error("User not found");
    }
    if (user.isBlocked) {
      await prisma.user.update({
        where: { id: userId },
        data: { isBlocked: false },
      });
      revalidatePath("/admin/all-users");
      return { success: true, message: "User unblocked successfully" };
    } else {
      await prisma.user.update({
        where: { id: userId },
        data: { isBlocked: true },
      });
      revalidatePath("/admin/all-users");

      return { success: true, message: "User blocked successfully" };
    }
  } catch (error) {
    return handleError({ error, errorIn: "blockUser" });
  }
};
