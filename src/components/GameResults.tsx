import { useGameStore } from "@/store/gameStore";
import { GameState } from "@/utils/types";
import Button from "./Button";
export default function GameResults() {
  const setGameState = useGameStore((state) => state.setGameState);
  const setRoundNumber = useGameStore((state) => state.setRoundNumber);
  const correctGuesses = useGameStore((state) => state.correctGuesses);
  const setCorrectGuesses = useGameStore((state) => state.setCorrectGuesses);

  // TODO: Could move this to game store
  const handlePlayAgain = () => {
    setGameState(GameState.Lobby);
    setRoundNumber(1);
    setCorrectGuesses(0);
  };

  return (
    <main className="container mx-auto flex flex-col items-center gap-10 justify-center pt-40 px-6">
      <h1 className="text-6xl text-center">You got {correctGuesses} out of 5 prompts right!</h1>
      <Button onClick={handlePlayAgain} className="text-3xl">
        Play Again
      </Button>
    </main>
  );
}
