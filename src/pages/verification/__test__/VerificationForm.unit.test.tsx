import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { VerificationForm } from "../components/VerificationForm";
import { initialVerificationForm } from "../model/initial-verification-form";

describe("VerificationForm", () => {
  it("renders fields and calls onSubmit", () => {
    const onSubmit = vi.fn((e) => e.preventDefault());
    const onChange = vi.fn();

    render(
      <VerificationForm
        errorMessage=""
        form={initialVerificationForm}
        isSubmitting={false}
        successMessage=""
        onChange={onChange}
        onSubmit={onSubmit}
      />,
    );

    // Ensure inputs are present
    expect(screen.getByLabelText(/Nombre/i)).toBeDefined();
    expect(screen.getByLabelText(/Email/i)).toBeDefined();
    expect(screen.getByLabelText(/Numero documento/i)).toBeDefined();

    const submitButton = screen.getByRole("button", {
      name: /Enviar validaci/i,
    });
    const form = submitButton.closest("form");
    expect(form).not.toBeNull();
    fireEvent.submit(form!);

    expect(onSubmit).toHaveBeenCalled();
  });
});
