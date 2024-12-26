import { z } from "zod";

export const CompanySchema = z.object({
  name: z.string().min(1, { message: "Company name is required" }),
  description: z
    .string()
    .min(1, { message: "Company description is required" }),
  websiteURl: z.optional(z.string().url({ message: "Invalid URL" })).nullable(),
  logo: z.instanceof(File).optional(),
});

export type CompanySchemaType = z.infer<typeof CompanySchema>;
