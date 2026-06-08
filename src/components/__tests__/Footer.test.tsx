import { describe, expect, it, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import Footer from "../Footer";

afterEach(() => {
  cleanup();
});

describe("Footer", () => {
  it("renders a link to the privacy policy", () => {
    render(<Footer />);

    const privacyLink = screen.getByRole("link", { name: "Privacy Policy" });
    expect(privacyLink).toHaveAttribute("href", "/privacy");
  });

  it("renders a link to the terms of service", () => {
    render(<Footer />);

    const termsLink = screen.getByRole("link", { name: "Terms of Service" });
    expect(termsLink).toHaveAttribute("href", "/terms");
  });
});
