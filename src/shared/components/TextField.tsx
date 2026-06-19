import type { InputHTMLAttributes } from "react";
import { textFieldStyles } from "./TextField.styles";

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  readonly label: string;
  readonly error?: string | boolean;
};

export function TextField({ id, label, error, ...props }: TextFieldProps) {
  const fieldClass = `${textFieldStyles.field} ${
    error ? textFieldStyles.fieldError : ""
  }`;

  return (
    <label className={textFieldStyles.label} htmlFor={id}>
      <span className={textFieldStyles.labelText}>{label}</span>
      <input id={id} className={fieldClass} {...props} />
      {typeof error === "string" && error ? (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      ) : null}
    </label>
  );
}
