"use client";
import Sketchpad from "@/components/Sketchpad";
import TurnResultSection from "@/components/TurnResultSection";
import { GuessState, SketchpadRef, TurnCycleState, GameState, HomeProps } from "@/utils/types";
import { useEffect, useState, useRef } from "react";
import { getRandomPrompt } from "@/utils/get-random-prompt";
import Lobby from "@/components/Lobby";
import GameResults from "@/components/GameResults";
import { useGameStore } from "@/store/gameStore";

export default function Home({ initialRoundNumber = 1, initialCorrectGuessNumber = 0 }: HomeProps) {
  const response = useGameStore((state) => state.response);
  const setResponse = useGameStore((state) => state.setResponse);
  const guessState = useGameStore((state) => state.guessState);
  const setGuessState = useGameStore((state) => state.setGuessState);
  const gameState = useGameStore((state) => state.gameState);
  const setGameState = useGameStore((state) => state.setGameState);
  const turnCycleState = useGameStore((state) => state.turnCycleState);
  const setTurnCycleState = useGameStore((state) => state.setTurnCycleState);
  const currentDrawingPrompt = useGameStore((state) => state.currentDrawingPrompt);
  const setCurrentDrawingPrompt = useGameStore((state) => state.setCurrentDrawingPrompt);
  const roundNumber = useGameStore((state) => state.roundNumber);
  const setRoundNumber = useGameStore((state) => state.setRoundNumber);
  const correctGuesses = useGameStore((state) => state.correctGuesses);
  const setCorrectGuesses = useGameStore((state) => state.setCorrectGuesses);

  const sketchpadRef = useRef<SketchpadRef>(null);

  // the image url processing happens entirely in Sketchpad. For now it is discarded after being given to the API. For future reference could save it.

  // Gets random prompt on page load
  useEffect(() => {
    setCurrentDrawingPrompt(getRandomPrompt());
  }, [setCurrentDrawingPrompt]);

  const handleNextPrompt = () => {
    setCurrentDrawingPrompt(getRandomPrompt());
    setGuessState(GuessState.Pending);
    setTurnCycleState(TurnCycleState.Drawing);
    setResponse("");
    if (sketchpadRef.current) {
      sketchpadRef.current.clearCanvas();
    }

    // Round Check
    const nextRound = roundNumber + 1;
    setRoundNumber(nextRound);
    if (nextRound > 5) {
      setGameState(GameState.Results);
    }
  };

  const turnCycleMap = {
    [TurnCycleState.Drawing]: <div></div>,
    [TurnCycleState.ShowingResult]: (
      <TurnResultSection
        response={response}
        guessState={guessState}
        handleNextPrompt={handleNextPrompt}
        setGameState={setGameState}
        roundNumber={roundNumber}
        setRoundNumber={setRoundNumber}
      ></TurnResultSection>
    ),
    [TurnCycleState.Loading]: <div>Loading...</div>,
    [TurnCycleState.Error]: <div>Error</div>,
  };

  const gameStateMap = {
    [GameState.Lobby]: <Lobby setGameState={setGameState}></Lobby>,
    // TODO: Refactor Core Game into its own Component
    [GameState.Game]: (
      <div className="flex items-center justify-center flex-col gap-4 container mx-auto py-10">
        <h1 className="text-5xl" aria-label="prompt">
          Draw a {currentDrawingPrompt}
        </h1>
        <Sketchpad
          ref={sketchpadRef}
          setResponse={setResponse}
          setGuessState={setGuessState}
          setTurnCycleState={setTurnCycleState}
          currentDrawingPrompt={currentDrawingPrompt}
          setCorrectGuesses={setCorrectGuesses}
          correctGuesses={correctGuesses}
        ></Sketchpad>

        {/* Results Section  */}
        {/* TODO: Qol improvement would be auto scrolling to the results section */}
        {turnCycleMap[turnCycleState]}
      </div>
    ),
    [GameState.Results]: (
      <GameResults
        setGameState={setGameState}
        setRoundNumber={setRoundNumber}
        correctGuesses={correctGuesses}
        setCorrectGuesses={setCorrectGuesses}
      ></GameResults>
    ),
  };

  return gameStateMap[gameState];
}
