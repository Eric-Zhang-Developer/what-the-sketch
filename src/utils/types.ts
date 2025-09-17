export interface SketchpadProps {
  setResponse: (response: string) => void;
  setGuessState: (guess: GuessState) => void;
  currentDrawingPrompt: string;
  setTurnCycleState: (turnCycle: TurnCycleState) => void;
  setCorrectGuesses: (correctGuesses: number) => void;
  correctGuesses: number;
}

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

export interface GameResultsProps {
  setGameState: (gameState: GameState) => void;
  setRoundNumber: (roundNumber: number) => void;
  correctGuesses: number;
  setCorrectGuesses: (correctGuesses: number) => void;
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
  incrementRoundNumber: () => void;
  setRoundNumber: (newRoundNumber: number) => void;

  correctGuesses: number;
  incrementCorrectGuesses: () => void;
  setCorrectGuesses: (newCorrectGuesses: number) => void;

  handleNextPrompt: () => void;
}
