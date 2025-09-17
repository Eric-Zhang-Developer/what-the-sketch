import { create } from "zustand";
import { GameStore } from "@/utils/types";

export const useGameScore = create<GameStore>((set) => ({
  response: "",
  setResponse: (newResponse) => {
    set({ response: newResponse });
  },
}));
