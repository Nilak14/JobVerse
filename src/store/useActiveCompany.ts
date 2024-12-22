import { EmployerCompanies } from "@/lib/prisma-types/Employers";
import { create } from "zustand";

interface ActiveCompany {
  activeCompany: EmployerCompanies["companies"][0];
  setActiveCompany: (company: EmployerCompanies["companies"][0]) => void;
}

export const useActiveCompany = create<ActiveCompany>((set) => ({
  activeCompany: {} as EmployerCompanies["companies"][0],
  setActiveCompany: (company) => set({ activeCompany: company }),
}));
