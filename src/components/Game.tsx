import { useGameStore } from "@/store/gameStore";
import { useRef } from "react";
import TurnResultSection from "@/components/TurnResultSection";
import Sketchpad from "@/components/Sketchpad";
import { SketchpadRef, TurnCycleState } from "@/utils/types";

export default function Game() {
  const turnCycleState = useGameStore((state) => state.turnCycleState);
  const currentDrawingPrompt = useGameStore((state) => state.currentDrawingPrompt);
  const sketchpadRef = useRef<SketchpadRef>(null);
  const handleNextPrompt = useGameStore((state) => state.handleNextPrompt);

  // the image url processing happens entirely in Sketchpad. For now it is discarded after being given to the API. For future reference could save it.
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
  return (
    <>
      <div className="flex items-center justify-center flex-col gap-4 container mx-auto py-10">
        <h1 className="text-5xl" aria-label="prompt">
          Draw a {currentDrawingPrompt}
        </h1>
        <Sketchpad ref={sketchpadRef}></Sketchpad>

        {/* Results Section  */}
        {/* TODO: Qol improvement would be auto scrolling to the results section */}
        {turnCycleMap[turnCycleState]}
      </div>
    </>
  );
}
