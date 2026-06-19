import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { TextField } from "../TextField";

describe("TextField", () => {
  it("renders label and input", () => {
    render(<TextField id="t" label="Label" />);
    expect(screen.getByLabelText(/Label/i)).toBeDefined();
  });
});
