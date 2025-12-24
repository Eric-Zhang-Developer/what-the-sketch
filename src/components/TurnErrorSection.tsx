import { useGameStore } from "@/store/gameStore";
import Button from "./Button";
import { TurnCycleState } from "@/utils/types";
import { TriangleAlert } from "lucide-react";
export default function TurnErrorSection() {
  const errorMessage = useGameStore((state) => state.errorMessage);
  const setTurnCycleState = useGameStore((state) => state.setTurnCycleState);

  const handleTryAgain = () => {
    setTurnCycleState(TurnCycleState.Drawing);
  };
  return (
    <section
      className="flex flex-col justify-center items-center border-4 p-8 rounded-2xl text-center bg-white border-red-500 gap-4 "
      style={{
        boxShadow: `4px 6px 0px 0px rgba(239, 68, 68, 1)`,
      }}
      data-testid="turn-error-section"
    >
      <TriangleAlert size={48}></TriangleAlert>
      <span className="text-2xl">Whoops!</span>
      <p className="text-xl">{errorMessage}</p>
      <Button onClick={handleTryAgain}>Try Again</Button>
    </section>
  );
}
