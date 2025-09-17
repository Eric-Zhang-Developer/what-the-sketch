import { useGameStore } from "@/store/gameStore";
import { GameState } from "@/utils/types";

export default function Lobby() {
  const setGameState = useGameStore((state) => state.setGameState);

  const handleClick = () => {
    setGameState(GameState.Game);
  };

  return (
    <main className="container mx-auto flex flex-col items-center gap-10 justify-center pt-40">
      <h1 className="text-5xl">AI Pictionary</h1>
      <button
        onClick={handleClick}
        className="bg-blue-400 text-white px-10 py-3 rounded-xl text-2xl shadow-lg hover:cursor-pointer transition hover:scale-110"
      >
        Start Game!
      </button>
    </main>
  );
}
