import { describe, expect, it } from "vitest";
import Home from "../page";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/vitest";

describe("Lobby Tests", () => {
  it("should load the lobby on initial page load", () => {
    render(<Home></Home>);

    const title = screen.getByText("AI Pictionary");
    const startGameButton = screen.getByText("Start Game!");

    expect(title).toBeInTheDocument();
    expect(startGameButton).toBeInTheDocument();
  });
});
