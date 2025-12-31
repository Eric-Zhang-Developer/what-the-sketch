import { useGameStore } from "@/store/gameStore";
import { useRef, useEffect } from "react";
import { SketchpadRef, TurnCycleState } from "@/utils/types";
import TurnResultSection from "@/components/TurnResultSection";
import Sketchpad from "@/components/Sketchpad";
import TurnErrorSection from "./TurnErrorSection";
import TurnLoadingSection from "./TurnLoadingSection";

export default function Game() {
  const turnCycleState = useGameStore((state) => state.turnCycleState);
  const currentDrawingPrompt = useGameStore((state) => state.currentDrawingPrompt);
  const sketchpadRef = useRef<SketchpadRef>(null);
  const bottomPageRef = useRef<HTMLDivElement>(null);
  const handleNextPrompt = useGameStore((state) => state.handleNextPrompt);

  // the image url processing happens entirely in Sketchpad. For now it is discarded after being given to the API. For future reference could save it.
  const onNextPromptClick = () => {
    if (sketchpadRef.current) {
      sketchpadRef.current.clearCanvas();
    }
    handleNextPrompt();
  };

  /**
   * Automatically scrolls the view to the results section when the turn transitions out of the drawing phase.
   */
  useEffect(() => {
    if (bottomPageRef.current && turnCycleState !== TurnCycleState.Drawing) {
      bottomPageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [turnCycleState]);

  const turnCycleMap = {
    [TurnCycleState.Drawing]: <div></div>,
    [TurnCycleState.ShowingResult]: (
      <TurnResultSection onNextPromptClick={onNextPromptClick}></TurnResultSection>
    ),
    [TurnCycleState.Loading]: <TurnLoadingSection></TurnLoadingSection>,
    [TurnCycleState.Error]: <TurnErrorSection></TurnErrorSection>,
  };
  return (
    <>
      <div className="flex items-center justify-center flex-col gap-5 container mx-auto py-5 px-4">
        <h1 className="text-6xl" aria-label="prompt">
          Draw a {currentDrawingPrompt}
        </h1>
        <Sketchpad ref={sketchpadRef}></Sketchpad>

        {/* Results Section, div wrapper is to give a ref to the auto scroll  */}
        <div className="flex items-center justify-center flex-col gap-5" ref={bottomPageRef}>
          {turnCycleMap[turnCycleState]}
        </div>
      </div>
    </>
  );
}
