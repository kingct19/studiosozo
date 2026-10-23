"use server";

import { Resend } from "resend";

import {
  buildClientConfirmationEmail,
  buildFounderNotificationEmail,
} from "@/lib/inquiry-emails";
import { inquirySchema, type InquiryFormValues } from "@/lib/inquiry-schema";
import { siteConfig } from "@/lib/site";

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

const DEFAULT_FROM_CANDIDATES = [
  `${siteConfig.founder.name} — ${siteConfig.name} <chandler@studiosozo.dev>`,
  `${siteConfig.founder.name} — ${siteConfig.name} <chandler@studiosozo.com>`,
  "Studio Sozo <onboarding@resend.dev>",
] as const;

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

  const inquiry = parsed.data;
  const submittedAt = new Date().toISOString();

  const resendApiKey = process.env.RESEND_API_KEY?.trim();
  const webhookUrl = process.env.LEAD_WEBHOOK_URL?.trim();

  if (!resendApiKey && !webhookUrl) {
    return {
      ok: false,
      message:
        "Project inquiry delivery is not configured yet (RESEND_API_KEY is not set on this environment). Your inquiry was not sent.",
    };
  }

  let emailDelivered = false;
  let confirmationSent = false;
  let lastErrorDetail = "";

  if (resendApiKey) {
    try {
      const resend = new Resend(resendApiKey);
      const configuredFrom = process.env.RESEND_FROM_EMAIL?.trim();
      const senderCandidates = configuredFrom
        ? [
            configuredFrom,
            ...DEFAULT_FROM_CANDIDATES.filter((c) => c !== configuredFrom),
          ]
        : [...DEFAULT_FROM_CANDIDATES];

      const founderRecipient =
        process.env.RESEND_TO_EMAIL?.trim() || siteConfig.founder.email;

      const founderEmail = buildFounderNotificationEmail(inquiry, submittedAt);
      const clientEmail = buildClientConfirmationEmail(inquiry);

      let activeSender: string = senderCandidates[0];

      // 1. Send lead notification to Chandler (trying verified domain candidates in order)
      for (const candidateFrom of senderCandidates) {
        const founderResult = await resend.emails.send({
          from: candidateFrom,
          to: [founderRecipient],
          replyTo: inquiry.email,
          subject: founderEmail.subject,
          html: founderEmail.html,
          text: founderEmail.text,
        });

        if (!founderResult.error) {
          activeSender = candidateFrom;
          emailDelivered = true;
          lastErrorDetail = "";
          break;
        }

        lastErrorDetail = founderResult.error.message;
        const isDomainError = /domain|verify|not verified|sender/i.test(
          founderResult.error.message ?? "",
        );
        if (!isDomainError) {
          break;
        }
      }

      // 2. Send confirmation email to the client using the verified sender
      if (emailDelivered) {
        const confirmationResult = await resend.emails.send({
          from: activeSender,
          to: [inquiry.email],
          replyTo: siteConfig.founder.email,
          subject: clientEmail.subject,
          html: clientEmail.html,
          text: clientEmail.text,
        });

        if (!confirmationResult.error) {
          confirmationSent = true;
        }
      }
    } catch (err) {
      lastErrorDetail =
        err instanceof Error ? err.message : "Unexpected email delivery error.";
    }
  }

  // Optional webhook delivery if LEAD_WEBHOOK_URL is also set
  if (webhookUrl) {
    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          source: "studiosozo.dev",
          submittedAt,
          inquiry,
        }),
      });
      if (response.ok) {
        emailDelivered = true;
      }
    } catch {
      // Ignore webhook error if email succeeded
    }
  }

  if (!emailDelivered) {
    return {
      ok: false,
      message: lastErrorDetail
        ? `Unable to deliver project inquiry: ${lastErrorDetail}`
        : "Unable to deliver your project inquiry right now. Please email chandler@studiosozo.com directly.",
    };
  }

  return {
    ok: true,
    message: confirmationSent
      ? `Thank you — your project brief has been sent directly to Chandler King, and a confirmation copy has been emailed to ${inquiry.email}.`
      : "Thank you — your project brief has been delivered directly to Chandler King. We will review your details and follow up shortly.",
  };
}
