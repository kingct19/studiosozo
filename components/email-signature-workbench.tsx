"use client";

import { useRef, useState } from "react";
import { Check, Code2, Copy, Eye, FileText, Moon, RotateCcw, Sun } from "lucide-react";
import { MeshInk } from "@/components/brand-mesh";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  buildEmailSignature,
  DEFAULT_SIGNATURE_OPTIONS,
  type EmailSignatureOptions,
  type SignatureVariant,
} from "@/lib/email-signature";
import { cn } from "@/lib/utils";

const VARIANT_META: ReadonlyArray<{
  id: SignatureVariant;
  code: string;
  label: string;
  badge?: string;
  description: string;
}> = [
  {
    id: "architectural",
    code: "01 // ARCHITECTURAL SPLIT",
    label: "Architectural Card",
    badge: "Primary",
    description:
      "Crisp 1px structural border, indigo top accent rule, founder portrait, Studio Sozo horizontal wordmark, and bottom capability strip with CTA.",
  },
  {
    id: "blueprint",
    code: "02 // DARK BLUEPRINT",
    label: "Dark Blueprint",
    description:
      "Deep #0a2540 architectural header block matching Studio Sozo's automated inquiry dispatch emails, paired with a light technical footer bar.",
  },
  {
    id: "minimal",
    code: "03 // MINIMAL LEDGER",
    label: "Minimal Ledger",
    description:
      "Compact left-rule reply signature engineered for fast back-and-forth threads where vertical space is at a premium.",
  },
];

type CopyKind = "rich" | "html" | "text" | null;

export function EmailSignatureWorkbench() {
  const [options, setOptions] = useState<EmailSignatureOptions>(
    DEFAULT_SIGNATURE_OPTIONS,
  );
  const [darkCanvas, setDarkCanvas] = useState(false);
  const [showRawCode, setShowRawCode] = useState(false);
  const [copiedKind, setCopiedKind] = useState<CopyKind>(null);
  const signaturePreviewRef = useRef<HTMLDivElement>(null);

  // Build two versions:
  // 1) `exportSignature` uses absolute https://studiosozo.dev URLs for pasting into Gmail/Apple Mail
  // 2) `previewSignature` uses local relative paths so images render immediately in local dev
  const exportSignature = buildEmailSignature(options);
  const previewSignature = buildEmailSignature({
    ...options,
    assetBaseUrl: "",
  });

  function triggerCopiedFeedback(kind: Exclude<CopyKind, null>) {
    setCopiedKind(kind);
    window.setTimeout(() => {
      setCopiedKind((prev) => (prev === kind ? null : prev));
    }, 2400);
  }

  async function handleCopyRichSignature() {
    try {
      if (
        typeof navigator !== "undefined" &&
        navigator.clipboard &&
        typeof ClipboardItem !== "undefined"
      ) {
        const htmlBlob = new Blob([exportSignature.html], {
          type: "text/html",
        });
        const textBlob = new Blob([exportSignature.text], {
          type: "text/plain",
        });
        await navigator.clipboard.write([
          new ClipboardItem({
            "text/html": htmlBlob,
            "text/plain": textBlob,
          }),
        ]);
        triggerCopiedFeedback("rich");
        return;
      }
    } catch {
      // Fall back to DOM selection copy below
    }

    if (signaturePreviewRef.current) {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(signaturePreviewRef.current);
      selection?.removeAllRanges();
      selection?.addRange(range);
      document.execCommand("copy");
      selection?.removeAllRanges();
      triggerCopiedFeedback("rich");
    }
  }

  async function handleCopyRawHtml() {
    await navigator.clipboard.writeText(exportSignature.html);
    triggerCopiedFeedback("html");
  }

  async function handleCopyPlainText() {
    await navigator.clipboard.writeText(exportSignature.text);
    triggerCopiedFeedback("text");
  }

  function handleReset() {
    setOptions(DEFAULT_SIGNATURE_OPTIONS);
  }

  return (
    <div className="space-y-10">
      {/* Variant Switcher */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <div className="text-xs font-bold tracking-widest text-[#635bff] uppercase">
            <MeshInk>01 // SELECT SIGNATURE ARCHITECTURE</MeshInk>
          </div>
          <span className="text-xs text-[#64748b]">
            100% Table &amp; Inline CSS • Gmail, Apple Mail, Superhuman &amp; Outlook Ready
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {VARIANT_META.map((item) => {
            const isActive = options.variant === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() =>
                  setOptions((prev) => ({ ...prev, variant: item.id }))
                }
                className={cn(
                  "group relative flex flex-col justify-between border p-5 text-left transition-all",
                  isActive
                    ? "border-[#635bff] bg-white shadow-[0_8px_24px_rgba(99,91,255,0.10)]"
                    : "border-[#e3e8ee] bg-white/80 hover:border-[#0a2540]/30 hover:bg-white",
                )}
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-bold tracking-widest text-[#635bff] uppercase">
                      {item.code}
                    </span>
                    {item.badge ? (
                      <span className="bg-[#635bff]/10 px-2 py-0.5 text-[10px] font-bold tracking-widest text-[#635bff] uppercase">
                        {item.badge}
                      </span>
                    ) : null}
                  </div>
                  <h2 className="mt-2 font-sans text-lg font-bold tracking-tight text-[#0a2540]">
                    {item.label}
                  </h2>
                  <p className="mt-1.5 font-sans text-xs leading-relaxed text-[#425466]">
                    {item.description}
                  </p>
                </div>

                <div className="mt-4 flex items-center gap-2 border-t border-[#e3e8ee] pt-3 text-[11px] font-bold tracking-widest uppercase">
                  <span
                    className={cn(
                      "h-2 w-2 rounded-full",
                      isActive ? "bg-[#635bff]" : "bg-[#cbd5e1]",
                    )}
                  />
                  <span className={isActive ? "text-[#0a2540]" : "text-[#64748b]"}>
                    {isActive ? "Active Variant" : "Select Variant"}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Workbench Grid */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left: Live Email Client Preview & Copy Actions (8 cols) */}
        <div className="space-y-6 lg:col-span-8">
          <div className="border border-[#e3e8ee] bg-white">
            {/* Action Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#e3e8ee] bg-[#f8fafc] px-5 py-4">
              <div className="flex items-center gap-2.5">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ef4444]/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#f59e0b]/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#10b981]/80" />
                </div>
                <span className="ml-2 text-xs font-bold tracking-widest text-[#0a2540] uppercase">
                  {"//"} COMPOSER PREVIEW
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setDarkCanvas((prev) => !prev)}
                  className="inline-flex items-center gap-1.5 border border-[#e3e8ee] bg-white px-3 py-1.5 text-[11px] font-bold tracking-widest text-[#0a2540] uppercase transition-colors hover:bg-[#f1f5f9]"
                >
                  {darkCanvas ? (
                    <>
                      <Sun className="h-3.5 w-3.5 text-[#f59e0b]" />
                      Light Canvas
                    </>
                  ) : (
                    <>
                      <Moon className="h-3.5 w-3.5 text-[#635bff]" />
                      Dark Canvas
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setShowRawCode((prev) => !prev)}
                  className="inline-flex items-center gap-1.5 border border-[#e3e8ee] bg-white px-3 py-1.5 text-[11px] font-bold tracking-widest text-[#0a2540] uppercase transition-colors hover:bg-[#f1f5f9]"
                >
                  {showRawCode ? (
                    <>
                      <Eye className="h-3.5 w-3.5 text-[#635bff]" />
                      Visual Preview
                    </>
                  ) : (
                    <>
                      <Code2 className="h-3.5 w-3.5 text-[#635bff]" />
                      Inspect HTML
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Simulated Email Client Window */}
            <div
              className={cn(
                "transition-colors duration-200",
                darkCanvas
                  ? "bg-[#0f172a] text-[#e2e8f0]"
                  : "bg-white text-[#0a2540]",
              )}
            >
              {/* Mock Email Headers */}
              <div
                className={cn(
                  "border-b px-6 py-3.5 font-sans text-xs",
                  darkCanvas
                    ? "border-[#1e293b] text-[#94a3b8]"
                    : "border-[#eef2f6] text-[#64748b]",
                )}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <span className="font-semibold">From:</span>{" "}
                    <span className={darkCanvas ? "text-white" : "text-[#0a2540]"}>
                      {options.name} &lt;{options.email}&gt;
                    </span>
                  </div>
                  <span className="font-mono text-[11px] uppercase opacity-75">
                    Re: Custom System Architecture &amp; Scope Blueprint
                  </span>
                </div>
              </div>

              {/* Mock Email Body + Rendered Signature */}
              <div className="p-6 md:p-8">
                <div
                  className={cn(
                    "mb-7 max-w-xl space-y-3 font-sans text-sm leading-relaxed",
                    darkCanvas ? "text-[#cbd5e1]" : "text-[#425466]",
                  )}
                >
                  <p>Hi Alex,</p>
                  <p>
                    I reviewed your current workflow and mapped out the Phase 1
                    architecture blueprint. Everything is scoped for weekly
                    staging releases and 100% repository handover with zero
                    recurring per-seat licensing.
                  </p>
                  <p>Let me know if Thursday at 2:00 PM CT works to walk through it.</p>
                  <p className="pt-1">Talk soon,</p>
                </div>

                {/* Actual Signature Mount */}
                <div
                  ref={signaturePreviewRef}
                  className="overflow-x-auto"
                  dangerouslySetInnerHTML={{ __html: previewSignature.html }}
                />
              </div>
            </div>

            {/* Raw HTML Inspector (Collapsible) */}
            {showRawCode ? (
              <div className="border-t border-[#e3e8ee] bg-[#0a2540] p-5 text-[#e2e8f0]">
                <div className="mb-2 flex items-center justify-between text-[11px] font-bold tracking-widest text-[#a5b4fc] uppercase">
                  <span>{"//"} EMAIL-SAFE INLINE HTML SOURCE ({exportSignature.html.length} BYTES)</span>
                  <span>ASSET BASE: {options.assetBaseUrl}</span>
                </div>
                <pre className="max-h-72 overflow-auto font-mono text-xs leading-relaxed text-[#cbd5e1]">
                  <code>{exportSignature.html}</code>
                </pre>
              </div>
            ) : null}

            {/* Primary Copy Bar */}
            <div className="flex flex-col gap-3 border-t border-[#e3e8ee] bg-[#f8fafc] p-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handleCopyRichSignature}
                  className="inline-flex items-center justify-center gap-2 bg-[#635bff] px-5 py-3 text-xs font-bold tracking-widest text-white uppercase shadow-[0_4px_14px_rgba(99,91,255,0.35)] transition-all hover:bg-[#5249ec] active:scale-[0.98]"
                >
                  {copiedKind === "rich" ? (
                    <>
                      <Check className="h-4 w-4" />
                      Copied for Gmail / Apple Mail!
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      Copy Signature (Gmail / Apple Mail)
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleCopyRawHtml}
                  className="inline-flex items-center justify-center gap-2 border border-[#cbd5e1] bg-white px-4 py-3 text-xs font-bold tracking-widest text-[#0a2540] uppercase transition-colors hover:bg-[#f1f5f9]"
                >
                  {copiedKind === "html" ? (
                    <>
                      <Check className="h-4 w-4 text-[#10b981]" />
                      HTML Copied
                    </>
                  ) : (
                    <>
                      <Code2 className="h-4 w-4 text-[#635bff]" />
                      Copy Raw HTML
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleCopyPlainText}
                  className="inline-flex items-center justify-center gap-2 border border-[#e3e8ee] bg-white px-3.5 py-3 text-xs font-bold tracking-widest text-[#425466] uppercase transition-colors hover:bg-[#f1f5f9] hover:text-[#0a2540]"
                >
                  {copiedKind === "text" ? (
                    <>
                      <Check className="h-4 w-4 text-[#10b981]" />
                      Text Copied
                    </>
                  ) : (
                    <>
                      <FileText className="h-4 w-4" />
                      Plain Text
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Installation Guide Cards */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="border border-[#e3e8ee] bg-white p-5">
              <div className="text-[11px] font-bold tracking-widest text-[#635bff] uppercase">
                {"//"} GMAIL (WEB)
              </div>
              <h3 className="mt-1 font-sans text-sm font-bold text-[#0a2540]">
                1-Click Rich Paste
              </h3>
              <ol className="mt-2.5 list-inside list-decimal space-y-1.5 font-sans text-xs leading-relaxed text-[#425466]">
                <li>Click <strong>Copy Signature</strong> above.</li>
                <li>Open Gmail &rarr; Settings &rarr; <strong>See all settings</strong>.</li>
                <li>Scroll to <strong>Signature</strong>, paste (<kbd className="rounded border px-1 font-mono text-[10px]">⌘V</kbd>), and click <strong>Save Changes</strong>.</li>
              </ol>
            </div>

            <div className="border border-[#e3e8ee] bg-white p-5">
              <div className="text-[11px] font-bold tracking-widest text-[#635bff] uppercase">
                {"//"} APPLE MAIL (MACOS)
              </div>
              <h3 className="mt-1 font-sans text-sm font-bold text-[#0a2540]">
                Uncheck &ldquo;Always Match Font&rdquo;
              </h3>
              <ol className="mt-2.5 list-inside list-decimal space-y-1.5 font-sans text-xs leading-relaxed text-[#425466]">
                <li>Open Mail &rarr; Settings &rarr; <strong>Signatures</strong>.</li>
                <li>Create a signature and <strong>uncheck</strong> &ldquo;Always match my default message font&rdquo;.</li>
                <li>Paste (<kbd className="rounded border px-1 font-mono text-[10px]">⌘V</kbd>) into the preview pane.</li>
              </ol>
            </div>

            <div className="border border-[#e3e8ee] bg-white p-5">
              <div className="text-[11px] font-bold tracking-widest text-[#635bff] uppercase">
                {"//"} SUPERHUMAN / HTML CLIENTS
              </div>
              <h3 className="mt-1 font-sans text-sm font-bold text-[#0a2540]">
                Raw HTML or Rich Paste
              </h3>
              <ol className="mt-2.5 list-inside list-decimal space-y-1.5 font-sans text-xs leading-relaxed text-[#425466]">
                <li>Click <strong>Copy Raw HTML</strong> (or Rich Copy).</li>
                <li>In Superhuman, press <kbd className="rounded border px-1 font-mono text-[10px]">⌘K</kbd> &rarr; <strong>Signatures</strong>.</li>
                <li>Paste the HTML source or rich signature directly.</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Right: Live Customization Controls (4 cols) */}
        <div className="lg:col-span-4">
          <div className="sticky top-28 border border-[#e3e8ee] bg-white p-6">
            <div className="flex items-center justify-between border-b border-[#e3e8ee] pb-4">
              <div>
                <div className="text-[11px] font-bold tracking-widest text-[#635bff] uppercase">
                  02 // PARAMETERS
                </div>
                <h2 className="mt-1 font-sans text-base font-bold text-[#0a2540]">
                  Customize Signature Fields
                </h2>
              </div>
              <button
                type="button"
                onClick={handleReset}
                title="Reset to defaults"
                className="inline-flex items-center gap-1 border border-[#e3e8ee] bg-[#f8fafc] px-2.5 py-1.5 text-[10px] font-bold tracking-widest text-[#425466] uppercase transition-colors hover:text-[#0a2540]"
              >
                <RotateCcw className="h-3 w-3" />
                Reset
              </button>
            </div>

            <div className="mt-5 space-y-4 font-sans">
              {/* Show Headshot Toggle */}
              <div className="flex items-center justify-between border border-[#e3e8ee] bg-[#f8fafc] px-3.5 py-3">
                <div>
                  <Label
                    htmlFor="toggle-headshot"
                    className="text-xs font-bold text-[#0a2540]"
                  >
                    Founder Portrait
                  </Label>
                  <p className="text-[11px] text-[#64748b]">
                    Include 1:1 grayscale headshot
                  </p>
                </div>
                <Switch
                  id="toggle-headshot"
                  checked={options.showHeadshot}
                  onCheckedChange={(checked) =>
                    setOptions((prev) => ({ ...prev, showHeadshot: checked }))
                  }
                />
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="sig-name"
                  className="font-mono text-[11px] font-bold tracking-wider text-[#425466] uppercase"
                >
                  Full Name
                </Label>
                <Input
                  id="sig-name"
                  value={options.name}
                  onChange={(e) =>
                    setOptions((prev) => ({ ...prev, name: e.target.value }))
                  }
                />
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="sig-role"
                  className="font-mono text-[11px] font-bold tracking-wider text-[#425466] uppercase"
                >
                  Title / Role
                </Label>
                <Input
                  id="sig-role"
                  value={options.role}
                  onChange={(e) =>
                    setOptions((prev) => ({ ...prev, role: e.target.value }))
                  }
                />
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="sig-email"
                  className="font-mono text-[11px] font-bold tracking-wider text-[#425466] uppercase"
                >
                  Email Address
                </Label>
                <Input
                  id="sig-email"
                  value={options.email}
                  onChange={(e) =>
                    setOptions((prev) => ({ ...prev, email: e.target.value }))
                  }
                />
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="sig-phone"
                  className="font-mono text-[11px] font-bold tracking-wider text-[#425466] uppercase"
                >
                  Phone Number (Optional)
                </Label>
                <Input
                  id="sig-phone"
                  placeholder="e.g. (512) 555-0199 — leave blank to hide"
                  value={options.phone}
                  onChange={(e) =>
                    setOptions((prev) => ({ ...prev, phone: e.target.value }))
                  }
                />
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="sig-tagline"
                  className="font-mono text-[11px] font-bold tracking-wider text-[#425466] uppercase"
                >
                  Technical Capability Strip
                </Label>
                <Input
                  id="sig-tagline"
                  value={options.tagline}
                  onChange={(e) =>
                    setOptions((prev) => ({ ...prev, tagline: e.target.value }))
                  }
                />
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label
                    htmlFor="sig-cta-text"
                    className="font-mono text-[11px] font-bold tracking-wider text-[#425466] uppercase"
                  >
                    CTA Button Label
                  </Label>
                  <Input
                    id="sig-cta-text"
                    value={options.ctaText}
                    onChange={(e) =>
                      setOptions((prev) => ({
                        ...prev,
                        ctaText: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="space-y-1.5">
                  <Label
                    htmlFor="sig-cta-url"
                    className="font-mono text-[11px] font-bold tracking-wider text-[#425466] uppercase"
                  >
                    CTA Target URL
                  </Label>
                  <Input
                    id="sig-cta-url"
                    value={options.ctaUrl}
                    onChange={(e) =>
                      setOptions((prev) => ({
                        ...prev,
                        ctaUrl: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>

              <div className="border-t border-[#e3e8ee] pt-3">
                <p className="font-mono text-[11px] leading-relaxed text-[#64748b]">
                  Standalone file also available at{" "}
                  <a
                    href="/email-signature.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-[#635bff] underline"
                  >
                    /email-signature.html
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
