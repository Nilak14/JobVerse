"use server";

import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const url = req.nextUrl;
    const yearParam = url.searchParams.get("year");

    if (!yearParam) {
      return Response.json(
        { success: false, message: "Year parameter is required" },
        { status: 400 }
      );
    }

    const year = parseInt(yearParam);

    // Get all job categories
    const jobCategories = await prisma.jobCategory.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    // Get all job posts created in the given year
    const jobPosts = await prisma.job.findMany({
      where: {
        createdAt: {
          gte: new Date(`${year}-01-01T00:00:00.000Z`),
          lt: new Date(`${year + 1}-01-01T00:00:00.000Z`),
        },
      },
      select: {
        categoryId: true,
      },
    });

    // Count number of job posts per category
    const categoryCountMap: Record<string, number> = {};
    for (const post of jobPosts) {
      if (post.categoryId) {
        categoryCountMap[post.categoryId] =
          (categoryCountMap[post.categoryId] || 0) + 1;
      }
    }

    // Map categoryId to category name
    const result = jobCategories.map((cat) => ({
      category: cat.name,
      total: categoryCountMap[cat.id] || 0,
    }));

    return Response.json({ success: true, data: result });
  } catch (error) {
    console.error("Error:", error);
    return Response.json(
      { success: false, message: "Error fetching analytics data" },
      { status: 500 }
    );
  }
};
