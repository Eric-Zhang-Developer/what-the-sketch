"use client";
import Sketchpad from "@/components/Sketchpad";
import TurnResultSection from "@/components/TurnResultSection";
import { SketchpadRef, TurnCycleState, GameState } from "@/utils/types";
import { useEffect, useRef } from "react";
import { getRandomPrompt } from "@/utils/get-random-prompt";
import Lobby from "@/components/Lobby";
import GameResults from "@/components/GameResults";
import { useGameStore } from "@/store/gameStore";

export default function Home() {
  const gameState = useGameStore((state) => state.gameState);
  const turnCycleState = useGameStore((state) => state.turnCycleState);
  const currentDrawingPrompt = useGameStore((state) => state.currentDrawingPrompt);
  const setCurrentDrawingPrompt = useGameStore((state) => state.setCurrentDrawingPrompt);
  const sketchpadRef = useRef<SketchpadRef>(null);
  const handleNextPrompt = useGameStore((state) => state.handleNextPrompt);

  // the image url processing happens entirely in Sketchpad. For now it is discarded after being given to the API. For future reference could save it.

  // Gets random prompt on page load
  useEffect(() => {
    setCurrentDrawingPrompt(getRandomPrompt());
  }, [setCurrentDrawingPrompt]);

  const onNextPromptClick = () => {
    if (sketchpadRef.current) {
      sketchpadRef.current.clearCanvas();
    }
    handleNextPrompt();
  };

  const turnCycleMap = {
    [TurnCycleState.Drawing]: <div></div>,
    [TurnCycleState.ShowingResult]: (
      <TurnResultSection onNextPromptClick={onNextPromptClick}></TurnResultSection>
    ),
    [TurnCycleState.Loading]: <div>Loading...</div>,
    [TurnCycleState.Error]: <div>Error</div>,
  };

  const gameStateMap = {
    [GameState.Lobby]: <Lobby></Lobby>,
    // TODO: Refactor Core Game into its own Component
    [GameState.Game]: (
      <div className="flex items-center justify-center flex-col gap-4 container mx-auto py-10">
        <h1 className="text-5xl" aria-label="prompt">
          Draw a {currentDrawingPrompt}
        </h1>
        <Sketchpad ref={sketchpadRef}></Sketchpad>

        {/* Results Section  */}
        {/* TODO: Qol improvement would be auto scrolling to the results section */}
        {turnCycleMap[turnCycleState]}
      </div>
    ),
    [GameState.Results]: <GameResults></GameResults>,
  };

  return gameStateMap[gameState];
}
