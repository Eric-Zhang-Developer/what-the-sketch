import { describe, expect, it, afterEach, vi } from "vitest";
import Home from "../page";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/vitest";
import { initialState, useGameStore } from "@/store/gameStore";
import { GameState } from "@/utils/types";

afterEach(() => {
  cleanup();
  useGameStore.setState(initialState);
});

// This catches all fetches and returns the hard coded response with a success and cat!
vi.spyOn(globalThis, "fetch").mockImplementation(() => {
  // console.log(`[MOCKING] Fetch called with URL: ${url}`);
  const mockApiResponse = {
    response: `This image is a **simple, hand-drawn illustration on a white background.** It features: * A **cartoon cat's head** drawn in black outline. 
  The cat has two pointy ears, two vertical lines for eyes, and a "W" shape for its mouth. * To the right of the cat, the word **"Meow!"** is written 
  in a casual, handwritten style.`,
  };
  return Promise.resolve(new Response(JSON.stringify(mockApiResponse), { status: 200 }));
});

// --- Mock Setup react-sketch-canvas ---
// react-sketch-canvas acts extremely wonky in the test environment, this is the reason for the mock
const mockCanvasControls = {
  exportImage: vi.fn().mockResolvedValue("data:image/png;base64,MOCK"),
  clearCanvas: vi.fn(),
};

vi.mock("react-sketch-canvas", async () => {
  const React = await import("react");
  const ReactSketchCanvas = React.forwardRef(function MockReactSketchCanvas(props: never, ref) {
    React.useImperativeHandle(ref, () => mockCanvasControls);
    return <div data-testid="mock-react-sketch-canvas">Mock Canvas</div>;
  });

  ReactSketchCanvas.displayName = "ReactSketchCanvas";
  return { ReactSketchCanvas };
});

// --- Tests ---

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

  it("should display the turn result after submitting a drawing", async () => {
    render(<Home></Home>);
    const user = userEvent.setup();
    const startGameButton = screen.getByText("Start Game!");

    await user.click(startGameButton);
    const submitButton = await screen.findByText("Submit Drawing");

    await user.click(submitButton);

    const resultSection = await screen.findByTestId("turn-result-section");
    const nextPromptButton = await screen.findByText("Next Prompt");

    expect(resultSection).toBeInTheDocument();
    expect(nextPromptButton).toBeInTheDocument();
  });

  it("should not display the results section after the user clicks next prompt", async () => {
    render(<Home></Home>);
    const user = userEvent.setup();
    const startGameButton = screen.getByText("Start Game!");

    await user.click(startGameButton);
    const submitButton = await screen.findByText("Submit Drawing");

    await user.click(submitButton);
    const resultSection = await screen.findByTestId("turn-result-section");
    const nextPromptButton = await screen.findByText("Next Prompt");

    await user.click(nextPromptButton);

    expect(resultSection).not.toBeInTheDocument();
    expect(nextPromptButton).not.toBeInTheDocument();
  });

  // TODO: Maybe write a test to check if button disability works?
});

describe("Results Screen Tests", () => {
  it("should load the results screen after the last round", async () => {
    useGameStore.setState({
      roundNumber: 5,
      correctGuesses: 4,
      gameState: GameState.Game,
    });

    render(<Home></Home>);

    // Events to get to Results Screen
    const user = userEvent.setup();
    const submitButton = await screen.findByText("Submit Drawing");
    await user.click(submitButton);
    const nextPromptButton = await screen.findByText("Next Prompt");
    await user.click(nextPromptButton);

    const results = screen.getByText("Results");
    const correctGuesses = screen.getByText("You got 4 out of 5 prompts right!");
    const playAgainButton = screen.getByText("Play Again");

    expect(results).toBeInTheDocument();
    expect(correctGuesses).toBeInTheDocument();
    expect(playAgainButton).toBeInTheDocument();
  });

  it(`should load the lobby again after the "Try Again" button is clicked`, async () => {
    useGameStore.setState({
      roundNumber: 5,
      correctGuesses: 4,
      gameState: GameState.Game,
    });
    render(<Home></Home>);

    // Events to get to Results Screen
    const user = userEvent.setup();
    const submitButton = await screen.findByText("Submit Drawing");
    await user.click(submitButton);
    const nextPromptButton = await screen.findByText("Next Prompt");
    await user.click(nextPromptButton);

    const playAgainButton = screen.getByText("Play Again");
    await user.click(playAgainButton);

    expect(playAgainButton).not.toBeInTheDocument();
    const title = screen.getByText("AI Pictionary");
    const startGameButton = screen.getByText("Start Game!");
    expect(title).toBeInTheDocument();
    expect(startGameButton).toBeInTheDocument();
  });
});
