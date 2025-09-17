import { useGameStore } from "@/store/gameStore";
import { GameState } from "@/utils/types";

export default function GameResults() {
  const setGameState = useGameStore((state) => state.setGameState);
  const setRoundNumber = useGameStore((state) => state.setRoundNumber);
  const correctGuesses = useGameStore((state) => state.correctGuesses);
  const setCorrectGuesses = useGameStore((state) => state.setCorrectGuesses);

  const handlePlayAgain = () => {
    setGameState(GameState.Lobby);
    setRoundNumber(1);
    setCorrectGuesses(0);
  };

  console.log(`Correct Guesses: ${correctGuesses}`);
  return (
    <main className="container mx-auto flex flex-col items-center gap-10 justify-center pt-40">
      <h1 className="text-5xl">Results</h1>
      <h2 className="text-4xl">You got {correctGuesses} out of 5 prompts right!</h2>
      <button
        onClick={handlePlayAgain}
        className="bg-blue-400 text-white px-10 py-3 rounded-xl text-2xl shadow-lg hover:cursor-pointer transition hover:scale-110"
      >
        Play Again
      </button>
    </main>
  );
}
