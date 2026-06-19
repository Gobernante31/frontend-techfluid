import type { FormEvent } from "react";
import { useCallback, useEffect, useState } from "react";
import { initialVerificationForm } from "../model/initial-verification-form";
import type { Verification } from "../model/verification";
import type { VerificationFormState } from "../model/verification-form-state";
import { verificationApi } from "../services/verification-api";
import { validateWithSchema } from "../model/verification-schema";

const storedVerificationIdKey = "techfluid:last-verification-id";

export function useVerification() {
  const [errorMessage, setErrorMessage] = useState("");
  const [form, setForm] = useState<VerificationFormState>(
    initialVerificationForm,
  );
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [verification, setVerification] = useState<Verification>();
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    documentNumber?: string;
    selfieImage?: string;
    documentImage?: string;
  }>({});
  const [touched, setTouched] = useState<{
    name?: boolean;
    email?: boolean;
    documentNumber?: boolean;
    selfieImage?: boolean;
    documentImage?: boolean;
  }>({});
  const [submittedAttempted, setSubmittedAttempted] = useState(false);

  function validateFormValues(formToValidate: VerificationFormState) {
    return validateWithSchema(formToValidate) as typeof errors;
  }

  const refreshVerification = useCallback(async (id: string) => {
    setErrorMessage("");
    setIsRefreshing(true);

    try {
      setVerification(await verificationApi.findById(id));
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "No se pudo consultar la solicitud.",
      );
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setErrors({});
    setSubmittedAttempted(true);
    setIsSubmitting(true);
    console.log("[useVerification] handleSubmit: inicio", { form });

    // Client-side validation (including images)
    const newErrors = validateFormValues(form);

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setErrorMessage("Hay campos inválidos en la solicitud.");
      // focus first invalid field for better UX
      try {
        const firstKey = Object.keys(newErrors)[0];
        const el = globalThis.document?.getElementById(firstKey);
        if (el && typeof (el as HTMLElement).focus === "function") {
          (el as HTMLElement).focus();
        }
      } catch (e) {
        // ignore focus errors in non-DOM environments
      }
      setIsSubmitting(false);
      return;
    }

    try {
      console.log(
        "[useVerification] handleSubmit: llamando a verificationApi.create",
      );
      const createdVerification = await verificationApi.create(form);
      console.log("[useVerification] handleSubmit: respuesta recibida", {
        createdVerification,
      });
      localStorage.setItem(storedVerificationIdKey, createdVerification.id);
      setVerification(createdVerification);
      setForm(initialVerificationForm);
      setSuccessMessage("Solicitud creada correctamente.");
    } catch (error) {
      console.error("[useVerification] handleSubmit: error", error);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "No se pudo crear la solicitud.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  async function refreshCurrentVerification() {
    if (!verification) return;
    await refreshVerification(verification.id);
  }

  // real-time validation on form changes
  useEffect(() => {
    const v = validateFormValues(form);
    setErrors(v);
  }, [form]);

  // Visible errors: only show errors for touched fields or after submit attempt
  const visibleErrors = Object.keys(errors).reduce(
    (acc, key) => {
      const k = key as keyof typeof errors;
      if ((touched as any)[k] || submittedAttempted) {
        (acc as any)[k] = (errors as any)[k];
      }
      return acc;
    },
    {} as typeof errors,
  );

  function onFieldBlur(field: keyof typeof touched) {
    setTouched((prev) => ({ ...prev, [field]: true }));
  }

  useEffect(() => {
    const storedId = localStorage.getItem(storedVerificationIdKey);
    if (storedId) {
      globalThis.setTimeout(() => {
        void refreshVerification(storedId);
      }, 0);
    }
  }, [refreshVerification]);

  return {
    errorMessage,
    form,
    errors: visibleErrors,
    isRefreshing,
    isSubmitting,
    successMessage,
    verification,
    handleSubmit,
    refreshCurrentVerification,
    setForm,
    onFieldBlur,
  };
}
