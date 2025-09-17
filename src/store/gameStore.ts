import { create } from "zustand";
import { GameState, GameStore, GuessState, TurnCycleState } from "@/utils/types";

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

  setRoundNumber: (newRoundNumber) => {
    set({ roundNumber: newRoundNumber });
  },

  setCorrectGuesses: (newCorrectGuesses) => {
    set({ correctGuesses: newCorrectGuesses });
  },
}));
