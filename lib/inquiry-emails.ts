import { getCapabilityBlueprint } from "@/lib/inquiry-blueprint-data";
import type { InquiryFormValues } from "@/lib/inquiry-schema";
import { siteConfig } from "@/lib/site";

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function buildFounderNotificationEmail(
  inquiry: InquiryFormValues,
  submittedAt: string,
): {
  subject: string;
  html: string;
  text: string;
} {
  const blueprint = getCapabilityBlueprint(inquiry.softwareType);
  const subject = `New Project Inquiry: ${inquiry.company} (${inquiry.softwareType})`;

  const text = [
    `NEW STUDIO SOZO PROJECT INQUIRY`,
    `================================`,
    `Submitted At: ${submittedAt}`,
    ``,
    `CONTACT DETAILS`,
    `---------------`,
    `Name:     ${inquiry.name}`,
    `Company:  ${inquiry.company}`,
    `Email:    ${inquiry.email}`,
    `Phone:    ${inquiry.phone}`,
    `Location: ${inquiry.location}`,
    ``,
    `PROJECT PARAMETERS`,
    `------------------`,
    `System Type: ${inquiry.softwareType} (${blueprint.code})`,
    `Budget:      ${inquiry.estimatedBudget}`,
    `Timeline:    ${inquiry.preferredTimeline}`,
    ``,
    `WORKFLOW & PROJECT DESCRIPTION`,
    `------------------------------`,
    inquiry.projectDescription,
    ``,
    `---`,
    `Reply directly to this email to respond to ${inquiry.name} <${inquiry.email}>.`,
  ].join("\n");

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(subject)}</title>
</head>
<body style="margin:0;padding:0;background-color:#f6f9fc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#0a2540;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#f6f9fc;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;background-color:#ffffff;border:1px solid #e3e8ee;">
          <!-- Header -->
          <tr>
            <td style="background-color:#0a2540;padding:24px 32px;color:#ffffff;">
              <div style="font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;font-size:11px;font-weight:700;letter-spacing:0.14em;color:#a5b4fc;text-transform:uppercase;">
                // NEW PROJECT INQUIRY • ${escapeHtml(blueprint.code)}
              </div>
              <h1 style="margin:8px 0 0;font-size:22px;font-weight:700;color:#ffffff;letter-spacing:-0.02em;">
                ${escapeHtml(inquiry.company)} — ${escapeHtml(inquiry.softwareType)}
              </h1>
              <p style="margin:6px 0 0;font-size:13px;color:#94a3b8;">
                Submitted by ${escapeHtml(inquiry.name)} on ${escapeHtml(new Date(submittedAt).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" }))}
              </p>
            </td>
          </tr>

          <!-- Quick Action Bar -->
          <tr>
            <td style="padding:20px 32px;background-color:#f8fafc;border-bottom:1px solid #e3e8ee;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <a href="mailto:${escapeHtml(inquiry.email)}?subject=${encodeURIComponent(`Re: Your Studio Sozo Project Inquiry (${inquiry.company})`)}" style="display:inline-block;background-color:#635bff;color:#ffffff;text-decoration:none;font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;padding:12px 20px;">
                      Reply to ${escapeHtml(inquiry.name)} &rarr;
                    </a>
                    <a href="tel:${escapeHtml(inquiry.phone)}" style="display:inline-block;margin-left:8px;background-color:#ffffff;color:#0a2540;border:1px solid #cbd5e1;text-decoration:none;font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;padding:11px 16px;">
                      Call ${escapeHtml(inquiry.phone)}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Details Grid -->
          <tr>
            <td style="padding:28px 32px;">
              <div style="font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;font-size:11px;font-weight:700;letter-spacing:0.12em;color:#635bff;text-transform:uppercase;margin-bottom:12px;">
                01 // OPERATOR &amp; SCOPE DETAILS
              </div>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;border:1px solid #e3e8ee;">
                <tr>
                  <td style="padding:10px 14px;border-bottom:1px solid #e3e8ee;background-color:#f8fafc;width:34%;font-family:ui-monospace,monospace;font-size:11px;font-weight:700;color:#64748b;text-transform:uppercase;">Contact Name</td>
                  <td style="padding:10px 14px;border-bottom:1px solid #e3e8ee;font-size:14px;font-weight:600;color:#0a2540;">${escapeHtml(inquiry.name)}</td>
                </tr>
                <tr>
                  <td style="padding:10px 14px;border-bottom:1px solid #e3e8ee;background-color:#f8fafc;font-family:ui-monospace,monospace;font-size:11px;font-weight:700;color:#64748b;text-transform:uppercase;">Company</td>
                  <td style="padding:10px 14px;border-bottom:1px solid #e3e8ee;font-size:14px;font-weight:600;color:#0a2540;">${escapeHtml(inquiry.company)}</td>
                </tr>
                <tr>
                  <td style="padding:10px 14px;border-bottom:1px solid #e3e8ee;background-color:#f8fafc;font-family:ui-monospace,monospace;font-size:11px;font-weight:700;color:#64748b;text-transform:uppercase;">Email</td>
                  <td style="padding:10px 14px;border-bottom:1px solid #e3e8ee;font-size:14px;"><a href="mailto:${escapeHtml(inquiry.email)}" style="color:#635bff;text-decoration:none;font-weight:600;">${escapeHtml(inquiry.email)}</a></td>
                </tr>
                <tr>
                  <td style="padding:10px 14px;border-bottom:1px solid #e3e8ee;background-color:#f8fafc;font-family:ui-monospace,monospace;font-size:11px;font-weight:700;color:#64748b;text-transform:uppercase;">Phone</td>
                  <td style="padding:10px 14px;border-bottom:1px solid #e3e8ee;font-size:14px;color:#0a2540;">${escapeHtml(inquiry.phone)}</td>
                </tr>
                <tr>
                  <td style="padding:10px 14px;border-bottom:1px solid #e3e8ee;background-color:#f8fafc;font-family:ui-monospace,monospace;font-size:11px;font-weight:700;color:#64748b;text-transform:uppercase;">Location</td>
                  <td style="padding:10px 14px;border-bottom:1px solid #e3e8ee;font-size:14px;color:#0a2540;">${escapeHtml(inquiry.location)}</td>
                </tr>
                <tr>
                  <td style="padding:10px 14px;border-bottom:1px solid #e3e8ee;background-color:#f8fafc;font-family:ui-monospace,monospace;font-size:11px;font-weight:700;color:#64748b;text-transform:uppercase;">System Needed</td>
                  <td style="padding:10px 14px;border-bottom:1px solid #e3e8ee;font-size:14px;font-weight:700;color:#635bff;">${escapeHtml(inquiry.softwareType)}</td>
                </tr>
                <tr>
                  <td style="padding:10px 14px;border-bottom:1px solid #e3e8ee;background-color:#f8fafc;font-family:ui-monospace,monospace;font-size:11px;font-weight:700;color:#64748b;text-transform:uppercase;">Estimated Budget</td>
                  <td style="padding:10px 14px;border-bottom:1px solid #e3e8ee;font-size:14px;font-weight:600;color:#0a2540;">${escapeHtml(inquiry.estimatedBudget)}</td>
                </tr>
                <tr>
                  <td style="padding:10px 14px;background-color:#f8fafc;font-family:ui-monospace,monospace;font-size:11px;font-weight:700;color:#64748b;text-transform:uppercase;">Target Timeline</td>
                  <td style="padding:10px 14px;font-size:14px;font-weight:600;color:#0a2540;">${escapeHtml(inquiry.preferredTimeline)}</td>
                </tr>
              </table>

              <!-- Project Description -->
              <div style="font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;font-size:11px;font-weight:700;letter-spacing:0.12em;color:#635bff;text-transform:uppercase;margin:24px 0 10px;">
                02 // WORKFLOW &amp; PROJECT DESCRIPTION
              </div>
              <div style="padding:16px;background-color:#f8fafc;border:1px solid #e3e8ee;font-size:14px;line-height:1.65;color:#0a2540;white-space:pre-wrap;">${escapeHtml(inquiry.projectDescription)}</div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:16px 32px;background-color:#f8fafc;border-top:1px solid #e3e8ee;font-family:ui-monospace,monospace;font-size:11px;color:#64748b;">
              Studio Sozo (${escapeHtml(siteConfig.legalName)}) • Direct Lead Dispatch
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  return { subject, html, text };
}

export function buildClientConfirmationEmail(inquiry: InquiryFormValues): {
  subject: string;
  html: string;
  text: string;
} {
  const firstName = inquiry.name.trim().split(" ")[0] || inquiry.name.trim();
  const blueprint = getCapabilityBlueprint(inquiry.softwareType);
  const subject = `We received your project inquiry — ${siteConfig.name}`;

  const text = [
    `Hi ${firstName},`,
    ``,
    `Thank you for reaching out to Studio Sozo. Your project inquiry for ${inquiry.company} has been delivered directly to me — there are no sales reps or account manager layers between us.`,
    ``,
    `YOUR SUBMITTED PROJECT BRIEF`,
    `----------------------------`,
    `• System Architecture: ${inquiry.softwareType} (${blueprint.code})`,
    `• Deliverables:        ${blueprint.deliverableSummary}`,
    `• Estimated Budget:    ${inquiry.estimatedBudget}`,
    `• Target Timeline:     ${inquiry.preferredTimeline}`,
    `• Service Area:        ${inquiry.location}`,
    ``,
    `Workflow & Goals:`,
    inquiry.projectDescription,
    ``,
    `WHAT HAPPENS NEXT`,
    `-----------------`,
    `01 // Architecture Review (Within 1 Business Day)`,
    `I will review your current workflow, existing tools, and system requirements personally.`,
    ``,
    `02 // Technical Discovery & Scope Call`,
    `We will walk through a concrete system blueprint, timeline milestones, and fixed project investment.`,
    ``,
    `03 // Weekly Staging Releases & 100% Ownership`,
    `We engineer your platform with weekly staging builds, zero recurring per-seat SaaS fees, and full GitHub repository handover.`,
    ``,
    `Need to share additional context, screenshots, or documentation right away? Simply reply directly to this email.`,
    ``,
    `Talk soon,`,
    ``,
    `${siteConfig.founder.name}`,
    `${siteConfig.founder.role} — ${siteConfig.name}`,
    `${siteConfig.founder.email}`,
    `${siteConfig.url}`,
  ].join("\n");

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(subject)}</title>
</head>
<body style="margin:0;padding:0;background-color:#f6f9fc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#0a2540;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#f6f9fc;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:620px;background-color:#ffffff;border:1px solid #e3e8ee;">
          <!-- Dark Architectural Header -->
          <tr>
            <td style="background-color:#0a2540;padding:28px 32px;color:#ffffff;">
              <div style="font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;font-size:11px;font-weight:700;letter-spacing:0.16em;color:#a5b4fc;text-transform:uppercase;">
                // STUDIO SOZO • PROJECT BRIEF CONFIRMED
              </div>
              <h1 style="margin:10px 0 0;font-size:24px;font-weight:700;color:#ffffff;letter-spacing:-0.02em;">
                We received your inquiry, ${escapeHtml(firstName)}.
              </h1>
              <p style="margin:8px 0 0;font-size:14px;line-height:1.55;color:#cbd5e1;">
                Your project brief for <strong style="color:#ffffff;">${escapeHtml(inquiry.company)}</strong> is in my inbox for direct architecture review.
              </p>
            </td>
          </tr>

          <!-- Personal Note from Chandler -->
          <tr>
            <td style="padding:28px 32px 16px;">
              <p style="margin:0 0 14px;font-size:15px;line-height:1.65;color:#0a2540;">
                Hi ${escapeHtml(firstName)},
              </p>
              <p style="margin:0 0 14px;font-size:15px;line-height:1.65;color:#425466;">
                Thanks for starting a conversation with <strong>Studio Sozo</strong>. When you work with us, there are no layers of non-technical account managers—you work directly with me from initial architecture and workflow mapping through weekly staging releases and 100% repository handover.
              </p>
              <p style="margin:0;font-size:15px;line-height:1.65;color:#425466;">
                I’m reviewing your details now and will follow up personally within one business day.
              </p>
            </td>
          </tr>

          <!-- Terminal Summary Card -->
          <tr>
            <td style="padding:12px 32px 24px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#1a1a1a;color:#e1e1e1;padding:20px;">
                <tr>
                  <td style="padding:18px 20px;font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;font-size:12px;line-height:1.6;">
                    <div style="color:#8b8b90;margin-bottom:8px;">
                      <span style="color:#00ff00;">✓</span> <strong>${escapeHtml(blueprint.code)}</strong> — ${escapeHtml(inquiry.softwareType)}
                    </div>
                    <div style="color:#e0af68;font-weight:700;margin-bottom:10px;">
                      ${escapeHtml(blueprint.deliverableSummary)}
                    </div>
                    <div style="border-left:2px solid #808080;padding-left:12px;color:#cfcfd2;">
                      <div><span style="color:#8b8b90;">company:</span> "${escapeHtml(inquiry.company)}"</div>
                      <div><span style="color:#8b8b90;">budget:</span> "${escapeHtml(inquiry.estimatedBudget)}"</div>
                      <div><span style="color:#8b8b90;">timeline:</span> "${escapeHtml(inquiry.preferredTimeline)}"</div>
                      <div><span style="color:#8b8b90;">region:</span> "${escapeHtml(inquiry.location)}"</div>
                      <div><span style="color:#8b8b90;">ownership:</span> <span style="color:#00ff00;">"100% client-owned • $0/seat forever"</span></div>
                    </div>
                  </td>
                </tr>
              </table>

              <div style="margin-top:12px;padding:14px 16px;background-color:#f8fafc;border:1px solid #e3e8ee;">
                <div style="font-family:ui-monospace,monospace;font-size:10px;font-weight:700;letter-spacing:0.12em;color:#64748b;text-transform:uppercase;margin-bottom:6px;">
                  YOUR WORKFLOW &amp; PROJECT NOTES
                </div>
                <div style="font-size:13px;line-height:1.6;color:#0a2540;white-space:pre-wrap;">${escapeHtml(inquiry.projectDescription)}</div>
              </div>
            </td>
          </tr>

          <!-- What Happens Next -->
          <tr>
            <td style="padding:4px 32px 28px;">
              <div style="font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;font-size:11px;font-weight:700;letter-spacing:0.12em;color:#635bff;text-transform:uppercase;margin-bottom:12px;">
                // WHAT HAPPENS NEXT
              </div>

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
                <tr>
                  <td style="padding:12px 14px;border:1px solid #e3e8ee;background-color:#ffffff;">
                    <div style="font-family:ui-monospace,monospace;font-size:10px;font-weight:700;color:#635bff;letter-spacing:0.1em;text-transform:uppercase;">
                      01 // ARCHITECTURE REVIEW (WITHIN 24 HOURS)
                    </div>
                    <div style="margin-top:4px;font-size:13px;line-height:1.5;color:#425466;">
                      I’ll review the tools and manual workflows you want to replace and prepare initial architectural recommendations.
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 14px;border:1px solid #e3e8ee;border-top:0;background-color:#ffffff;">
                    <div style="font-family:ui-monospace,monospace;font-size:10px;font-weight:700;color:#635bff;letter-spacing:0.1em;text-transform:uppercase;">
                      02 // DISCOVERY &amp; FIXED-SCOPE BLUEPRINT
                    </div>
                    <div style="margin-top:4px;font-size:13px;line-height:1.5;color:#425466;">
                      We’ll hop on a focused call to map your database schema, role permissions, integrations, and fixed build investment.
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 14px;border:1px solid #e3e8ee;border-top:0;background-color:#ffffff;">
                    <div style="font-family:ui-monospace,monospace;font-size:10px;font-weight:700;color:#635bff;letter-spacing:0.1em;text-transform:uppercase;">
                      03 // WEEKLY STAGING RELEASES &amp; 100% HANDOVER
                    </div>
                    <div style="margin-top:4px;font-size:13px;line-height:1.5;color:#425466;">
                      Your custom platform is engineered with weekly staging builds and deployed to your cloud with 100% source code ownership.
                    </div>
                  </td>
                </tr>
              </table>

              <p style="margin:20px 0 0;font-size:14px;line-height:1.6;color:#425466;">
                Have additional notes, loom videos, or spreadsheets to share before we talk? <strong>Simply reply directly to this email</strong> and it will come straight to me.
              </p>

              <p style="margin:20px 0 0;font-size:14px;line-height:1.5;color:#0a2540;">
                Talk soon,<br />
                <strong>${escapeHtml(siteConfig.founder.name)}</strong><br />
                <span style="font-size:12px;color:#64748b;">${escapeHtml(siteConfig.founder.role)} • ${escapeHtml(siteConfig.name)}</span>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:18px 32px;background-color:#f8fafc;border-top:1px solid #e3e8ee;font-family:ui-monospace,monospace;font-size:11px;color:#64748b;">
              <a href="${escapeHtml(siteConfig.url)}" style="color:#0a2540;font-weight:700;text-decoration:none;">${escapeHtml(siteConfig.wordmark)}</a>
              &nbsp;•&nbsp; Operated by ${escapeHtml(siteConfig.legalName)}
              &nbsp;•&nbsp; <a href="mailto:${escapeHtml(siteConfig.founder.email)}" style="color:#635bff;text-decoration:none;">${escapeHtml(siteConfig.founder.email)}</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  return { subject, html, text };
}
