import { useGameStore } from "@/store/gameStore";
import { GameState } from "@/utils/types";
import Image from "next/image";
import Button from "./Button";
export default function Lobby() {
  const setGameState = useGameStore((state) => state.setGameState);

  const handleClick = () => {
    setGameState(GameState.Game);
  };

  return (
    <main className="container mx-auto flex flex-col items-center gap-10 justify-center pt-20">
      <Image
        src="/banner.webp"
        alt="What the Sketch? Banner"
        width={900}
        height={314}
        className="w-full max-w-3xl h-auto"
        priority
      ></Image>
      <Button onClick={handleClick}>Start Game!</Button>
    </main>
  );
}
