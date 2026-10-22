"use client";

import * as React from "react";
import { useReducedMotion } from "motion/react";

import {
  getCapabilityBlueprint,
  WIZARD_STEPS,
  type WizardStepId,
} from "@/lib/inquiry-blueprint-data";
import type { InquiryFormValues } from "@/lib/inquiry-schema";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────────────────────────────────────
   Exact Grok CLI Session Palette (matching brainless/grok-session)
   ───────────────────────────────────────────────────────────────────────── */

const SURFACE = "#1a1a1a";
const FG = "#e1e1e1";
const MUTED = "#8b8b90";
const DIM = "#6c6c6c";
const BORDER = "#808080";
const CARD_BORDER = "#2f2f33";
const SILVER = "#c0c0c0";
const OK_GREEN = "#00ff00";
const AMBER = "#e0af68";
const BLUE = "#8db0ff";

/* ─────────────────────────────────────────────────────────────────────────
   Terminal Typer + Backspace Hook & Component
   Whenever `target` changes, if `displayed` no longer matches the prefix of
   `target`, it backspaces character-by-character down to the shared prefix
   and then types out the new characters one by one.
   ───────────────────────────────────────────────────────────────────────── */

function useTerminalTyper(
  target: string,
  options?: { typeMs?: number; backspaceMs?: number },
): {
  text: string;
  phase: "idle" | "typing" | "backspacing";
} {
  const typeMs = options?.typeMs ?? 62;
  const backspaceMs = options?.backspaceMs ?? 34;
  const [displayed, setDisplayed] = React.useState(target);

  const phase: "idle" | "typing" | "backspacing" = React.useMemo(() => {
    if (displayed === target) return "idle";
    if (target.startsWith(displayed)) return "typing";
    return "backspacing";
  }, [displayed, target]);

  React.useEffect(() => {
    if (displayed === target) return;

    // If `target` starts with `displayed`, type the next character forward at human cadence
    if (target.startsWith(displayed)) {
      const idx = displayed.length;
      const nextChar = target[idx] ?? "";
      const prevChar = idx > 0 ? (target[idx - 1] ?? "") : "";

      // Deterministic human-like rhythm variation per character position
      const rhythmJitter = ((idx * 37) % 29) - 12; // -12ms to +16ms

      let delay = typeMs + rhythmJitter;
      if (nextChar === " ") {
        delay = typeMs * 1.15;
      } else if (
        nextChar === "." ||
        nextChar === "," ||
        nextChar === ";" ||
        nextChar === ":"
      ) {
        delay = typeMs * 2.1;
      } else if (
        nextChar === '"' ||
        nextChar === "=" ||
        nextChar === "<" ||
        nextChar === ">" ||
        nextChar === "/"
      ) {
        delay = typeMs * 1.45;
      } else if (prevChar === " ") {
        // Slight pause before starting a new word
        delay = typeMs * 1.25 + rhythmJitter;
      }

      const timer = setTimeout(() => {
        setDisplayed(target.slice(0, idx + 1));
      }, Math.max(28, Math.round(delay)));

      return () => clearTimeout(timer);
    }

    // Otherwise, backspace one character at a time at a realistic key-repeat / tap speed
    const backJitter = ((displayed.length * 19) % 13) - 5;
    const timer = setTimeout(() => {
      setDisplayed((prev) => prev.slice(0, -1));
    }, Math.max(22, backspaceMs + backJitter));

    return () => clearTimeout(timer);
  }, [displayed, target, typeMs, backspaceMs]);

  return { text: displayed, phase };
}

function TerminalCursor({
  active,
  alwaysShow = false,
  color = FG,
}: {
  active: boolean;
  alwaysShow?: boolean;
  color?: string;
}) {
  if (!active && !alwaysShow) return null;

  return (
    <span
      aria-hidden
      className={cn(
        "ml-[1px] inline-block h-[1.05em] w-[0.55ch] translate-y-[2px] align-baseline",
        !active && "animate-pulse",
      )}
      style={{ backgroundColor: color }}
    />
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   1. Studio Sozo Vector Logo Mark with Resting Grayscale Shimmer Sweep
   ───────────────────────────────────────────────────────────────────────── */

export function SozoShimmerLogo({
  size = 76,
  className,
}: {
  size?: number;
  className?: string;
}) {
  const uid = React.useId().replace(/[^a-z0-9]/gi, "");
  const reduced = Boolean(useReducedMotion());

  return (
    <svg
      aria-hidden
      width={size}
      height={size}
      viewBox="0 0 169.17 164.83"
      className={cn("shrink-0", className)}
    >
      <defs>
        <mask id={`m${uid}`}>
          <g transform="translate(8.000 8.000)">
            <path
              fill="#ffffff"
              fillRule="evenodd"
              d="M146.083 9.083 L142.250 5.583 L137.250 2.583 L131.750 0.750 L126.917 0.083 L27.250 0.417 L21.583 1.250 L16.917 2.750 L13.250 4.583 L8.083 8.583 L2.917 15.917 L1.083 20.583 L0.083 25.583 L0.083 124.417 L2.083 132.250 L3.750 135.750 L6.750 139.750 L11.250 143.750 L15.250 146.083 L20.917 148.083 L25.417 148.750 L126.750 148.583 L130.750 148.083 L137.083 146.083 L143.750 141.917 L147.417 138.083 L150.750 132.583 L153.083 122.417 L153.083 26.083 L151.417 18.083 L148.750 12.583Z M139.750 85.083 L139.583 121.750 L138.750 125.250 L136.417 129.250 L133.583 132.083 L129.917 134.417 L124.583 135.750 L81.917 135.583 L78.250 133.583 L68.750 124.583 L62.083 117.583 L59.750 113.750 L59.083 111.083 L59.750 106.583 L62.250 103.417 L64.583 102.083 L136.750 83.250 L138.583 83.583Z M14.250 65.583 L15.250 65.417 L45.750 82.250 L49.417 84.417 L51.083 86.250 L51.583 89.917 L48.083 96.917 L46.083 102.583 L45.083 107.083 L45.083 112.083 L45.917 116.083 L48.083 121.083 L52.250 127.083 L58.750 133.917 L58.750 135.417 L27.917 135.750 L24.750 135.083 L20.917 133.250 L15.750 128.250 L13.917 124.583 L13.250 120.583 L13.250 67.083Z M84.250 14.583 L84.750 16.083 L58.750 66.417 L55.417 69.750 L53.917 70.250 L51.583 69.917 L18.583 51.250 L15.583 48.917 L13.917 46.417 L13.417 44.417 L13.417 28.750 L13.917 26.250 L16.917 20.417 L20.083 17.417 L23.750 15.417 L28.083 14.250 L82.917 14.083Z M135.083 18.583 L138.750 24.250 L139.750 29.583 L139.750 62.917 L138.750 66.083 L136.583 68.417 L124.083 72.250 L70.417 85.917 L68.083 86.083 L65.750 84.583 L64.917 82.583 L65.250 80.417 L97.583 17.917 L99.917 15.250 L102.583 13.917 L125.750 13.917 L130.417 15.250Z"
            />
          </g>
        </mask>
        <linearGradient
          id={`g${uid}`}
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1="0"
          x2="80"
          y2="45"
          spreadMethod="reflect"
        >
          <stop offset="0%" stopColor="#52525b" />
          <stop offset="50%" stopColor="#e4e4e7" />
          <stop offset="100%" stopColor="#52525b" />
          {reduced ? null : (
            <animateTransform
              attributeName="gradientTransform"
              type="translate"
              from="0 0"
              to="160 90"
              dur="2.8s"
              repeatCount="indefinite"
            />
          )}
        </linearGradient>
      </defs>
      <rect
        x="0"
        y="0"
        width="169.17"
        height="164.83"
        fill={`url(#g${uid})`}
        mask={`url(#m${uid})`}
      />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   2. GrokStatus — Top status bar
   ───────────────────────────────────────────────────────────────────────── */

function SozoGrokStatus({
  branch = "main",
  directory,
  contextUsed,
  contextLimit = "500K",
  turn,
  turnTotal,
}: {
  branch?: string;
  directory: string;
  contextUsed: string;
  contextLimit?: string;
  turn: number;
  turnTotal: number;
}) {
  const dirTyper = useTerminalTyper(directory, {
    typeMs: 65,
    backspaceMs: 36,
  });

  return (
    <div
      className="flex min-w-0 flex-wrap items-baseline justify-between gap-x-4 gap-y-1 font-mono text-[12px]"
      role="status"
      aria-label="Session status"
    >
      <div className="flex min-w-0 items-baseline gap-1.5 truncate">
        <span style={{ color: FG }}> </span>
        <span style={{ color: FG }}>{branch}</span>
        <span className="truncate" style={{ color: MUTED }}>
          {dirTyper.text}
          <TerminalCursor active={dirTyper.phase !== "idle"} color={MUTED} />
        </span>
      </div>

      <div
        className="flex min-w-0 flex-wrap items-baseline gap-x-2 tabular-nums"
        style={{ color: MUTED }}
      >
        <span>
          {contextUsed} / {contextLimit}
        </span>
        <span>│</span>
        <span>
          {turn}/{turnTotal} <span style={{ color: OK_GREEN }}>✓</span>
        </span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   3. GrokHeader — Launch Card
   ───────────────────────────────────────────────────────────────────────── */

const MENU: { label: string; key?: string }[] = [
  { label: "New worktree", key: "ctrl+w" },
  { label: "Resume session", key: "ctrl+s" },
  { label: "100% repo handover" },
  { label: "Quit", key: "ctrl+q" },
];

function SozoGrokHeader({
  version = "2.4.0",
  headline,
  subhead,
}: {
  version?: string;
  headline: string;
  subhead: string;
}) {
  const headlineTyper = useTerminalTyper(headline, {
    typeMs: 64,
    backspaceMs: 35,
  });

  return (
    <div
      className="min-w-0 rounded-none border border-[#2f2f33] px-3 py-4 font-mono text-[13px] leading-[1.5] text-[#e8e8e8] sm:px-4"
      style={{ borderColor: CARD_BORDER }}
    >
      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
        <div className="shrink-0 pl-1 sm:pl-2">
          <SozoShimmerLogo size={76} />
        </div>

        <div className="min-w-0 flex-1 space-y-2">
          <div>
            <span className="font-bold text-white">Sozo Build Beta</span>{" "}
            <span style={{ color: MUTED }}>{version}</span>
          </div>

          <div>
            <div className="font-bold" style={{ color: AMBER }}>
              {headlineTyper.text}
              <TerminalCursor
                active={headlineTyper.phase !== "idle"}
                color={AMBER}
              />
            </div>
            <div style={{ color: MUTED }}>{subhead}</div>
          </div>

          <div className="space-y-0.5 pt-1">
            {MENU.map((m) => (
              <div
                key={m.label}
                className="flex w-full min-w-0 items-center justify-between gap-4 rounded-none px-1 py-0.5 text-left"
              >
                <span className="text-[#e8e8e8]">{m.label}</span>
                {m.key ? <span style={{ color: MUTED }}>{m.key}</span> : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   4. GrokMessage
   ───────────────────────────────────────────────────────────────────────── */

function SozoGrokMessage({
  role = "assistant",
  time = "4:38 PM",
  text,
}: {
  role?: "user" | "assistant";
  time?: string;
  text: string;
}) {
  const typer = useTerminalTyper(text, {
    typeMs: role === "user" ? 58 : 48,
    backspaceMs: 32,
  });

  if (role === "user") {
    return (
      <div className="flex min-w-0 justify-between gap-2 font-mono text-[13px] leading-[1.6] text-[#e8e8e8]">
        <div className="flex min-w-0 gap-2">
          <span className="shrink-0 select-none" style={{ color: FG }}>
            ❯
          </span>
          <span className="min-w-0 break-words">
            {typer.text}
            <TerminalCursor active={typer.phase !== "idle"} color={FG} />
          </span>
        </div>
        {time ? (
          <span className="shrink-0" style={{ color: DIM }}>
            {time}
          </span>
        ) : null}
      </div>
    );
  }

  return (
    <div className="flex min-w-0 justify-between gap-2 font-mono text-[13px] leading-[1.6] text-[#cfcfd2]">
      <span className="min-w-0 break-words">
        {typer.text}
        <TerminalCursor active={typer.phase !== "idle"} color="#cfcfd2" />
      </span>
      {time ? (
        <span className="shrink-0" style={{ color: DIM }}>
          {time}
        </span>
      ) : null}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   5. GrokEvent
   ───────────────────────────────────────────────────────────────────────── */

function SozoGrokEvent({
  label,
  hooks,
  hooksOk,
}: {
  label: string;
  hooks?: number;
  hooksOk?: number;
}) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-2 font-mono text-[13px] leading-[1.55]">
      <span style={{ color: SILVER }}>◆</span>
      <span style={{ color: MUTED }}>{label}</span>
      {hooks != null && hooksOk != null ? (
        <span style={{ color: DIM }}>
          [hooks: <span style={{ color: OK_GREEN }}>{hooks}</span>/{hooksOk}]
        </span>
      ) : hooks != null ? (
        <span style={{ color: DIM }}>[hooks: {hooks}]</span>
      ) : null}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   6. GrokThought
   ───────────────────────────────────────────────────────────────────────── */

function SozoGrokThought({ elapsed = "0.4s" }: { elapsed?: string }) {
  return (
    <div className="flex items-baseline gap-2 font-mono text-[13px] leading-[1.55]">
      <span style={{ color: SILVER }}>◆</span>
      <span style={{ color: MUTED }}>Thought for {elapsed}</span>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   7. GrokTool
   ───────────────────────────────────────────────────────────────────────── */

function SozoGrokTool({
  verb,
  path = "",
  variant = "line",
  title = "",
  hooks,
}: {
  verb?: string;
  path?: string;
  variant?: "line" | "card";
  title?: string;
  hooks?: number;
}) {
  const pathTyper = useTerminalTyper(path, { typeMs: 60, backspaceMs: 34 });
  const titleTyper = useTerminalTyper(title, { typeMs: 56, backspaceMs: 32 });

  if (variant === "card") {
    return (
      <div
        className="min-w-0 border-l-2 pl-3 font-mono text-[13px] leading-[1.55]"
        style={{ borderColor: OK_GREEN }}
      >
        <div className="flex flex-wrap items-baseline gap-x-2">
          <span style={{ color: OK_GREEN }}>◆</span>
          <span style={{ color: FG }}>
            {titleTyper.text}
            <TerminalCursor
              active={titleTyper.phase !== "idle"}
              color={OK_GREEN}
            />
          </span>
          {hooks != null ? (
            <span style={{ color: DIM }}>
              [hooks: <span style={{ color: OK_GREEN }}>{hooks}</span>]
            </span>
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-w-0 flex-wrap items-baseline gap-2 font-mono text-[13px] leading-[1.6] text-[#8b8b90]">
      {verb ? <span>{verb}</span> : null}
      {path ? (
        <span style={{ color: BLUE }}>
          {pathTyper.text}
          <TerminalCursor active={pathTyper.phase !== "idle"} color={BLUE} />
        </span>
      ) : null}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   8. GrokWrite
   ───────────────────────────────────────────────────────────────────────── */

type GrokWriteLine = {
  n: number;
  text: string;
};

function SozoGrokWrite({
  before,
  afterTarget,
}: {
  before: GrokWriteLine[];
  afterTarget: string;
}) {
  const codeTyper = useTerminalTyper(afterTarget, {
    typeMs: 54,
    backspaceMs: 30,
  });

  return (
    <div
      className="min-w-0 border-l-2 pl-3 font-mono text-[13px] leading-[1.55]"
      style={{ borderColor: BORDER }}
      role="region"
      aria-label="Write preview"
    >
      <div className="space-y-0.5">
        {before.map((l, i) => (
          <div key={`b-${l.n}-${i}`} className="flex items-baseline gap-2">
            <span
              aria-hidden
              className="w-5 shrink-0 text-right tabular-nums select-none"
              style={{ color: DIM }}
            >
              {l.n}
            </span>
            <span className="min-w-0 break-all" style={{ color: MUTED }}>
              {l.text}
            </span>
          </div>
        ))}
        <div className="flex items-baseline gap-2">
          <span
            aria-hidden
            className="w-5 shrink-0 text-right tabular-nums select-none"
            style={{ color: DIM }}
          >
            12
          </span>
          <span className="min-w-0 break-all" style={{ color: FG }}>
            {codeTyper.text}
            <TerminalCursor
              active={codeTyper.phase !== "idle"}
              color={OK_GREEN}
            />
          </span>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   9. GrokPermission
   ───────────────────────────────────────────────────────────────────────── */

function SozoGrokPermission({
  title,
  command,
}: {
  title: string;
  command: string;
}) {
  const [sel, setSel] = React.useState(0);
  const titleTyper = useTerminalTyper(title, { typeMs: 58, backspaceMs: 34 });
  const commandTyper = useTerminalTyper(command, {
    typeMs: 58,
    backspaceMs: 34,
  });

  const options = [
    "Yes, and don't ask again for anything (always-approve mode)",
    "Yes, proceed",
    "No, reject (type to add feedback)",
  ];

  return (
    <div className="font-mono text-[13px] leading-[1.55]">
      <div
        className="border-l-2 pl-3"
        style={{ borderColor: BORDER }}
        role="group"
        aria-label={title}
      >
        <div style={{ color: FG }}>
          {titleTyper.text}
          <TerminalCursor active={titleTyper.phase !== "idle"} color={FG} />
        </div>
        <div className="mb-2" style={{ color: MUTED }}>
          {commandTyper.text}
          <TerminalCursor
            active={commandTyper.phase !== "idle"}
            color={MUTED}
          />
        </div>

        <div className="space-y-0.5">
          {options.map((opt, i) => {
            const active = sel === i;
            return (
              <div
                key={opt}
                role="radio"
                aria-checked={active}
                tabIndex={active ? 0 : -1}
                onClick={() => setSel(i)}
                className={cn(
                  "flex cursor-pointer items-baseline gap-2 outline-none",
                  active && "font-semibold",
                )}
                style={{ color: active ? FG : MUTED }}
              >
                <span>{i + 1}</span>
                <span>{active ? "(●)" : "(○)"}</span>
                <span>{opt}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div
        className="mt-3 flex flex-wrap items-center gap-x-2 text-[12px]"
        style={{ color: DIM }}
      >
        <span>
          <span style={{ color: FG }}>
            {sel + 1}/{options.length}
          </span>
          :select
        </span>
        <span>│</span>
        <span>
          <span style={{ color: FG }}>Ctrl+o</span>:yolo
        </span>
        <span>│</span>
        <span>
          <span style={{ color: FG }}>Ctrl+c</span>:cancel
        </span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   10. GrokPrompt
   ───────────────────────────────────────────────────────────────────────── */

function SozoGrokPrompt({
  liveCommand,
  model = "Sozo 4.5 (xhigh)",
  modeLabel = "always-approve",
}: {
  liveCommand: string;
  model?: string;
  modeLabel?: string;
}) {
  const promptTyper = useTerminalTyper(liveCommand, {
    typeMs: 62,
    backspaceMs: 35,
  });

  return (
    <div className="font-mono text-[13px]">
      <div
        className="relative min-w-0 rounded-none border px-2.5 py-2"
        style={{ borderColor: "#505058", background: SURFACE }}
      >
        <div className="flex min-w-0 items-center gap-1.5">
          <span aria-hidden className="shrink-0" style={{ color: FG }}>
            ❯
          </span>
          <span className="min-w-0 flex-1 truncate" style={{ color: FG }}>
            {promptTyper.text}
            <TerminalCursor
              active={promptTyper.phase !== "idle"}
              alwaysShow
              color={FG}
            />
          </span>
        </div>

        <span
          className="absolute right-2 -bottom-2.5 max-w-[calc(100%-1rem)] truncate px-1 text-[12px] sm:right-3"
          style={{ background: SURFACE, color: MUTED }}
        >
          {model} · {modeLabel}
        </span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   Main Export: ContactStringHeroPreview (Frameless GrokSession w/ Sozo Brand)
   ───────────────────────────────────────────────────────────────────────── */

export interface ContactStringHeroPreviewProps {
  values: InquiryFormValues;
  activeStep: WizardStepId;
}

export function ContactStringHeroPreview({
  values,
  activeStep,
}: ContactStringHeroPreviewProps) {
  const hasCapability = values.softwareType.trim().length > 0;
  const blueprint = getCapabilityBlueprint(
    values.softwareType || "Custom Software Development",
  );

  const companySlug =
    values.company
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "acme-app";

  const currentStepIndex = WIZARD_STEPS.findIndex((s) => s.id === activeStep);

  const targetUserPrompt = React.useMemo(() => {
    const cap = hasCapability
      ? `scaffold ${values.softwareType.trim().toLowerCase()}`
      : "scaffold custom software platform";
    const wf = values.projectDescription
      .trim()
      .replace(/^[\s•\-*]+/, "")
      .replace(/\s+/g, " ")
      .slice(0, 60);
    return wf ? `${cap} and ${wf}` : `${cap} and wire 100% repo ownership`;
  }, [hasCapability, values.softwareType, values.projectDescription]);

  const targetAssistantReply = React.useMemo(() => {
    if (!hasCapability) {
      return "I'll inspect your workflow scope, drop in the custom modules, then configure 100% ownership.";
    }
    return `I'll scaffold ${blueprint.shortTitle} (${blueprint.code}), wire ${blueprint.apiBridges.map((b) => b.name).join(" + ")}, then deploy to your cloud.`;
  }, [hasCapability, blueprint]);

  const targetWriteCode = React.useMemo(() => {
    const props: string[] = [
      `system="${values.softwareType.trim() || blueprint.shortTitle}"`,
    ];
    if (values.estimatedBudget) {
      props.push(`budget="${values.estimatedBudget}"`);
    }
    if (values.preferredTimeline) {
      props.push(`timeline="${values.preferredTimeline}"`);
    }
    if (values.location) {
      props.push(`region="${values.location}"`);
    }
    if (values.company.trim() || values.name.trim()) {
      props.push(`owner="${values.company.trim() || values.name.trim()}"`);
    }
    return `return <SozoPlatform ${props.join(" ")} />`;
  }, [
    values.softwareType,
    values.estimatedBudget,
    values.preferredTimeline,
    values.location,
    values.company,
    values.name,
    blueprint.shortTitle,
  ]);

  const liveComposerText = React.useMemo(() => {
    if (values.email.trim()) {
      return `dispatch --to ${values.email.trim()} --founder ${siteConfig.founder.email}`;
    }
    if (values.company.trim()) {
      return `init ${companySlug} --owner "${values.company.trim()}"`;
    }
    if (values.projectDescription.trim()) {
      return values.projectDescription
        .trim()
        .replace(/^[\s•\-*]+/, "")
        .replace(/\s+/g, " ")
        .slice(0, 48);
    }
    if (hasCapability) {
      return `bootstrap ${values.softwareType.trim().toLowerCase()}`;
    }
    return "hello";
  }, [
    values.email,
    values.company,
    values.projectDescription,
    values.softwareType,
    companySlug,
    hasCapability,
  ]);

  const contextTokensUsed = `${16 + currentStepIndex * 4}K`;

  return (
    <div
      className="space-y-4 rounded-none p-5 font-mono"
      style={{ background: SURFACE, color: FG }}
    >
      {/* Top Status Bar */}
      <SozoGrokStatus
        branch="main"
        directory={`~/dev/${companySlug}`}
        contextUsed={contextTokensUsed}
        contextLimit="500K"
        turn={currentStepIndex + 1}
        turnTotal={WIZARD_STEPS.length}
      />

      {/* Launch Card with Studio Sozo Shimmer Mark */}
      <SozoGrokHeader
        version="2.4.0"
        headline={
          values.company.trim()
            ? `${values.company.trim()} OS is ready!`
            : "Studio Sozo 4.5 is here!"
        }
        subhead="Custom software & AI systems built for 100% ownership. Fill out the wizard on the left."
      />

      {/* Tip Line */}
      <p className="font-mono text-[13px]" style={{ color: MUTED }}>
        Tip: Use the wizard on the left to live-scaffold your custom platform.
      </p>

      {/* User Prompt */}
      <SozoGrokMessage role="user" time="4:38 PM" text={targetUserPrompt} />

      {/* Event + Thought */}
      <SozoGrokEvent label="user_prompt_submit" hooks={3} hooksOk={1} />
      <SozoGrokThought elapsed="0.4s" />

      {/* Assistant Reply */}
      <SozoGrokMessage
        role="assistant"
        time="4:38 PM"
        text={targetAssistantReply}
      />

      {/* Tool Read + Tool Card + Write Preview */}
      <SozoGrokTool verb="read" path={`app/${companySlug}/page.tsx`} />
      <SozoGrokTool
        variant="card"
        title={`Run Write components/${companySlug}-platform.tsx`}
        hooks={3}
      />
      <SozoGrokWrite
        before={[{ n: 12, text: "return <RentedSaasTools />" }]}
        afterTarget={targetWriteCode}
      />

      {/* Permission Block */}
      <SozoGrokPermission
        title={`Edit app/${companySlug}/page.tsx`}
        command={`apply patch (+${1 + (values.estimatedBudget ? 1 : 0) + (values.preferredTimeline ? 1 : 0) + (values.location ? 1 : 0)} −1)`}
      />

      {/* Stop Event + Turn Completed */}
      <SozoGrokEvent label="stop" hooks={3} hooksOk={1} />
      <p
        className="font-mono text-[13px] leading-[1.55]"
        style={{ color: MUTED }}
        role="status"
      >
        Turn completed in 12.4s.
      </p>

      {/* Bottom Sharp Composer */}
      <div className="pt-1 pb-2">
        <SozoGrokPrompt
          liveCommand={liveComposerText}
          model="Sozo 4.5 (xhigh)"
          modeLabel="always-approve"
        />
      </div>
    </div>
  );
}
