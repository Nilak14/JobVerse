import prisma from "@/lib/prisma";
import { getAllUsers } from "@/lib/prisma-types/User";
import { cache } from "react";

export const getAllUser = cache(async () => {
  try {
    const users = await prisma.user.findMany({
      include: getAllUsers(),
    });
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
});
