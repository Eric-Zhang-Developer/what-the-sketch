export interface SketchpadRef {
  clearCanvas: () => void;
}

export enum GuessState {
  Pending = "PENDING",
  Correct = "CORRECT",
  Incorrect = "INCORRECT",
}

// idk if it is honestly necessary to have another enum for turn cycle.
// Possible refactor to combine guess state and turn cycle?
export enum TurnCycleState {
  Drawing = "DRAWING",
  Loading = "LOADING",
  ShowingResult = "SHOWINGRESULT",
  Error = "ERROR",
}

export enum GameState {
  Lobby = "LOBBY",
  Game = "GAME",
  Results = "RESULTS",
}

export interface TurnResultProps {
  onNextPromptClick: () => void;
}

export interface LobbyProps {
  setGameState: (gameState: GameState) => void;
}

export interface GameStore {
  response: string;
  setResponse: (newResponse: string) => void;

  guessState: GuessState;
  setGuessState: (newGuessState: GuessState) => void;

  gameState: GameState;
  setGameState: (newGameState: GameState) => void;

  turnCycleState: TurnCycleState;
  setTurnCycleState: (newTurnCycleState: TurnCycleState) => void;

  currentDrawingPrompt: string;
  setCurrentDrawingPrompt: (newCurrentDrawingPrompt: string) => void;

  roundNumber: number;
  setRoundNumber: (newRoundNumber: number) => void;

  correctGuesses: number;
  incrementCorrectGuesses: () => void;
  setCorrectGuesses: (newCorrectGuesses: number) => void;

  handleNextPrompt: () => void;
  startGame: () => void;

  errorMessage: string;
  setErrorMessage: (newErrorMessage: string) => void;

  isEraseMode: boolean;
  setEraseMode: (newIsEraseMode: boolean) => void;

  promptCategory: PromptCategory;
  setPromptCategory: (newPromptCategory: PromptCategory) => void;

  aiPersonality: AIPersonality;
  setAiPersonality: (newAIPersonality: AIPersonality) => void;
}

export const PROMPT_CATEGORIES = [
  "Default",
  "Objects",
  "Animals",
  "Nature",
  "Food",
  "Geography",
] as const;

export type PromptCategory = (typeof PROMPT_CATEGORIES)[number];

export const AI_PERSONALITIES = ["Default", "Caveman", "Haiku Poet"] as const;
export type AIPersonality = (typeof AI_PERSONALITIES)[number];

export interface RateLimitResult {
  limited: boolean;
  error?: string;
}

export type ApiResult =
  | { success: true; data: { response: string } }
  | { success: false; error: string };
