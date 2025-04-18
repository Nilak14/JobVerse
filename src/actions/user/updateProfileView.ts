"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getNotificationSelect } from "@/lib/prisma-types/Notification";
import { triggerNotification } from "@/lib/triggerNotification";
import { handleError } from "@/lib/utils";

export const updateProfileView = async (profileId: string) => {
  try {
    const session = await auth();
    if (session?.user.id === profileId) {
      return { success: false, message: "You cannot view your own profile" };
    }
    const user = await prisma.user.findUnique({
      where: {
        id: profileId,
        userType: "JOB_SEEKER",
      },
      select: {
        id: true,
        JOB_SEEKER: {
          select: {
            id: true,
          },
        },
      },
    });
    if (!user) {
      return { success: false, message: "User not found" };
    }
    if (session) {
      const hasViewedAlready = await prisma.jobSeekerProfileView.findFirst({
        where: {
          jobSeekerId: user.JOB_SEEKER?.id!,
          viewedBy: session.user.id,
          viewedAt: {
            gte: new Date(Date.now() - 24 * 60 * 60 * 1000), // 24 hours ago
          },
        },
      });
      if (hasViewedAlready) {
        return {
          success: false,
          message: "You have already viewed this profile",
        };
      }
    }
    const updateProfileViewForUser = await prisma.jobSeekerProfileView.create({
      data: {
        jobSeekerId: user.JOB_SEEKER?.id!,
        viewedBy: session ? session.user.id : undefined,
      },
    });
    const notifications = await prisma.notifications.create({
      data: {
        title: "Profile View",
        body: `${session?.user?.name || "Anonymous User"} viewed your profile`,
        category: "PROFILE_VIEW",
        imageURL: session?.user?.image || undefined,
        userId: user.id,
      },
      select: getNotificationSelect(),
    });
    triggerNotification(user.id, notifications);

    return {
      success: true,
      message: "Profile view updated successfully",
      data: updateProfileViewForUser,
    };
  } catch (error) {
    return handleError({ error, errorIn: "updateProfileView" });
  }
};
