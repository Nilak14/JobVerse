import { JobSeekerOnboardingSchema } from "@/schema/JobSeekerOnboardingSchema";
import { create } from "zustand";

interface StoreType {
  formData: JobSeekerOnboardingSchema;
  setFormData: (value: Partial<JobSeekerOnboardingSchema>) => void;
  initializeFormData: () => void;
}

// Zustand store
export const getJobSeekerOnboardingFormStatus = create<StoreType>((set) => ({
  formData: {
    fullName: "",
    phoneNumber: "",
    dob: "",
    gender: "male",
    jobType: "full-time",
    salaryRange: "",
  },

  setFormData: (value: Partial<JobSeekerOnboardingSchema>) =>
    set((state) => {
      const updatedFormData = { ...state.formData, ...value };

      // Update session storage whenever formData is modified (client-side only)
      if (typeof window !== "undefined") {
        sessionStorage.setItem(
          "jobSeekerOnboardingData",
          JSON.stringify(updatedFormData)
        );
      }

      return { formData: updatedFormData };
    }),

  initializeFormData: () => {
    if (typeof window !== "undefined") {
      // Retrieve data from session storage on the client side
      const sessionData = sessionStorage.getItem("jobSeekerOnboardingData");
      if (sessionData) {
        set({ formData: JSON.parse(sessionData) });
      }
    }
  },
}));
