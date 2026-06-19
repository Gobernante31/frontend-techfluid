import { inlineAlertStyles } from "./InlineAlert.styles";

type InlineAlertProps = {
  readonly message: string;
  readonly tone: "error" | "success";
};

export function InlineAlert({ message, tone }: InlineAlertProps) {
  const toneClass =
    tone === "error" ? inlineAlertStyles.error : inlineAlertStyles.success;

  return <p className={`${inlineAlertStyles.base} ${toneClass}`}>{message}</p>;
}
