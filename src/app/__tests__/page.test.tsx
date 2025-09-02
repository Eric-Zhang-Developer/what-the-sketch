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

describe("Core Game Tests", () => {
  it("should load all the game components when the game starts", async () => {
    render(<Home></Home>);
    const user = userEvent.setup();
    const startGameButton = screen.getByText("Start Game!");

    await user.click(startGameButton);

    const prompt = await screen.findByLabelText("prompt");
    const submitButton = await screen.findByText("Submit Drawing");
    const clearCanvasButton = await screen.findByLabelText("clear canvas");

    // Idk how robust this specific find is because it finds the div that the core canvas is wrapped in.
    const canvas = await screen.findByRole("game");

    expect(prompt).toBeInTheDocument();
    expect(canvas).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
    expect(clearCanvasButton).toBeInTheDocument();
  });
});
