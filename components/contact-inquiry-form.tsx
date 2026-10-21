"use client";

import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { useState } from "react";
import { Controller, useForm, type Resolver } from "react-hook-form";

import { submitProjectInquiry } from "@/app/contact/actions";
import { MeshInk } from "@/components/brand-mesh";
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
  budgetRangeOptions,
  inquiryLocationOptions,
  inquirySchema,
  softwareTypeOptions,
  timelineOptions,
  type InquiryFormValues,
} from "@/lib/inquiry-schema";

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

export function ContactInquiryForm() {
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
    reset,
    formState: { errors, isSubmitting },
  } = form;

  const onSubmit = async (values: InquiryFormValues) => {
    setServerStatus(null);
    const response = await submitProjectInquiry(values);

    if (!response.ok) {
      if (response.fieldErrors) {
        for (const [key, message] of Object.entries(response.fieldErrors)) {
          if (message) {
            setError(key as keyof InquiryFormValues, {
              type: "server",
              message,
            });
          }
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
    reset();
  };

  return (
    <Card className="relative rounded-none border border-[#e3e8ee] bg-white backdrop-blur-md shadow-none">
      <div className="absolute top-0 left-0 h-2 w-2 border-t border-l border-[#635bff]/35" />
      <div className="absolute top-0 right-0 h-2 w-2 border-t border-r border-[#635bff]/35" />
      <div className="absolute bottom-0 left-0 h-2 w-2 border-b border-l border-[#635bff]/35" />
      <div className="absolute right-0 bottom-0 h-2 w-2 border-r border-b border-[#635bff]/35" />
      <CardHeader>
        <div className="text-brand mb-1 text-xs font-bold tracking-widest uppercase">
          <MeshInk>{"//"} START A CONVERSATION</MeshInk>
        </div>
        <CardTitle className="font-sans text-2xl font-semibold tracking-tight">
          Project Inquiry
        </CardTitle>
        <CardDescription className="text-xs tracking-wider text-[#425466] uppercase">
          Share a few details about your business and the system you want to
          build or automate.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
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
                <CheckCircle2 className="size-4" />
              )}
              <AlertTitle>
                {serverStatus.type === "error"
                  ? "Submission Not Completed"
                  : "Inquiry Received"}
              </AlertTitle>
              <AlertDescription>{serverStatus.message}</AlertDescription>
            </Alert>
          )}

          <FieldGroup>
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

            <div className="grid gap-5 md:grid-cols-2">
              <Controller
                control={control}
                name="location"
                render={({ field }) => (
                  <Field data-invalid={!!errors.location}>
                    <FieldLabel htmlFor="location-trigger">Location</FieldLabel>
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

              <Controller
                control={control}
                name="softwareType"
                render={({ field }) => (
                  <Field data-invalid={!!errors.softwareType}>
                    <FieldLabel htmlFor="softwareType-trigger">
                      Type of Software Needed
                    </FieldLabel>
                    <Select
                      value={field.value || null}
                      onValueChange={(val) => field.onChange(val ?? "")}
                    >
                      <SelectTrigger
                        id="softwareType-trigger"
                        className="w-full"
                        aria-invalid={!!errors.softwareType}
                      >
                        <SelectValue placeholder="Select primary capability" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {softwareTypeOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FieldError errors={[errors.softwareType]} />
                  </Field>
                )}
              />
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <Controller
                control={control}
                name="estimatedBudget"
                render={({ field }) => (
                  <Field data-invalid={!!errors.estimatedBudget}>
                    <FieldLabel htmlFor="estimatedBudget-trigger">
                      Estimated Budget
                    </FieldLabel>
                    <Select
                      value={field.value || null}
                      onValueChange={(val) => field.onChange(val ?? "")}
                    >
                      <SelectTrigger
                        id="estimatedBudget-trigger"
                        className="w-full"
                        aria-invalid={!!errors.estimatedBudget}
                      >
                        <SelectValue placeholder="Select budget range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {budgetRangeOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FieldError errors={[errors.estimatedBudget]} />
                  </Field>
                )}
              />

              <Controller
                control={control}
                name="preferredTimeline"
                render={({ field }) => (
                  <Field data-invalid={!!errors.preferredTimeline}>
                    <FieldLabel htmlFor="preferredTimeline-trigger">
                      Preferred Timeline
                    </FieldLabel>
                    <Select
                      value={field.value || null}
                      onValueChange={(val) => field.onChange(val ?? "")}
                    >
                      <SelectTrigger
                        id="preferredTimeline-trigger"
                        className="w-full"
                        aria-invalid={!!errors.preferredTimeline}
                      >
                        <SelectValue placeholder="Select target timeline" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {timelineOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FieldError errors={[errors.preferredTimeline]} />
                  </Field>
                )}
              />
            </div>

            <Field data-invalid={!!errors.projectDescription}>
              <FieldLabel htmlFor="projectDescription">
                Project Description
              </FieldLabel>
              <Textarea
                id="projectDescription"
                rows={5}
                placeholder="Tell us what tools or spreadsheets you are replacing, how your team currently works, and what you want the new system to handle..."
                aria-invalid={!!errors.projectDescription}
                {...register("projectDescription")}
              />
              <FieldDescription>
                Include any existing platforms, APIs, or manual workflows you
                want to connect or replace.
              </FieldDescription>
              <FieldError errors={[errors.projectDescription]} />
            </Field>
          </FieldGroup>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs tracking-wider text-[#6b7c93] uppercase">
              Operated by Sozo Tech Enterprise LLC.
            </p>
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
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
