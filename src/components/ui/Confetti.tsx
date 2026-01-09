import ReactConfetti from "react-confetti";
import { useState, useEffect } from "react";
import { useGameStore } from "@/store/gameStore";
import { GuessState } from "@/utils/types";

export default function Confetti() {
  const guessState = useGameStore((state) => state.guessState);
  const [pageHeight, setPageHeight] = useState(window.innerHeight);

  // Custom hook that sets height to the proper height of the entire page before display

  useEffect(() => {
    if (guessState === GuessState.Correct) {
      const timer = setTimeout(() => {
        setPageHeight(document.documentElement.scrollHeight);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [guessState]);
  return (
    <>
      <ReactConfetti height={pageHeight} recycle={false} numberOfPieces={400}></ReactConfetti>
    </>
  );
}
