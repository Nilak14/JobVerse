"use server";
import prisma from "@/lib/prisma";
import { handleError } from "@/lib/utils";

export const storeUserLocation = async ({
  latitude,
  longitude,
  userId,
}: {
  latitude: string;
  longitude: string;
  userId: string;
}) => {
  try {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        latitude: latitude.toString(),
        longitude: longitude.toString(),
      },
    });

    return { success: true, message: "Saved Successfully" };
  } catch (error) {
    return handleError({ error, errorIn: "storeUserLocation" });
  }
};
