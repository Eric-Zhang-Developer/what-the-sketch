import { describe, expect, it, afterEach } from "vitest";
import Home from "../page";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/vitest";
afterEach(() => cleanup());

describe("Lobby Tests", () => {
  it("should load the lobby on initial page load", () => {
    render(<Home></Home>);

    const title = screen.getByText("AI Pictionary");
    const startGameButton = screen.getByText("Start Game!");

    expect(title).toBeInTheDocument();
    expect(startGameButton).toBeInTheDocument();
  });

  it("should not show the title and start button after the use presses start game", async () => {
    render(<Home></Home>);
    const user = userEvent.setup();

    const title = screen.getByText("AI Pictionary");
    const startGameButton = screen.getByText("Start Game!");
    await user.click(startGameButton);

    expect(title).not.toBeInTheDocument();
    expect(startGameButton).not.toBeInTheDocument();
  });
});
