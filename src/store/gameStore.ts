import { create } from "zustand";
import { GameState, GameStore, GuessState, TurnCycleState } from "@/utils/types";
import { getRandomPrompt } from "@/utils/get-random-prompt";
import { devtools } from "zustand/middleware";

export const initialState = {
  response: "",
  guessState: GuessState.Pending,
  gameState: GameState.Lobby,
  turnCycleState: TurnCycleState.Drawing,
  currentDrawingPrompt: "",
  roundNumber: 1,
  correctGuesses: 0,
  errorMessage: "",
  isEraseMode: false,
};

export const useGameStore = create<GameStore>()(
  devtools((set) => ({
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

    setErrorMessage: (newErrorMessage) => {
      set({ errorMessage: newErrorMessage });
    },

    setEraseMode(newEraseMode) {
      set({ isEraseMode: newEraseMode });
    },
  }))
);
