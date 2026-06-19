import type { ButtonHTMLAttributes, ReactNode } from "react";
import { buttonStyles } from "./Button.styles";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  readonly icon?: ReactNode;
  readonly variant?: "primary" | "secondary";
};

export function Button({
  children,
  className = "",
  icon,
  variant = "primary",
  ...props
}: ButtonProps) {
  const variantClass =
    variant === "primary" ? buttonStyles.primary : buttonStyles.secondary;

  return (
    <button
      className={`${buttonStyles.base} ${variantClass} ${className}`.trim()}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
}
