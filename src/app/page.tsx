"use client";

import { GameState } from "@/utils/types";
import { useEffect } from "react";
import { getRandomPrompt } from "@/utils/get-random-prompt";
import { useGameStore } from "@/store/gameStore";
import Lobby from "@/components/Lobby";
import GameResults from "@/components/GameResults";
import Game from "@/components/Game";

export default function Home() {
  const gameState = useGameStore((state) => state.gameState);
  const setCurrentDrawingPrompt = useGameStore((state) => state.setCurrentDrawingPrompt);

  // Gets random prompt on page load
  useEffect(() => {
    setCurrentDrawingPrompt(getRandomPrompt());
  }, [setCurrentDrawingPrompt]);

  const gameStateMap = {
    [GameState.Lobby]: <Lobby></Lobby>,
    [GameState.Game]: <Game></Game>,
    [GameState.Results]: <GameResults></GameResults>,
  };

  return gameStateMap[gameState];
}
