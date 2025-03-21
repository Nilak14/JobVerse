import prisma from "@/lib/prisma";
import { getJobDataIncludeBrowse } from "@/lib/prisma-types/Job";
import { Prisma } from "@prisma/client";
import { cache } from "react";

export const searchJobs = cache(async (location: string, query: string) => {
  try {
    const globalSearch = query
      .split(" ")
      .filter((t) => t.length > 0)
      .map((t) => t.toLowerCase())
      .join(" & ");

    const searchFilter: Prisma.JobWhereInput = globalSearch
      ? {
          OR: [
            { title: { search: globalSearch, mode: "insensitive" } },
            { description: { search: globalSearch, mode: "insensitive" } },
            { tags: { hasSome: globalSearch.split(" ") } },
            { skills: { hasSome: globalSearch.split(" ") } },
          ],
        }
      : {};
    const where: Prisma.JobWhereInput = {
      status: "ACTIVE",
      AND: [
        searchFilter,
        location
          ? {
              location: {
                contains: location,
                mode: "insensitive",
              },
            }
          : {},
      ],
    };
    const job = await prisma.job.findMany({
      where,
      select: getJobDataIncludeBrowse(),
    });
    return job;
  } catch (error) {
    console.log(error);
    return [];
  }
});

export const searchJobByLocation = cache(async (location: string) => {
  try {
    const job = await prisma.job.findMany({
      where: {
        location: {
          contains: location,
          mode: "insensitive",
        },
        status: "ACTIVE",
      },
      select: getJobDataIncludeBrowse(),
    });
    return job;
  } catch (error) {
    console.log(error);
    return [];
  }
});
// export const searchJobByTag = cache(async (tag: string) => {
//   const globalSearch = tag
//     .split(" ")
//     .filter((t) => t.length > 0)
//     .map((t) => t.toLowerCase())
//     .join(" & ");

//   const searchFilter: Prisma.JobWhereInput = globalSearch
//     ? {
//         OR: [
//           { title: { search: globalSearch, mode: "insensitive" } },
//           { description: { search: globalSearch, mode: "insensitive" } },
//           { tags: { hasSome: globalSearch.split(" ") } },
//           { skills: { hasSome: globalSearch.split(" ") } },
//         ],
//       }
//     : {};

//   try {
//     const job = await prisma.job.findMany({
//       where: {
//         AND: [searchFilter],
//         status: "ACTIVE",
//       },
//       select: getJobDataIncludeBrowse(),
//     });
//     return job;
//   } catch (error) {
//     console.log(error);
//     return [];
//   }
// });
