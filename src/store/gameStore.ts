import { create } from "zustand";
import { GameState, GameStore, GuessState, PromptCategory, TurnCycleState } from "@/utils/types";
import { getRandomPrompt } from "@/utils/get-random-prompt";
import { devtools } from "zustand/middleware";

export const initialState = {
  response: "",
  guessState: GuessState.Pending,
  gameState: GameState.Lobby,
  turnCycleState: TurnCycleState.Drawing,
  promptCategory: PromptCategory.Default,
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
      set((state) => ({
        currentDrawingPrompt: getRandomPrompt(state.promptCategory),
        guessState: GuessState.Pending,
        turnCycleState: TurnCycleState.Drawing,
        response: "",
        roundNumber: state.roundNumber + 1,
      }));
      if (useGameStore.getState().roundNumber > 5) {
        set({ gameState: GameState.Results });
      }
    },

    startGame: () => {
      set((state) => ({
        currentDrawingPrompt: getRandomPrompt(state.promptCategory),
        gameState: GameState.Game,
        turnCycleState: TurnCycleState.Drawing,
        guessState: GuessState.Pending,
        roundNumber: 1,
        correctGuesses: 0,
        response: "",
        errorMessage: "",
      }));
    },

    setErrorMessage: (newErrorMessage) => {
      set({ errorMessage: newErrorMessage });
    },

    setEraseMode(newEraseMode) {
      set({ isEraseMode: newEraseMode });
    },

    setPromptCategory(newPromptCategory) {
      set({ promptCategory: newPromptCategory });
    },
  }))
);
