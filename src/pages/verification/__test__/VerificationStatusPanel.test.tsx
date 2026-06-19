import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { VerificationStatusPanel } from "../components/VerificationStatusPanel";
import { VerificationStatus } from "../model/verification-status";

describe("VerificationStatusPanel", () => {
  it("shows empty state when no verification", () => {
    render(
      <VerificationStatusPanel isRefreshing={false} onRefresh={() => {}} />,
    );
    expect(screen.getByText(/Completa el formulario/i)).toBeDefined();
  });

  it("renders verification details and calls onRefresh", () => {
    const onRefresh = vi.fn();
    const verification = {
      id: "123",
      name: "User",
      email: "u@example.com",
      documentNumber: "DOC1",
      selfieImage: "s.png",
      documentImage: "d.png",
      status: VerificationStatus.Pending,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    render(
      <VerificationStatusPanel
        isRefreshing={false}
        verification={verification}
        onRefresh={onRefresh}
      />,
    );

    expect(screen.getByText(/Solicitud registrada/i)).toBeDefined();
    const button = screen.getByRole("button", { name: /Actualizar estado/i });
    fireEvent.click(button);
    expect(onRefresh).toHaveBeenCalled();
  });
});
