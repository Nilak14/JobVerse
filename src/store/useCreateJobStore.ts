import { CreateJobSchemaType } from "@/schema/CreateJobSchema";
import { create } from "zustand";

interface CreateJobStoreType {
  job: CreateJobSchemaType;
  setJob: (job: CreateJobSchemaType) => void;
}

export const useCreateJobStore = create<CreateJobStoreType>((set) => {
  return {
    job: {} as CreateJobSchemaType,
    setJob: (job) => set({ job }),
  };
});
