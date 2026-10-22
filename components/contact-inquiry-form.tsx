"use client";

import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Loader2,
  Sparkles,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Controller, useForm, useWatch, type Resolver } from "react-hook-form";

import { submitProjectInquiry } from "@/app/contact/actions";
import { MeshInk } from "@/components/brand-mesh";
import { ContactStringHeroPreview } from "@/components/contact-string-hero-preview";
import { LitUpButton } from "@/components/lit-up-button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  CAPABILITY_BLUEPRINTS,
  getCapabilityBlueprint,
  WIZARD_STEPS,
  type SoftwareCapabilityOption,
  type WizardStepId,
} from "@/lib/inquiry-blueprint-data";
import {
  budgetRangeOptions,
  inquiryLocationOptions,
  inquirySchema,
  softwareTypeOptions,
  timelineOptions,
  type InquiryFormValues,
} from "@/lib/inquiry-schema";
import { cn } from "@/lib/utils";

const inquiryResolver: Resolver<InquiryFormValues> = async (values) => {
  const result = inquirySchema.safeParse(values);
  if (result.success) {
    return {
      values: result.data,
      errors: {},
    };
  }

  const errors: Record<string, { type: string; message: string }> = {};
  for (const issue of result.error.issues) {
    const fieldName = String(issue.path[0] ?? "");
    if (fieldName && !errors[fieldName]) {
      errors[fieldName] = {
        type: issue.code,
        message: issue.message,
      };
    }
  }

  return {
    values: {},
    errors,
  };
};

function getFieldsForStep(
  stepId: WizardStepId,
): readonly (keyof InquiryFormValues)[] {
  switch (stepId) {
    case "system":
      return ["softwareType"];
    case "workflow":
      return ["projectDescription"];
    case "parameters":
      return ["estimatedBudget", "preferredTimeline", "location"];
    case "dispatch":
      return ["name", "company", "email", "phone"];
    default: {
      const _exhaustive: never = stepId;
      return _exhaustive;
    }
  }
}

function getStepForField(field: keyof InquiryFormValues): WizardStepId {
  switch (field) {
    case "softwareType":
      return "system";
    case "projectDescription":
      return "workflow";
    case "estimatedBudget":
    case "preferredTimeline":
    case "location":
      return "parameters";
    case "name":
    case "company":
    case "email":
    case "phone":
      return "dispatch";
    default: {
      const _exhaustive: never = field;
      return _exhaustive;
    }
  }
}

export function ContactInquiryForm() {
  const [activeStep, setActiveStep] = useState<WizardStepId>("system");
  const [direction, setDirection] = useState<1 | -1>(1);
  const [activeChips, setActiveChips] = useState<string[]>([]);
  const [serverStatus, setServerStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const form = useForm<InquiryFormValues>({
    resolver: inquiryResolver,
    defaultValues: {
      name: "",
      company: "",
      email: "",
      phone: "",
      location: "",
      softwareType: "",
      projectDescription: "",
      estimatedBudget: "",
      preferredTimeline: "",
    },
  });

  const {
    register,
    control,
    handleSubmit,
    setError,
    setValue,
    getValues,
    trigger,
    reset,
    formState: { errors, isSubmitting },
  } = form;

  const watchedValues = useWatch({ control });
  const liveValues: InquiryFormValues = {
    name: watchedValues.name ?? "",
    company: watchedValues.company ?? "",
    email: watchedValues.email ?? "",
    phone: watchedValues.phone ?? "",
    location: watchedValues.location ?? "",
    softwareType: watchedValues.softwareType ?? "",
    projectDescription: watchedValues.projectDescription ?? "",
    estimatedBudget: watchedValues.estimatedBudget ?? "",
    preferredTimeline: watchedValues.preferredTimeline ?? "",
  };

  const activeBlueprint = getCapabilityBlueprint(liveValues.softwareType);
  const currentStepIndex = WIZARD_STEPS.findIndex((s) => s.id === activeStep);
  const currentStepMeta = WIZARD_STEPS[currentStepIndex] ?? WIZARD_STEPS[0];
  const progressPercent = Math.round(
    ((currentStepIndex + 1) / WIZARD_STEPS.length) * 100,
  );

  const handleTogglePromptChip = (chip: string) => {
    const currentText = getValues("projectDescription").trim();
    const isAlreadyActive = activeChips.includes(chip);

    if (isAlreadyActive) {
      setActiveChips((prev) => prev.filter((item) => item !== chip));
      const bulletLine = `• ${chip}`;
      const cleaned = currentText
        .split("\n")
        .filter((line) => line.trim() !== bulletLine && line.trim() !== chip)
        .join("\n")
        .trim();
      setValue("projectDescription", cleaned, {
        shouldValidate: cleaned.length >= 20,
        shouldDirty: true,
      });
      return;
    }

    setActiveChips((prev) => [...prev, chip]);
    const nextText = currentText ? `${currentText}\n• ${chip}` : `• ${chip}`;
    setValue("projectDescription", nextText, {
      shouldValidate: nextText.trim().length >= 20,
      shouldDirty: true,
    });
  };

  const handleNextStep = async () => {
    const fields = getFieldsForStep(activeStep);
    const valid = await trigger(fields as (keyof InquiryFormValues)[]);
    if (!valid) return;

    const nextStep = WIZARD_STEPS[currentStepIndex + 1];
    if (nextStep) {
      setDirection(1);
      setActiveStep(nextStep.id);
    }
  };

  const handlePrevStep = () => {
    const prevStep = WIZARD_STEPS[currentStepIndex - 1];
    if (prevStep) {
      setDirection(-1);
      setActiveStep(prevStep.id);
    }
  };

  const handleSelectStepTab = async (targetStep: WizardStepId) => {
    const targetIdx = WIZARD_STEPS.findIndex((s) => s.id === targetStep);
    if (targetIdx === currentStepIndex) return;

    if (targetIdx < currentStepIndex) {
      setDirection(-1);
      setActiveStep(targetStep);
      return;
    }

    const fields = getFieldsForStep(activeStep);
    const valid = await trigger(fields as (keyof InquiryFormValues)[]);
    if (valid) {
      setDirection(1);
      setActiveStep(targetStep);
    }
  };

  const onInvalidSubmit = (fieldErrors: Record<string, unknown>) => {
    const firstErrorKey = Object.keys(fieldErrors)[0] as
      | keyof InquiryFormValues
      | undefined;
    if (firstErrorKey) {
      setActiveStep(getStepForField(firstErrorKey));
    }
  };

  const onSubmit = async (values: InquiryFormValues) => {
    setServerStatus(null);
    const response = await submitProjectInquiry(values);

    if (!response.ok) {
      if (response.fieldErrors) {
        let firstStepWithError: WizardStepId | null = null;
        for (const [key, message] of Object.entries(response.fieldErrors)) {
          if (message) {
            const typedKey = key as keyof InquiryFormValues;
            if (!firstStepWithError) {
              firstStepWithError = getStepForField(typedKey);
            }
            setError(typedKey, {
              type: "server",
              message,
            });
          }
        }
        if (firstStepWithError) {
          setActiveStep(firstStepWithError);
        }
      }
      setServerStatus({
        type: "error",
        message: response.message,
      });
      return;
    }

    setServerStatus({
      type: "success",
      message: response.message,
    });
    setActiveChips([]);
    reset();
  };

  const descriptionCharCount = liveValues.projectDescription.trim().length;

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
      <div className="lg:col-span-7">
        <Card className="relative rounded-none border border-[#e3e8ee] bg-white shadow-none backdrop-blur-md">
      <div className="absolute top-0 left-0 h-2 w-2 border-t border-l border-[#635bff]/35" />
      <div className="absolute top-0 right-0 h-2 w-2 border-t border-r border-[#635bff]/35" />
      <div className="absolute bottom-0 left-0 h-2 w-2 border-b border-l border-[#635bff]/35" />
      <div className="absolute right-0 bottom-0 h-2 w-2 border-r border-b border-[#635bff]/35" />

      <CardHeader className="border-b border-[#e3e8ee] pb-5">
        <div className="flex items-center justify-between gap-2">
          <div className="text-brand text-xs font-bold tracking-widest uppercase">
            <MeshInk>{"//"} START A CONVERSATION</MeshInk>
          </div>
          <span className="font-mono text-[11px] font-bold tracking-widest text-[#635bff] uppercase">
            STEP 0{currentStepIndex + 1} OF 0{WIZARD_STEPS.length}
          </span>
        </div>

        {/* Animated Progress Bar */}
        <div className="mt-2 h-1 w-full overflow-hidden bg-[#f1f5f9]">
          <motion.div
            className="h-full bg-[#635bff]"
            initial={false}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>

        {/* Stepper Pills */}
        <div className="mt-3 grid grid-cols-4 gap-1.5">
          {WIZARD_STEPS.map((step, idx) => {
            const isCurrent = step.id === activeStep;
            const isCompleted = idx < currentStepIndex;

            return (
              <button
                key={step.id}
                type="button"
                onClick={() => handleSelectStepTab(step.id)}
                className={cn(
                  "flex items-center justify-between border px-2.5 py-2 text-left transition-colors",
                  isCurrent
                    ? "border-[#635bff] bg-[#635bff]/6 text-[#0a2540]"
                    : isCompleted
                      ? "border-[#e3e8ee] bg-[#f8fafc] text-[#0a2540] hover:border-[#635bff]/40"
                      : "border-[#e3e8ee] bg-white text-[#8898aa] hover:border-[#cbd5e1]",
                )}
              >
                <div className="min-w-0">
                  <span
                    className={cn(
                      "block font-mono text-[9px] font-bold tracking-widest uppercase",
                      isCurrent
                        ? "text-[#635bff]"
                        : isCompleted
                          ? "text-emerald-600"
                          : "text-[#8898aa]",
                    )}
                  >
                    0{idx + 1}
                  </span>
                  <span className="block truncate font-sans text-xs font-semibold">
                    {step.label}
                  </span>
                </div>
                {isCompleted && (
                  <Check className="size-3.5 shrink-0 text-emerald-600" />
                )}
              </button>
            );
          })}
        </div>

        <CardTitle className="mt-4 font-sans text-2xl font-semibold tracking-tight text-[#0a2540]">
          {currentStepMeta.headline}
        </CardTitle>
        <CardDescription className="text-xs tracking-wider text-[#425466] uppercase">
          {currentStepMeta.subtitle}
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-6">
        <form
          onSubmit={handleSubmit(onSubmit, onInvalidSubmit)}
          noValidate
          className="flex flex-col gap-6"
        >
          {serverStatus && (
            <Alert
              variant={
                serverStatus.type === "error" ? "destructive" : "default"
              }
            >
              {serverStatus.type === "error" ? (
                <AlertCircle className="size-4" />
              ) : (
                <CheckCircle2 className="size-4 text-emerald-600" />
              )}
              <AlertTitle>
                {serverStatus.type === "error"
                  ? "Submission Not Completed"
                  : "Inquiry Received"}
              </AlertTitle>
              <AlertDescription>{serverStatus.message}</AlertDescription>
            </Alert>
          )}

          {serverStatus?.type === "success" ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-start gap-4 border border-[#e3e8ee] bg-[#f8fafc] p-6"
            >
              <div className="inline-flex items-center gap-2 font-mono text-xs font-bold tracking-widest text-emerald-700 uppercase">
                <CheckCircle2 className="size-4" />
                PROJECT BRIEF DELIVERED
              </div>
              <p className="font-sans text-sm leading-relaxed text-[#425466]">
                Thank you for sharing your project details. Chandler will review
                your workflow scope and follow up directly.
              </p>
              <button
                type="button"
                onClick={() => {
                  setServerStatus(null);
                  setActiveStep("system");
                }}
                className="border border-[#0a2540] bg-white px-4 py-2 font-mono text-xs font-bold tracking-widest text-[#0a2540] uppercase transition-colors hover:border-[#635bff] hover:text-[#635bff]"
              >
                Start Another Inquiry
              </button>
            </motion.div>
          ) : (
            <FieldGroup>
              <AnimatePresence mode="wait" initial={false}>
                {/* STEP 1: SOFTWARE TYPE */}
                {activeStep === "system" && (
                  <motion.div
                    key="step-system"
                    initial={{ opacity: 0, x: direction * 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: direction * -20 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Controller
                      control={control}
                      name="softwareType"
                      render={({ field }) => (
                        <Field data-invalid={!!errors.softwareType}>
                          <FieldLabel>
                            What type of system do you need?
                          </FieldLabel>
                          <div className="mt-2 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                            {softwareTypeOptions.map((option) => {
                              const profile =
                                CAPABILITY_BLUEPRINTS[
                                  option as SoftwareCapabilityOption
                                ];
                              const isSelected = field.value === option;

                              return (
                                <button
                                  key={option}
                                  type="button"
                                  onClick={() => field.onChange(option)}
                                  className={cn(
                                    "group relative flex flex-col justify-between border p-3.5 text-left transition-all",
                                    option === "Other / Multiple Systems" &&
                                      "sm:col-span-2",
                                    isSelected
                                      ? "border-[#635bff] bg-[#635bff]/6 shadow-[0_4px_16px_rgba(99,91,255,0.08)]"
                                      : "border-[#e3e8ee] bg-white hover:border-[#635bff]/50 hover:bg-[#f8fafc]",
                                  )}
                                >
                                  <div className="flex w-full items-center justify-between gap-2">
                                    <span
                                      className={cn(
                                        "font-mono text-[10px] font-bold tracking-widest uppercase",
                                        isSelected
                                          ? "text-[#635bff]"
                                          : "text-[#8898aa]",
                                      )}
                                    >
                                      {profile.code}
                                    </span>
                                    <span
                                      className={cn(
                                        "flex h-4 w-4 items-center justify-center border transition-colors",
                                        isSelected
                                          ? "border-[#635bff] bg-[#635bff] text-white"
                                          : "border-[#cbd5e1] bg-white",
                                      )}
                                    >
                                      {isSelected && (
                                        <Check className="size-2.5" />
                                      )}
                                    </span>
                                  </div>
                                  <p className="mt-1.5 font-sans text-sm font-bold text-[#0a2540]">
                                    {option}
                                  </p>
                                  <p className="mt-0.5 font-sans text-xs leading-relaxed text-[#425466]">
                                    {profile.tagline}
                                  </p>
                                </button>
                              );
                            })}
                          </div>
                          <FieldError errors={[errors.softwareType]} />
                        </Field>
                      )}
                    />
                  </motion.div>
                )}

                {/* STEP 2: PROJECT DESCRIPTION */}
                {activeStep === "workflow" && (
                  <motion.div
                    key="step-workflow"
                    initial={{ opacity: 0, x: direction * 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: direction * -20 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="space-y-4"
                  >
                    <div>
                      <p className="mb-2 font-mono text-[11px] font-bold tracking-wider text-[#425466] uppercase">
                        Common goals for {activeBlueprint.shortTitle} (optional
                        quick-add):
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {activeBlueprint.promptChips.map((chip) => {
                          const isChipActive = activeChips.includes(chip);
                          return (
                            <button
                              key={chip}
                              type="button"
                              onClick={() => handleTogglePromptChip(chip)}
                              className={cn(
                                "inline-flex items-center gap-1.5 border px-2.5 py-1.5 font-mono text-[11px] transition-colors",
                                isChipActive
                                  ? "border-[#635bff] bg-[#635bff] font-bold text-white"
                                  : "border-[#e3e8ee] bg-[#f8fafc] text-[#0a2540] hover:border-[#635bff]",
                              )}
                            >
                              <Sparkles className="size-3 shrink-0" />
                              <span>{chip}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <Field data-invalid={!!errors.projectDescription}>
                      <div className="flex items-center justify-between">
                        <FieldLabel htmlFor="projectDescription">
                          Project Description
                        </FieldLabel>
                        <span
                          className={cn(
                            "font-mono text-[10px] font-bold uppercase",
                            descriptionCharCount >= 20
                              ? "text-emerald-600"
                              : "text-[#8898aa]",
                          )}
                        >
                          {descriptionCharCount >= 20
                            ? "Ready"
                            : `${descriptionCharCount}/20 min chars`}
                        </span>
                      </div>
                      <Textarea
                        id="projectDescription"
                        rows={5}
                        placeholder="Tell us what tools or spreadsheets you are replacing, how your team currently works, and what you want the new system to handle..."
                        aria-invalid={!!errors.projectDescription}
                        {...register("projectDescription")}
                      />
                      <FieldDescription>
                        Include any existing platforms, APIs, or manual
                        workflows you want to connect or replace.
                      </FieldDescription>
                      <FieldError errors={[errors.projectDescription]} />
                    </Field>
                  </motion.div>
                )}

                {/* STEP 3: BUDGET, TIMELINE & LOCATION */}
                {activeStep === "parameters" && (
                  <motion.div
                    key="step-parameters"
                    initial={{ opacity: 0, x: direction * 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: direction * -20 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="space-y-5"
                  >
                    <Controller
                      control={control}
                      name="estimatedBudget"
                      render={({ field }) => (
                        <Field data-invalid={!!errors.estimatedBudget}>
                          <FieldLabel>Estimated Budget</FieldLabel>
                          <div className="mt-1.5 grid grid-cols-1 gap-2 sm:grid-cols-2">
                            {budgetRangeOptions.map((option) => {
                              const isSelected = field.value === option;
                              return (
                                <button
                                  key={option}
                                  type="button"
                                  onClick={() => field.onChange(option)}
                                  className={cn(
                                    "flex items-center justify-between border px-3.5 py-2.5 text-left font-mono text-xs transition-colors",
                                    option ===
                                      "Exploring Scope / Needs Assessment" &&
                                      "sm:col-span-2",
                                    isSelected
                                      ? "border-[#635bff] bg-[#635bff]/8 font-bold text-[#0a2540]"
                                      : "border-[#e3e8ee] bg-white text-[#425466] hover:border-[#635bff]/50",
                                  )}
                                >
                                  <span>{option}</span>
                                  {isSelected && (
                                    <Check className="size-3.5 text-[#635bff]" />
                                  )}
                                </button>
                              );
                            })}
                          </div>
                          <FieldError errors={[errors.estimatedBudget]} />
                        </Field>
                      )}
                    />

                    <Controller
                      control={control}
                      name="preferredTimeline"
                      render={({ field }) => (
                        <Field data-invalid={!!errors.preferredTimeline}>
                          <FieldLabel>Preferred Timeline</FieldLabel>
                          <div className="mt-1.5 grid grid-cols-1 gap-2 sm:grid-cols-2">
                            {timelineOptions.map((option) => {
                              const isSelected = field.value === option;
                              return (
                                <button
                                  key={option}
                                  type="button"
                                  onClick={() => field.onChange(option)}
                                  className={cn(
                                    "flex items-center justify-between border px-3.5 py-2.5 text-left font-mono text-xs transition-colors",
                                    isSelected
                                      ? "border-[#635bff] bg-[#635bff]/8 font-bold text-[#0a2540]"
                                      : "border-[#e3e8ee] bg-white text-[#425466] hover:border-[#635bff]/50",
                                  )}
                                >
                                  <span>{option}</span>
                                  {isSelected && (
                                    <Check className="size-3.5 text-[#635bff]" />
                                  )}
                                </button>
                              );
                            })}
                          </div>
                          <FieldError errors={[errors.preferredTimeline]} />
                        </Field>
                      )}
                    />

                    <Controller
                      control={control}
                      name="location"
                      render={({ field }) => (
                        <Field data-invalid={!!errors.location}>
                          <FieldLabel htmlFor="location-trigger">
                            Location
                          </FieldLabel>
                          <Select
                            value={field.value || null}
                            onValueChange={(val) => field.onChange(val ?? "")}
                          >
                            <SelectTrigger
                              id="location-trigger"
                              className="w-full"
                              aria-invalid={!!errors.location}
                            >
                              <SelectValue placeholder="Select your service area" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                {inquiryLocationOptions.map((option) => (
                                  <SelectItem key={option} value={option}>
                                    {option}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                          <FieldError errors={[errors.location]} />
                        </Field>
                      )}
                    />
                  </motion.div>
                )}

                {/* STEP 4: CONTACT DETAILS */}
                {activeStep === "dispatch" && (
                  <motion.div
                    key="step-dispatch"
                    initial={{ opacity: 0, x: direction * 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: direction * -20 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="space-y-5"
                  >
                    <div className="grid gap-5 md:grid-cols-2">
                      <Field data-invalid={!!errors.name}>
                        <FieldLabel htmlFor="name">Name</FieldLabel>
                        <Input
                          id="name"
                          placeholder="Jane Doe"
                          aria-invalid={!!errors.name}
                          {...register("name")}
                        />
                        <FieldError errors={[errors.name]} />
                      </Field>

                      <Field data-invalid={!!errors.company}>
                        <FieldLabel htmlFor="company">Company</FieldLabel>
                        <Input
                          id="company"
                          placeholder="Your Company LLC"
                          aria-invalid={!!errors.company}
                          {...register("company")}
                        />
                        <FieldError errors={[errors.company]} />
                      </Field>
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                      <Field data-invalid={!!errors.email}>
                        <FieldLabel htmlFor="email">Email</FieldLabel>
                        <Input
                          id="email"
                          type="email"
                          placeholder="you@company.com"
                          aria-invalid={!!errors.email}
                          {...register("email")}
                        />
                        <FieldError errors={[errors.email]} />
                      </Field>

                      <Field data-invalid={!!errors.phone}>
                        <FieldLabel htmlFor="phone">Phone</FieldLabel>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="(555) 000-0000"
                          aria-invalid={!!errors.phone}
                          {...register("phone")}
                        />
                        <FieldError errors={[errors.phone]} />
                      </Field>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </FieldGroup>
          )}

          {serverStatus?.type !== "success" && (
            <div className="flex flex-col gap-3 border-t border-[#e3e8ee] pt-5 sm:flex-row sm:items-center sm:justify-between">
              {currentStepIndex > 0 ? (
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="inline-flex items-center justify-center gap-2 border border-[#e3e8ee] bg-white px-4 py-2.5 font-mono text-xs font-bold tracking-widest text-[#0a2540] uppercase transition-colors hover:border-[#635bff] hover:text-[#635bff]"
                >
                  <ArrowLeft className="size-3.5" />
                  Back
                </button>
              ) : (
                <p className="text-xs tracking-wider text-[#6b7c93] uppercase">
                  Operated by Sozo Tech Enterprise LLC.
                </p>
              )}

              {activeStep !== "dispatch" ? (
                <LitUpButton
                  type="button"
                  onClick={handleNextStep}
                  className="w-full font-mono text-xs font-bold tracking-widest uppercase sm:w-auto"
                >
                  Continue
                  <ArrowRight className="size-4" />
                </LitUpButton>
              ) : (
                <LitUpButton
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full font-mono text-xs font-bold tracking-widest uppercase sm:w-auto"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      Sending Inquiry...
                    </>
                  ) : (
                    "Submit Project Inquiry"
                  )}
                </LitUpButton>
              )}
            </div>
          )}
        </form>
      </CardContent>
    </Card>
      </div>

      <div className="lg:col-span-5 lg:sticky lg:top-28">
        <ContactStringHeroPreview
          values={liveValues}
          activeStep={activeStep}
        />
      </div>
    </div>
  );
}
