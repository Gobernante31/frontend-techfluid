import { z } from "zod";
import type { VerificationFormState } from "./verification-form-state";

export const verificationSchema = z.object({
  name: z.string().min(2, "Ingrese un nombre válido (mínimo 2 caracteres)."),
  email: z.string().email("Ingrese un correo electrónico válido."),
  documentNumber: z.string().min(3, "Ingrese un número de documento válido."),
  selfieImage: z.string().min(1, "Sube una foto selfie."),
  documentImage: z.string().min(1, "Sube una foto del documento."),
});

export function validateWithSchema(form: VerificationFormState) {
  const result = verificationSchema.safeParse(form);
  if (result.success) return {} as Record<string, string>;

  const errors: Record<string, string> = {};
  for (const issue of result.error.issues) {
    const key = issue.path[0];
    if (typeof key === "string") {
      errors[key] = issue.message;
    }
  }
  return errors;
}
