import { create } from "zustand";
import { UseFormTrigger } from "react-hook-form";

type FormTriggersStore = {
  triggers: Record<string, UseFormTrigger<any>>; // Store multiple triggers
  setTrigger: (formKey: string, triggerFn: UseFormTrigger<any>) => void;
  triggerForm: (formKey: string) => Promise<boolean>; // Calls the trigger
};

export const useFormTriggersStore = create<FormTriggersStore>((set, get) => ({
  triggers: {},

  setTrigger: (formKey, triggerFn) =>
    set((state) => ({
      triggers: { ...state.triggers, [formKey]: triggerFn },
    })),

  triggerForm: async (formKey) => {
    const triggerFn = get().triggers[formKey]; // Get trigger for that form
    return triggerFn ? await triggerFn() : false; // Validate and return
  },
}));
