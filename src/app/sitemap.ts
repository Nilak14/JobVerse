import { JobSearchTags, locations } from "@/lib/data/SEOData";
import prisma from "@/lib/prisma";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const jobTags = await prisma.job.findMany({
    where: {
      status: "ACTIVE",
    },
    select: {
      tags: true,
      skills: true,
    },
  });
  const allTags = jobTags.map((job) => {
    return job.tags.concat(job.skills, JobSearchTags);
  });
  const uniqueTags = [...new Set(allTags.flat())];
  const locationsData = locations;

  const urlWithTagAndLocation = uniqueTags
    .map((tag) => {
      return locations.map((location) => {
        return {
          url: `${process.env.NEXT_PUBLIC_BASE_URL}/job/${location}/${tag}`,
          changeFrequency: "weekly",
          priority: 1,
        };
      });
    })
    .flat() as MetadataRoute.Sitemap;

  const urlWithLocation = locationsData
    .map((location) => {
      return {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/job/${location}`,
        changeFrequency: "weekly",
        priority: 1,
      };
    })
    .flat() as MetadataRoute.Sitemap;

  // const urlWithTags = uniqueTags
  //   .map((tag) => {
  //     return {
  //       url: `${process.env.NEXT_PUBLIC_BASE_URL}/job/${tag}`,
  //       changeFrequency: "weekly",
  //       priority: 1,
  //     };
  //   })
  //   .flat() as MetadataRoute.Sitemap;

  return [
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/login`,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/register/employer`,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/register/job-seeker`,
    },
    ...urlWithTagAndLocation,
    ...urlWithLocation,
  ];
}
