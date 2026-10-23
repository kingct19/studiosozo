import { siteConfig } from "@/lib/site";

export type SignatureVariant = "architectural" | "blueprint" | "minimal";

export interface EmailSignatureOptions {
  variant: SignatureVariant;
  name: string;
  role: string;
  email: string;
  websiteUrl: string;
  websiteLabel: string;
  phone: string;
  tagline: string;
  ctaText: string;
  ctaUrl: string;
  showHeadshot: boolean;
  assetBaseUrl: string;
}

export const DEFAULT_SIGNATURE_OPTIONS: EmailSignatureOptions = {
  variant: "architectural",
  name: siteConfig.founder.name,
  role: siteConfig.founder.role,
  email: siteConfig.founder.email,
  websiteUrl: siteConfig.url,
  websiteLabel: "studiosozo.dev",
  phone: "",
  tagline: "Custom Software • CRM Systems • AI Automation",
  ctaText: "Discuss Your Project",
  ctaUrl: `${siteConfig.url}/contact`,
  showHeadshot: true,
  assetBaseUrl: "https://raw.githubusercontent.com/kingct19/studiosozo/main/public",
};

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function resolveAssetUrl(baseUrl: string, path: string): string {
  const normalizedBase = baseUrl.trim().replace(/\/+$/, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return normalizedBase ? `${normalizedBase}${normalizedPath}` : normalizedPath;
}

function buildPlainTextSignature(opts: EmailSignatureOptions): string {
  const contactParts = [
    opts.email,
    opts.phone.trim() ? opts.phone.trim() : null,
    opts.websiteLabel || opts.websiteUrl,
  ].filter(Boolean);

  const lines = [
    `--`,
    `${opts.name}`,
    `${opts.role} — ${siteConfig.name}`,
    contactParts.join("  •  "),
    opts.tagline ? `// ${opts.tagline}` : "",
    opts.ctaText && opts.ctaUrl ? `${opts.ctaText} -> ${opts.ctaUrl}` : "",
  ].filter(Boolean);

  return lines.join("\n");
}

function buildArchitecturalHtml(opts: EmailSignatureOptions): string {
  const avatarUrl = resolveAssetUrl(
    opts.assetBaseUrl,
    "/brand/email/chandler-king-avatar.jpg",
  );
  const logoBlackUrl = resolveAssetUrl(
    opts.assetBaseUrl,
    "/brand/email/studio-sozo-logo-black.png",
  );

  const phoneClean = opts.phone.trim();
  const phoneHref = phoneClean.replace(/[^+\d]/g, "");

  const leftAvatarCell = opts.showHeadshot
    ? `<td valign="top" style="padding:20px 0 20px 20px;width:76px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
          <tr>
            <td style="border:1px solid #e3e8ee;background-color:#f8fafc;padding:2px;line-height:0;">
              <img src="${escapeHtml(avatarUrl)}" alt="${escapeHtml(opts.name)}" width="72" height="72" style="display:block;width:72px;height:72px;object-fit:cover;object-position:50% 38%;filter:grayscale(100%) contrast(1.05);border:0;outline:none;text-decoration:none;" />
            </td>
          </tr>
        </table>
      </td>`
    : "";

  const phoneFragment = phoneClean
    ? `<span style="color:#cbd5e1;padding:0 7px;">&bull;</span><a href="tel:${escapeHtml(phoneHref)}" style="color:#0a2540;text-decoration:none;font-weight:600;">${escapeHtml(phoneClean)}</a>`
    : "";

  const ctaCell =
    opts.ctaText.trim() && opts.ctaUrl.trim()
      ? `<td align="right" valign="middle" style="padding-left:12px;white-space:nowrap;">
          <a href="${escapeHtml(opts.ctaUrl)}" target="_blank" rel="noopener noreferrer" style="display:inline-block;background-color:#635bff;color:#ffffff;text-decoration:none;font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,'Liberation Mono',monospace;font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;padding:7px 12px;line-height:1.2;">
            ${escapeHtml(opts.ctaText)} &rarr;
          </a>
        </td>`
      : "";

  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="540" style="width:100%;max-width:540px;border-collapse:collapse;border:1px solid #e3e8ee;background-color:#ffffff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#0a2540;mso-table-lspace:0pt;mso-table-rspace:0pt;">
  <tr>
    <td style="padding:0;border-top:2px solid #635bff;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="width:100%;border-collapse:collapse;">
        <tr>
          ${leftAvatarCell}
          <td valign="top" style="padding:18px 20px;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="width:100%;border-collapse:collapse;">
              <tr>
                <td valign="middle" style="font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,'Liberation Mono',monospace;font-size:10px;font-weight:700;letter-spacing:0.14em;color:#635bff;text-transform:uppercase;line-height:1.3;">
                  <span style="color:#8898aa;">//</span> DIRECT FOUNDER ACCESS
                </td>
                <td align="right" valign="middle" style="padding-left:12px;line-height:0;">
                  <a href="${escapeHtml(opts.websiteUrl)}" target="_blank" rel="noopener noreferrer" style="text-decoration:none;display:inline-block;">
                    <img src="${escapeHtml(logoBlackUrl)}" alt="Studio Sozo" width="82" height="28" style="display:block;width:82px;height:28px;border:0;outline:none;text-decoration:none;" />
                  </a>
                </td>
              </tr>
            </table>
            <div style="margin-top:4px;font-size:17px;font-weight:700;letter-spacing:-0.02em;color:#0a2540;line-height:1.25;">
              ${escapeHtml(opts.name)}
            </div>
            <div style="margin-top:2px;font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,'Liberation Mono',monospace;font-size:11px;font-weight:600;letter-spacing:0.06em;color:#425466;text-transform:uppercase;line-height:1.4;">
              ${escapeHtml(opts.role)} <span style="color:#cbd5e1;">&bull;</span> <span style="color:#0a2540;">${escapeHtml(siteConfig.name)}</span>
            </div>
            <div style="margin-top:10px;padding-top:10px;border-top:1px solid #eef2f6;font-size:12px;line-height:1.5;color:#425466;">
              <a href="mailto:${escapeHtml(opts.email)}" style="color:#0a2540;text-decoration:none;font-weight:600;">${escapeHtml(opts.email)}</a>${phoneFragment}<span style="color:#cbd5e1;padding:0 7px;">&bull;</span><a href="${escapeHtml(opts.websiteUrl)}" target="_blank" rel="noopener noreferrer" style="color:#635bff;text-decoration:none;font-weight:600;">${escapeHtml(opts.websiteLabel)}</a>
            </div>
          </td>
        </tr>
      </table>
    </td>
  </tr>
  <tr>
    <td style="padding:10px 20px;background-color:#f8fafc;border-top:1px solid #e3e8ee;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="width:100%;border-collapse:collapse;">
        <tr>
          <td valign="middle" style="font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,'Liberation Mono',monospace;font-size:10px;font-weight:700;letter-spacing:0.09em;color:#425466;text-transform:uppercase;line-height:1.4;">
            <span style="color:#635bff;">&#9679;</span>&nbsp; ${escapeHtml(opts.tagline)}
          </td>
          ${ctaCell}
        </tr>
      </table>
    </td>
  </tr>
</table>`;
}

function buildBlueprintHtml(opts: EmailSignatureOptions): string {
  const avatarUrl = resolveAssetUrl(
    opts.assetBaseUrl,
    "/brand/email/chandler-king-avatar.jpg",
  );
  const logoWhiteUrl = resolveAssetUrl(
    opts.assetBaseUrl,
    "/brand/email/studio-sozo-logo-white.png",
  );

  const phoneClean = opts.phone.trim();
  const phoneHref = phoneClean.replace(/[^+\d]/g, "");

  const leftAvatarCell = opts.showHeadshot
    ? `<td valign="top" style="padding:20px 0 20px 20px;width:72px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
          <tr>
            <td style="border:1px solid #334155;background-color:#0f172a;padding:2px;line-height:0;">
              <img src="${escapeHtml(avatarUrl)}" alt="${escapeHtml(opts.name)}" width="68" height="68" style="display:block;width:68px;height:68px;object-fit:cover;object-position:50% 38%;filter:grayscale(100%) contrast(1.05);border:0;outline:none;text-decoration:none;" />
            </td>
          </tr>
        </table>
      </td>`
    : "";

  const phoneFragment = phoneClean
    ? `<span style="color:#475569;padding:0 7px;">&bull;</span><a href="tel:${escapeHtml(phoneHref)}" style="color:#e2e8f0;text-decoration:none;font-weight:600;">${escapeHtml(phoneClean)}</a>`
    : "";

  const ctaCell =
    opts.ctaText.trim() && opts.ctaUrl.trim()
      ? `<td align="right" valign="middle" style="padding-left:12px;white-space:nowrap;">
          <a href="${escapeHtml(opts.ctaUrl)}" target="_blank" rel="noopener noreferrer" style="display:inline-block;background-color:#635bff;color:#ffffff;text-decoration:none;font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,'Liberation Mono',monospace;font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;padding:7px 12px;line-height:1.2;">
            ${escapeHtml(opts.ctaText)} &rarr;
          </a>
        </td>`
      : "";

  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="540" style="width:100%;max-width:540px;border-collapse:collapse;border:1px solid #0a2540;background-color:#ffffff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#0a2540;mso-table-lspace:0pt;mso-table-rspace:0pt;">
  <tr>
    <td style="padding:0;background-color:#0a2540;color:#ffffff;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="width:100%;border-collapse:collapse;">
        <tr>
          ${leftAvatarCell}
          <td valign="top" style="padding:18px 20px;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="width:100%;border-collapse:collapse;">
              <tr>
                <td valign="middle" style="font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,'Liberation Mono',monospace;font-size:10px;font-weight:700;letter-spacing:0.14em;color:#a5b4fc;text-transform:uppercase;line-height:1.3;">
                  // STUDIO SOZO &bull; PRINCIPAL ENGINEERING
                </td>
                <td align="right" valign="middle" style="padding-left:12px;line-height:0;">
                  <a href="${escapeHtml(opts.websiteUrl)}" target="_blank" rel="noopener noreferrer" style="text-decoration:none;display:inline-block;">
                    <img src="${escapeHtml(logoWhiteUrl)}" alt="Studio Sozo" width="82" height="28" style="display:block;width:82px;height:28px;border:0;outline:none;text-decoration:none;" />
                  </a>
                </td>
              </tr>
            </table>
            <div style="margin-top:5px;font-size:17px;font-weight:700;letter-spacing:-0.02em;color:#ffffff;line-height:1.25;">
              ${escapeHtml(opts.name)}
            </div>
            <div style="margin-top:2px;font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,'Liberation Mono',monospace;font-size:11px;font-weight:600;letter-spacing:0.06em;color:#cbd5e1;text-transform:uppercase;line-height:1.4;">
              ${escapeHtml(opts.role)}
            </div>
            <div style="margin-top:10px;padding-top:10px;border-top:1px solid #1e3a5f;font-size:12px;line-height:1.5;color:#cbd5e1;">
              <a href="mailto:${escapeHtml(opts.email)}" style="color:#ffffff;text-decoration:none;font-weight:600;">${escapeHtml(opts.email)}</a>${phoneFragment}<span style="color:#475569;padding:0 7px;">&bull;</span><a href="${escapeHtml(opts.websiteUrl)}" target="_blank" rel="noopener noreferrer" style="color:#a5b4fc;text-decoration:none;font-weight:600;">${escapeHtml(opts.websiteLabel)}</a>
            </div>
          </td>
        </tr>
      </table>
    </td>
  </tr>
  <tr>
    <td style="padding:10px 20px;background-color:#f8fafc;border-top:1px solid #e3e8ee;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="width:100%;border-collapse:collapse;">
        <tr>
          <td valign="middle" style="font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,'Liberation Mono',monospace;font-size:10px;font-weight:700;letter-spacing:0.09em;color:#0a2540;text-transform:uppercase;line-height:1.4;">
            <span style="color:#635bff;">&#9679;</span>&nbsp; ${escapeHtml(opts.tagline)}
          </td>
          ${ctaCell}
        </tr>
      </table>
    </td>
  </tr>
</table>`;
}

function buildMinimalHtml(opts: EmailSignatureOptions): string {
  const avatarUrl = resolveAssetUrl(
    opts.assetBaseUrl,
    "/brand/email/chandler-king-avatar.jpg",
  );
  const logoBlackUrl = resolveAssetUrl(
    opts.assetBaseUrl,
    "/brand/email/studio-sozo-logo-black.png",
  );

  const phoneClean = opts.phone.trim();
  const phoneHref = phoneClean.replace(/[^+\d]/g, "");

  const avatarCell = opts.showHeadshot
    ? `<td valign="top" style="padding-right:14px;width:52px;">
        <img src="${escapeHtml(avatarUrl)}" alt="${escapeHtml(opts.name)}" width="52" height="52" style="display:block;width:52px;height:52px;object-fit:cover;object-position:50% 38%;filter:grayscale(100%) contrast(1.05);border:1px solid #e3e8ee;outline:none;text-decoration:none;" />
      </td>`
    : "";

  const phoneFragment = phoneClean
    ? `<span style="color:#cbd5e1;padding:0 6px;">&bull;</span><a href="tel:${escapeHtml(phoneHref)}" style="color:#0a2540;text-decoration:none;">${escapeHtml(phoneClean)}</a>`
    : "";

  const ctaFragment =
    opts.ctaText.trim() && opts.ctaUrl.trim()
      ? `<span style="color:#cbd5e1;padding:0 6px;">&bull;</span><a href="${escapeHtml(opts.ctaUrl)}" target="_blank" rel="noopener noreferrer" style="color:#635bff;text-decoration:none;font-weight:700;">${escapeHtml(opts.ctaText)} &rarr;</a>`
      : "";

  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="500" style="width:100%;max-width:500px;border-collapse:collapse;border-left:2px solid #635bff;padding-left:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#0a2540;mso-table-lspace:0pt;mso-table-rspace:0pt;">
  <tr>
    <td style="padding:2px 0 2px 14px;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="width:100%;border-collapse:collapse;">
        <tr>
          ${avatarCell}
          <td valign="top">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
              <tr>
                <td valign="middle" style="font-size:15px;font-weight:700;color:#0a2540;letter-spacing:-0.01em;padding-right:10px;">
                  ${escapeHtml(opts.name)}
                </td>
                <td valign="middle" style="line-height:0;">
                  <a href="${escapeHtml(opts.websiteUrl)}" target="_blank" rel="noopener noreferrer" style="text-decoration:none;display:inline-block;">
                    <img src="${escapeHtml(logoBlackUrl)}" alt="Studio Sozo" width="64" height="22" style="display:block;width:64px;height:22px;border:0;outline:none;text-decoration:none;" />
                  </a>
                </td>
              </tr>
            </table>
            <div style="margin-top:2px;font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,'Liberation Mono',monospace;font-size:10px;font-weight:600;letter-spacing:0.08em;color:#64748b;text-transform:uppercase;">
              ${escapeHtml(opts.role)} &bull; ${escapeHtml(siteConfig.name)}
            </div>
            <div style="margin-top:6px;font-size:12px;line-height:1.5;color:#425466;">
              <a href="mailto:${escapeHtml(opts.email)}" style="color:#0a2540;text-decoration:none;font-weight:600;">${escapeHtml(opts.email)}</a>${phoneFragment}<span style="color:#cbd5e1;padding:0 6px;">&bull;</span><a href="${escapeHtml(opts.websiteUrl)}" target="_blank" rel="noopener noreferrer" style="color:#0a2540;text-decoration:none;font-weight:600;">${escapeHtml(opts.websiteLabel)}</a>${ctaFragment}
            </div>
            <div style="margin-top:5px;font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,'Liberation Mono',monospace;font-size:10px;letter-spacing:0.08em;color:#64748b;text-transform:uppercase;">
              <span style="color:#635bff;">//</span> ${escapeHtml(opts.tagline)}
            </div>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`;
}

export function buildEmailSignature(
  overrides?: Partial<EmailSignatureOptions>,
): {
  html: string;
  text: string;
} {
  const opts: EmailSignatureOptions = {
    ...DEFAULT_SIGNATURE_OPTIONS,
    ...overrides,
  };

  let html: string;
  switch (opts.variant) {
    case "architectural":
      html = buildArchitecturalHtml(opts);
      break;
    case "blueprint":
      html = buildBlueprintHtml(opts);
      break;
    case "minimal":
      html = buildMinimalHtml(opts);
      break;
    default: {
      const exhaustiveCheck: never = opts.variant;
      throw new Error(`Unhandled signature variant: ${String(exhaustiveCheck)}`);
    }
  }

  return {
    html,
    text: buildPlainTextSignature(opts),
  };
}
