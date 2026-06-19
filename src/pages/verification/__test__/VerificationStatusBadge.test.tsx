import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { VerificationStatusBadge } from "../components/VerificationStatusBadge";
import { VerificationStatus } from "../model/verification-status";

describe("VerificationStatusBadge", () => {
  it("renders the correct label for a status", () => {
    render(<VerificationStatusBadge status={VerificationStatus.Pending} />);
    expect(screen.getByText(/Pendiente/i)).toBeDefined();
  });
});
