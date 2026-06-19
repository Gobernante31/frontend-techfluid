import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Button } from "../Button";

describe("Button", () => {
  it("renders children and role button", () => {
    render(<Button>Click</Button>);
    expect(screen.getByRole("button", { name: /click/i })).toBeDefined();
  });
});
