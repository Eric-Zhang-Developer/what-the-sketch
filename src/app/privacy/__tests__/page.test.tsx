import { describe, expect, it, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import PrivacyPage from "../page";

afterEach(() => {
  cleanup();
});

describe("Privacy Policy Page", () => {
  it("renders the title and last updated date", () => {
    render(<PrivacyPage />);

    expect(screen.getByRole("heading", { level: 1, name: "Privacy Policy" })).toBeInTheDocument();
    expect(screen.getByText(/Last updated:/)).toBeInTheDocument();
  });

  it("renders the key tailored sections", () => {
    render(<PrivacyPage />);

    expect(screen.getByRole("heading", { name: "Information we collect" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Services we share data with" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Data retention" })).toBeInTheDocument();
  });

  it("names the third-party services we share data with", () => {
    render(<PrivacyPage />);

    expect(screen.getByText("OpenRouter")).toBeInTheDocument();
    expect(screen.getByText("Google (Gemini)")).toBeInTheDocument();
    expect(screen.getByText("Supabase")).toBeInTheDocument();
    expect(screen.getByText("Vercel")).toBeInTheDocument();
  });

  it("provides a back-to-game link pointing at the home route", () => {
    render(<PrivacyPage />);

    const backLink = screen.getByRole("link", { name: /Back to game/ });
    expect(backLink).toHaveAttribute("href", "/");
  });
});
