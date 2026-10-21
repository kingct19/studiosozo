"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export interface TaskStreamStep {
  id: string;
  phase: string;
  label: string;
  detail: string;
  durationLabel: string;
}

export interface TaskStreamProps {
  heading?: string;
  steps?: TaskStreamStep[];
  mode?: "light" | "dark";
  className?: string;
}

const DEFAULT_STEPS: TaskStreamStep[] = [
  {
    id: "discovery",
    phase: "PHASE 01",
    label: "Mapping operational workflows & bottlenecks",
    detail: "Auditing spreadsheets, intake forms, approval gates & handoffs",
    durationLabel: "Week 1–2",
  },
  {
    id: "architecture",
    phase: "PHASE 02",
    label: "Architecting database schema & role permissions",
    detail: "PostgreSQL domain modeling, RBAC rules & live staging prototype",
    durationLabel: "Week 2–4",
  },
  {
    id: "engineering",
    phase: "PHASE 03",
    label: "Engineering custom CRM, AI & API integrations",
    detail: "Full-stack build, Stripe/QuickBooks sync & automated pipelines",
    durationLabel: "Week 4–8",
  },
  {
    id: "deployment",
    phase: "PHASE 04",
    label: "Deploying to production with 100% code ownership",
    detail: "Zero-downtime cutover, team onboarding & full repo handover",
    durationLabel: "Launch",
  },
];

const STEP_DURATION_MS = 2300;
const HOLD_COMPLETE_MS = 2600;

export function TaskStream({
  heading = "Engineering your custom platform",
  steps = DEFAULT_STEPS,
  mode = "light",
  className,
}: TaskStreamProps) {
  const reduceMotion = useReducedMotion();
  const [activeStep, setActiveStep] = useState(0);
  const [justCompleted, setJustCompleted] = useState<number | null>(null);
  const [cycleKey, setCycleKey] = useState(0);

  useEffect(() => {
    if (reduceMotion) {
      setActiveStep(steps.length);
      return;
    }

    const isAllDone = activeStep >= steps.length;
    const delay = isAllDone ? HOLD_COMPLETE_MS : STEP_DURATION_MS;

    const timer = setTimeout(() => {
      if (isAllDone) {
        setJustCompleted(null);
        setActiveStep(0);
        setCycleKey((k) => k + 1);
      } else {
        setJustCompleted(activeStep);
        setActiveStep((prev) => prev + 1);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [activeStep, steps.length, reduceMotion, cycleKey]);

  const isDark = mode === "dark";
  const headingWords = heading.split(" ");
  const cameraScale =
    reduceMotion || activeStep >= 2 ? 1 : activeStep === 0 ? 1.045 : 1.02;
  const cameraY =
    reduceMotion || activeStep >= 2 ? 0 : activeStep === 0 ? 10 : 4;

  const visibleCount = reduceMotion
    ? steps.length
    : Math.min(steps.length, activeStep + 1);

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-[24px] border border-[#e3e8ee] select-none",
        isDark ? "bg-[#0a2540] text-white" : "bg-[#f8fafc] text-[#0a2540]",
        "shadow-[0_24px_60px_rgba(10,37,64,0.12),inset_0_1px_0_rgba(255,255,255,0.9)]",
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(10,37,64,0.06)_1px,transparent_1px)] bg-size-[20px_20px]"
      />

      <div className="relative z-10 flex items-center justify-between border-b border-[#e3e8ee] bg-white/90 px-5 py-3.5 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#0a2540]/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#0a2540]/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#635bff]/60" />
          <span className="ml-2 font-mono text-[11px] font-bold tracking-widest text-[#425466] uppercase">
            [ STUDIO SOZO // BUILD PIPELINE STREAM ]
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-bold tracking-widest text-[#635bff] uppercase">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#635bff]" />
            {activeStep >= steps.length
              ? "100% OWNED & DEPLOYED"
              : `RUNNING PHASE 0${activeStep + 1}`}
          </span>
        </div>
      </div>

      <motion.div
        animate={{ scale: cameraScale, y: cameraY }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 px-6 py-8 sm:px-10 sm:py-10"
      >
        <div
          key={`heading-${cycleKey}`}
          className="mb-6 flex flex-wrap items-center gap-x-1.5 font-sans text-lg font-semibold tracking-tight text-[#64748b] sm:text-xl"
        >
          {headingWords.map((word, idx) => (
            <motion.span
              key={`${word}-${idx}`}
              initial={reduceMotion ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.32,
                delay: idx * 0.06,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={
                idx < headingWords.length - 1
                  ? "font-bold text-[#0a2540]"
                  : "text-[#64748b]"
              }
            >
              {word}
            </motion.span>
          ))}
          <motion.span
            initial={reduceMotion ? false : { opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.28,
              delay: headingWords.length * 0.06 + 0.05,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="ml-0.5 text-[#94a3b8]"
          >
            &rsaquo;
          </motion.span>
        </div>

        <div className="relative pl-5 sm:pl-6">
          <div
            aria-hidden
            className="absolute top-1 bottom-1 left-0 w-[2px] rounded-full bg-[#e2e8f0]"
          />
          <motion.div
            aria-hidden
            className="absolute top-1 left-0 w-[2px] origin-top rounded-full bg-gradient-to-b from-[#635bff] via-[#38bdf8] to-[#0a2540]"
            animate={{
              height: `${Math.min(100, (activeStep / steps.length) * 100)}%`,
            }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          />

          <div className="space-y-4">
            <AnimatePresence initial={false}>
              {steps.slice(0, visibleCount).map((step, index) => {
                const isDone = index < activeStep;
                const isRunning = index === activeStep;
                const isFlashing = justCompleted === index;
                const words = step.label.split(" ");

                return (
                  <motion.div
                    key={`${step.id}-${cycleKey}`}
                    initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.42,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    onClick={() => {
                      setJustCompleted(index);
                      setActiveStep(index + 1);
                    }}
                    className={cn(
                      "group relative cursor-pointer rounded-xl border px-4 py-3.5 transition-colors sm:px-5 sm:py-4",
                      isRunning
                        ? "border-[#635bff]/40 bg-white shadow-[0_8px_24px_rgba(99,91,255,0.08)]"
                        : isDone
                          ? "border-[#e3e8ee] bg-white/85 hover:border-[#cbd5e1]"
                          : "border-transparent bg-transparent",
                    )}
                  >
                    <div className="flex items-start gap-3.5">
                      <div className="relative mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center">
                        {isRunning ? (
                          <svg
                            className="h-6 w-6 animate-spin"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <circle
                              cx="12"
                              cy="12"
                              r="9.5"
                              stroke="#dbeafe"
                              strokeWidth="2.5"
                            />
                            <path
                              d="M12 2.5a9.5 9.5 0 0 1 9.5 9.5"
                              stroke="#2563eb"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                            />
                          </svg>
                        ) : (
                          <motion.div
                            initial={
                              reduceMotion ? false : { scale: 0.75, opacity: 0 }
                            }
                            animate={{
                              scale: 1,
                              opacity: 1,
                              backgroundColor: isFlashing
                                ? ["#06b6d4", "#2563eb", "#0a2540"]
                                : "#0a2540",
                              boxShadow: isFlashing
                                ? [
                                    "0 0 18px rgba(6,182,212,0.75)",
                                    "0 0 10px rgba(37,99,235,0.45)",
                                    "0 0 0px rgba(10,37,64,0)",
                                  ]
                                : "0 0 0px rgba(10,37,64,0)",
                            }}
                            transition={{ duration: 0.55, ease: "easeOut" }}
                            className="flex h-6 w-6 items-center justify-center rounded-full text-white"
                          >
                            <svg
                              className="h-3.5 w-3.5"
                              viewBox="0 0 16 16"
                              fill="none"
                            >
                              <motion.path
                                d="M3.5 8.5L6.5 11.5L12.5 4.5"
                                stroke="currentColor"
                                strokeWidth="2.2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                initial={
                                  reduceMotion ? false : { pathLength: 0 }
                                }
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 0.28, ease: "easeOut" }}
                              />
                            </svg>
                          </motion.div>
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
                          <span className="font-mono text-[10px] font-bold tracking-widest text-[#635bff] uppercase">
                            {step.phase}
                          </span>
                          <span className="rounded-full border border-[#e3e8ee] bg-[#f8fafc] px-2.5 py-0.5 font-mono text-[10px] font-bold tracking-wider text-[#64748b] uppercase">
                            {step.durationLabel}
                          </span>
                        </div>

                        <div className="relative overflow-hidden">
                          <p className="flex flex-wrap gap-x-1.5 font-sans text-base font-bold tracking-tight text-[#0a2540] sm:text-lg">
                            {words.map((w, wIdx) => (
                              <motion.span
                                key={`${w}-${wIdx}`}
                                initial={
                                  reduceMotion ? false : { opacity: 0, y: 5 }
                                }
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                  duration: 0.26,
                                  delay: wIdx * 0.045,
                                  ease: [0.16, 1, 0.3, 1],
                                }}
                                className={cn(
                                  isRunning &&
                                    "bg-gradient-to-r from-[#0a2540] via-[#2563eb] to-[#0a2540] bg-clip-text",
                                )}
                              >
                                {w}
                              </motion.span>
                            ))}
                          </p>

                          {isRunning && !reduceMotion && (
                            <motion.div
                              aria-hidden
                              initial={{ x: "-100%" }}
                              animate={{ x: "180%" }}
                              transition={{
                                duration: 1.6,
                                repeat: Infinity,
                                ease: "linear",
                              }}
                              className="pointer-events-none absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-[#38bdf8]/20 to-transparent"
                            />
                          )}
                        </div>

                        <p className="mt-1 font-sans text-xs font-medium text-[#64748b] sm:text-sm">
                          {step.detail}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-t border-[#e3e8ee] bg-white/90 px-5 py-3 backdrop-blur-md">
        <div className="flex items-center gap-1.5">
          {steps.map((step, idx) => {
            const isActive = idx === activeStep;
            const isComplete = idx < activeStep;
            return (
              <button
                key={step.id}
                type="button"
                onClick={() => {
                  setJustCompleted(null);
                  setActiveStep(idx);
                }}
                aria-label={`Jump to ${step.phase}`}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  isActive
                    ? "w-8 bg-[#2563eb]"
                    : isComplete
                      ? "w-4 bg-[#0a2540]"
                      : "w-4 bg-[#cbd5e1] hover:bg-[#94a3b8]",
                )}
              />
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => {
            setJustCompleted(null);
            setActiveStep(0);
            setCycleKey((k) => k + 1);
          }}
          className="font-mono text-[10px] font-bold tracking-widest text-[#64748b] uppercase transition-colors hover:text-[#635bff]"
        >
          [ REPLAY STREAM ]
        </button>
      </div>
    </div>
  );
}
