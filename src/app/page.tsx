"use client";

import { GameState } from "@/utils/types";
import { useGameStore } from "@/store/gameStore";
import Lobby from "@/components/Lobby";
import GameResults from "@/components/GameResults";
import Game from "@/components/Game";

export default function Home() {
  const gameState = useGameStore((state) => state.gameState);

  const gameStateMap = {
    [GameState.Lobby]: <Lobby></Lobby>,
    [GameState.Game]: <Game></Game>,
    [GameState.Results]: <GameResults></GameResults>,
  };

  return gameStateMap[gameState];
}
