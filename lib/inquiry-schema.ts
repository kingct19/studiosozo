import { z } from "zod";
import { inquiryLocationOptions } from "@/lib/locations";
import { siteConfig } from "@/lib/site";

export const softwareTypeOptions = [
  ...siteConfig.services.map((service) => service.title),
  "Not Sure / Multiple Things",
] as const;

export const budgetRangeOptions = [
  "$800 – $1,000 (Website Build / Update)",
  "$2,000 – $5,000",
  "$5,000 – $10,000",
  "$10,000 – $25,000",
  "$25,000+ / Custom Scope",
  "Not sure yet — help me scope it",
] as const;

export const timelineOptions = [
  "Ready to start immediately",
  "Within 30 days",
  "1 – 3 months",
  "3+ months / Planning ahead",
] as const;

export const inquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your full name."),
  company: z
    .string()
    .trim()
    .min(2, "Please enter your company or organization name."),
  email: z
    .string()
    .trim()
    .email("Please enter a valid business email address."),
  phone: z
    .string()
    .trim()
    .min(7, "Please enter a valid phone number."),
  location: z
    .string()
    .trim()
    .min(1, "Please select your location or service area."),
  softwareType: z
    .string()
    .trim()
    .min(1, "Please select what you want to build."),
  projectDescription: z
    .string()
    .trim()
    .min(
      20,
      "Please share at least 20 characters describing your website or app goals.",
    ),
  estimatedBudget: z
    .string()
    .trim()
    .min(1, "Please select an estimated budget range."),
  preferredTimeline: z
    .string()
    .trim()
    .min(1, "Please select your preferred project timeline."),
});

export type InquiryFormValues = z.infer<typeof inquirySchema>;

export { inquiryLocationOptions };
