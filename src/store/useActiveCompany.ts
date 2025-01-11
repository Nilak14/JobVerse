import { EmployerCompany } from "@/lib/prisma-types/Employers";
import { create } from "zustand";

interface ActiveCompany {
  activeCompany: EmployerCompany;
  setActiveCompany: (company: EmployerCompany) => void;
}

export const useActiveCompany = create<ActiveCompany>((set) => ({
  activeCompany: {} as EmployerCompany,
  setActiveCompany: (company) => set({ activeCompany: company }),
}));
