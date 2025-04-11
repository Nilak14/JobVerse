import prisma from "@/lib/prisma";

export const getUserDetailsById = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        subscriptions: true,
        EMPLOYER: {
          include: {
            _count: {
              select: {
                createdJobs: true,
              },
            },
          },
        },
        JOB_SEEKER: {
          include: {
            _count: {
              select: {
                createdResumes: true,
                uploadedResumes: true,
                savedJobs: true,
              },
            },
          },
        },
      },
    });
  } catch (error) {}
};
