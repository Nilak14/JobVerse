import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // fetch all jobsPost from the API
  // add the jobsPost to the sitemap
  //   const jobs = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/jobs`);
  //   const jobsPost = await jobs.json();
  //   const jobPostEntries:MetadataRoute.Sitemap = jobsPost.map(job=>({
  //     url: `${process.env.NEXT_PUBLIC_BASE_URL}/jobs/${job.id}`,
  //     lastModified: new Date(job.updatedAt).toISOString(),
  //   }))

  return [
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/login`,
    },
    // ...jobPostEntries,
  ];
}
