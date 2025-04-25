"use server";

import { signOut } from "@/auth";
import { getUserById } from "@/data-access/user";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { handleError } from "@/lib/utils";

export const storeUserLocation = async () => {
  try {
    const session = await auth();
    if (!session || !session.user.id) {
      throw new Error("Unauthorized");
    }
    const user = await getUserById(session.user.id);
    if (!user) {
      throw new Error("Unauthorized");
    }
    if (user?.latitude && user.longitude) {
      return { success: true, message: "Already Saved" };
    }
    console.log("fetching location");
    const res = await fetch("https://ipwhois.app/json/");
    const data = await res.json();
    if (!data || !data.latitude || !data.longitude) {
      throw new Error("Location not found");
    }
    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        latitude: data.latitude.toString(),
        longitude: data.longitude.toString(),
      },
    });

    return { success: true, message: "Saved Successfully" };
  } catch (error) {
    return handleError({ error, errorIn: "storeUserLocation" });
  }
};
