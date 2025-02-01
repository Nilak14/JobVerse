import { JobCategoryInclude } from "@/lib/prisma-types/JobCategory";
import { create } from "zustand";

interface JobCategoryStore {
  category: JobCategoryInclude[];
  setCategory: (company: JobCategoryInclude[]) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

export const useJobCategory = create<JobCategoryStore>((set) => ({
  category: [],
  setCategory: (category) => set({ category }),
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading }),
}));
