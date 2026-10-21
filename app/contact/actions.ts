"use server";

import { inquirySchema, type InquiryFormValues } from "@/lib/inquiry-schema";

export type SubmitInquiryResult =
  | {
      ok: true;
      message: string;
    }
  | {
      ok: false;
      message: string;
      fieldErrors?: Partial<Record<keyof InquiryFormValues, string>>;
    };

export async function submitProjectInquiry(
  rawValues: InquiryFormValues,
): Promise<SubmitInquiryResult> {
  const parsed = inquirySchema.safeParse(rawValues);

  if (!parsed.success) {
    const fieldErrors: Partial<Record<keyof InquiryFormValues, string>> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof InquiryFormValues | undefined;
      if (key && !fieldErrors[key]) {
        fieldErrors[key] = issue.message;
      }
    }

    return {
      ok: false,
      message: "Please review the highlighted fields and try again.",
      fieldErrors,
    };
  }

  const webhookUrl = process.env.LEAD_WEBHOOK_URL?.trim();

  if (!webhookUrl) {
    return {
      ok: false,
      message:
        "Project inquiry delivery is not configured yet (LEAD_WEBHOOK_URL is not set on this environment). Your inquiry was not sent.",
    };
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        source: "studiosozo.dev",
        submittedAt: new Date().toISOString(),
        inquiry: parsed.data,
      }),
    });

    if (!response.ok) {
      return {
        ok: false,
        message: `Lead delivery endpoint returned status ${response.status}. Your inquiry could not be delivered.`,
      };
    }

    return {
      ok: true,
      message:
        "Thank you — your project inquiry has been delivered. We will review your details and follow up shortly.",
    };
  } catch {
    return {
      ok: false,
      message:
        "Unable to reach the configured lead delivery endpoint. Please try again later.",
    };
  }
}
