import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import {
  getJobDataIncludeBrowse,
  NearByJobResponse,
} from "@/lib/prisma-types/Job";
import { NextRequest } from "next/server";

// Haversine formula to calculate the distance in km between two points given their latitudes and longitudes.
const getDistanceFromLatLonInKm = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
};

const deg2rad = (deg: number): number => {
  return deg * (Math.PI / 180);
};

export const GET = async (req: NextRequest) => {
  try {
    const session = await auth();
    if (!session || !session.user || !session.jobSeekerId) {
      return Response.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }
    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
      select: {
        latitude: true,
        longitude: true,
        JOB_SEEKER: {
          select: {
            JobSeekerProfile: {
              select: {
                nearByJobRadius: true,
                showNearByJobs: true,
              },
            },
          },
        },
      },
    });

    if (user?.JOB_SEEKER?.JobSeekerProfile?.showNearByJobs === false) {
      return Response.json(
        { success: false, message: "Cant show nearby Jobs" },
        { status: 400 }
      );
    }

    if (!user || !user.latitude || !user.longitude) {
      return Response.json(
        { success: false, message: "User Location Not Found" },
        { status: 400 }
      );
    }
    const nearByJobRadius =
      user?.JOB_SEEKER?.JobSeekerProfile?.nearByJobRadius ?? "25";

    const jobs = await prisma.job.findMany({
      where: {
        status: "ACTIVE",
      },
      select: getJobDataIncludeBrowse(),
    });

    const nearByJobs = jobs.filter((job) => {
      if (!job.latitude || !job.longitude) return false;
      const distance = getDistanceFromLatLonInKm(
        Number(user.latitude),
        Number(user.longitude),
        Number(job.latitude),
        Number(job.longitude)
      );
      return distance <= Number(nearByJobRadius);
    });
    // select 3 random jobs from nearbyJobs
    const randomIndex = Math.floor(Math.random() * nearByJobs.length);
    const randomJobs = nearByJobs.slice(randomIndex, randomIndex + 3);
    // if randomJobs length is less than 3, fill the rest with random jobs from nearbyJobs
    if (randomJobs.length < 3) {
      const remainingJobs = nearByJobs.filter(
        (job) => !randomJobs.includes(job)
      );
      const remainingJobsCount = 3 - randomJobs.length;
      const randomRemainingJobs = remainingJobs.slice(0, remainingJobsCount);
      randomJobs.push(...randomRemainingJobs);
    }
    const data: NearByJobResponse = {
      success: true,
      message: "Nearby Jobs Fetched Successfully",
      data: {
        jobs: randomJobs,
      },
    };

    return Response.json(data, { status: 200 });
  } catch (error) {
    console.error("nearby job", error);

    return Response.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
};
