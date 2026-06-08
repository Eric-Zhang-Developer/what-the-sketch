import { describe, expect, it, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import TermsPage from "../page";

afterEach(() => {
  cleanup();
});

describe("Terms of Service Page", () => {
  it("renders the title and last updated date", () => {
    render(<TermsPage />);

    expect(screen.getByRole("heading", { level: 1, name: "Terms of Service" })).toBeInTheDocument();
    expect(screen.getByText(/Last updated:/)).toBeInTheDocument();
  });

  it("renders the key tailored sections", () => {
    render(<TermsPage />);

    expect(screen.getByRole("heading", { name: "Acceptable use" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "AI guesses" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "No warranties, no liability" })).toBeInTheDocument();
  });

  it("links to the privacy policy", () => {
    render(<TermsPage />);

    const privacyLink = screen.getByRole("link", { name: "Privacy Policy" });
    expect(privacyLink).toHaveAttribute("href", "/privacy");
  });

  it("provides a back-to-game link pointing at the home route", () => {
    render(<TermsPage />);

    const backLink = screen.getByRole("link", { name: /Back to game/ });
    expect(backLink).toHaveAttribute("href", "/");
  });
});
