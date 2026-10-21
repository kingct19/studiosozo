import { z } from "zod";
import { inquiryLocationOptions } from "@/lib/locations";
import { siteConfig } from "@/lib/site";

export const softwareTypeOptions = [
  ...siteConfig.services.map((service) => service.title),
  "Other / Multiple Systems",
] as const;

export const budgetRangeOptions = [
  "Exploring Scope / Needs Assessment",
  "$2,000 – $5,000",
  "$5,000 – $10,000",
  "$10,000 – $25,000",
  "$25,000+ / Custom Scope",
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
    .min(1, "Please select the type of software needed."),
  projectDescription: z
    .string()
    .trim()
    .min(
      20,
      "Please share at least 20 characters describing your current workflow or software goals.",
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
