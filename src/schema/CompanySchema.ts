import { z } from "zod";

export const CompanySchema = z.object({
  name: z.string().min(1, { message: "Company name is required" }),
  description: z
    .string()
    .min(1, { message: "Company description is required" }),
  websiteURl: z.union([
    z.string().url({ message: "Invalid URL" }),
    z.literal(""),
  ]),
  logo: z.instanceof(File).optional(),
});

export type CompanySchemaType = z.infer<typeof CompanySchema>;
