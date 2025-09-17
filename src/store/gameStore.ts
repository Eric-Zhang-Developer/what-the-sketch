import { create } from "zustand";
import { GameState, GameStore, GuessState, TurnCycleState } from "@/utils/types";
import { getRandomPrompt } from "@/utils/get-random-prompt";

export const initialState = {
  response: "",
  guessState: GuessState.Pending,
  gameState: GameState.Lobby,
  turnCycleState: TurnCycleState.Drawing,
  currentDrawingPrompt: "",
  roundNumber: 1,
  correctGuesses: 0,
};

export const useGameStore = create<GameStore>((set) => ({
  ...initialState,

  setResponse: (newResponse) => {
    set({ response: newResponse });
  },

  setGuessState: (newGuessState) => {
    set({ guessState: newGuessState });
  },

  setGameState: (newGameState) => {
    set({ gameState: newGameState });
  },

  setTurnCycleState: (newTurnCycleState) => {
    set({ turnCycleState: newTurnCycleState });
  },

  setCurrentDrawingPrompt: (newCurrentDrawingPrompt) => {
    set({ currentDrawingPrompt: newCurrentDrawingPrompt });
  },

  incrementCorrectGuesses: () => {
    set((state) => ({ correctGuesses: state.correctGuesses + 1 }));
  },

  setCorrectGuesses: (newCorrectGuesses) => {
    set({ correctGuesses: newCorrectGuesses });
  },

  setRoundNumber: (newRoundNumber) => {
    set({ roundNumber: newRoundNumber });
  },

  handleNextPrompt: () => {
    set({ currentDrawingPrompt: getRandomPrompt() });
    set({ guessState: GuessState.Pending });
    set({ turnCycleState: TurnCycleState.Drawing });
    set({ response: "" });
    set((state) => ({ roundNumber: state.roundNumber + 1 }));

    // End Game Logic
    if (useGameStore.getState().roundNumber > 5) {
      set({ gameState: GameState.Results });
    }
  },
}));
