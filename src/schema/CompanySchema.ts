import { z } from "zod";

export const CompanySchema = z.object({
  name: z.string().min(1, { message: "Company name is required" }),
  description: z.string().refine(
    (value) => {
      const strippedValue = value.replace(/<[^>]*>/g, "").replace(/\s+/g, ""); // Remove HTML tags and whitespace
      return strippedValue.length >= 10;
    },
    {
      message: "Description must have at least 10 characters",
    }
  ),
  websiteURl: z.union([
    z.string().url({ message: "Invalid URL" }),
    z.literal(""),
  ]),
  logo: z.instanceof(File).optional(),
});

export type CompanySchemaType = z.infer<typeof CompanySchema>;
