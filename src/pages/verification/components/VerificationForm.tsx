import { RefreshCw, Send } from "lucide-react";
import type { FormEvent } from "react";
import { Button } from "../../../shared/components/Button";
import { ImageDropzone } from "../../../shared/components/ImageDropzone";
import { InlineAlert } from "../../../shared/components/InlineAlert";
import { TextField } from "../../../shared/components/TextField";
import type { VerificationFormState } from "../model/verification-form-state";
import { verificationFormStyles } from "../styles/VerificationForm.styles";

type VerificationFormProps = {
  readonly errorMessage: string;
  readonly form: VerificationFormState;
  readonly isSubmitting: boolean;
  readonly successMessage: string;
  readonly errors?: {
    name?: string;
    email?: string;
    documentNumber?: string;
    selfieImage?: string;
    documentImage?: string;
  };
  readonly onChange: (form: VerificationFormState) => void;
  readonly onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  readonly onFieldBlur?: (field: string) => void;
};

export function VerificationForm(props: VerificationFormProps) {
  return (
    <form className={verificationFormStyles.form} onSubmit={props.onSubmit}>
      <div className={verificationFormStyles.fields}>
        <TextField
          autoComplete="name"
          id="name"
          label="Nombre"
          minLength={2}
          onChange={(event) =>
            props.onChange({ ...props.form, name: event.target.value })
          }
          onBlur={() => props.onFieldBlur?.("name")}
          error={props.errors?.name}
          placeholder="Nombre completo"
          required
          value={props.form.name}
        />
        <TextField
          autoComplete="email"
          id="email"
          label="Email"
          onChange={(event) =>
            props.onChange({ ...props.form, email: event.target.value })
          }
          onBlur={() => props.onFieldBlur?.("email")}
          error={props.errors?.email}
          placeholder="Correo electronico"
          required
          type="email"
          value={props.form.email}
        />
        <TextField
          autoComplete="off"
          id="documentNumber"
          label="Numero documento"
          minLength={3}
          onChange={(event) =>
            props.onChange({
              ...props.form,
              documentNumber: event.target.value,
            })
          }
          onBlur={() => props.onFieldBlur?.("documentNumber")}
          error={props.errors?.documentNumber}
          placeholder="Documento de identidad"
          required
          value={props.form.documentNumber}
        />
      </div>

      <div className={verificationFormStyles.uploads}>
        <ImageDropzone
          label="Foto selfie"
          onChange={(value) => {
            props.onChange({ ...props.form, selfieImage: value });
            props.onFieldBlur?.("selfieImage");
          }}
          value={props.form.selfieImage}
          error={props.errors?.selfieImage}
        />
        <ImageDropzone
          label="Foto documento"
          onChange={(value) => {
            props.onChange({ ...props.form, documentImage: value });
            props.onFieldBlur?.("documentImage");
          }}
          value={props.form.documentImage}
          error={props.errors?.documentImage}
        />
      </div>

      <div className={verificationFormStyles.alerts}>
        {props.errorMessage ? (
          <InlineAlert message={props.errorMessage} tone="error" />
        ) : null}
        {props.successMessage ? (
          <InlineAlert message={props.successMessage} tone="success" />
        ) : null}
      </div>

      <div className={verificationFormStyles.actions}>
        <Button
          disabled={
            props.isSubmitting ||
            !!(props.errors && Object.values(props.errors).some((v) => !!v))
          }
          icon={
            props.isSubmitting ? (
              <RefreshCw className={verificationFormStyles.spinner} size={18} />
            ) : (
              <Send size={18} />
            )
          }
          type="submit"
        >
          Enviar validaci&oacute;n
        </Button>
      </div>
    </form>
  );
}
