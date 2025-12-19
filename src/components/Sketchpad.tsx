import { useRef, forwardRef, useImperativeHandle, type Ref } from "react";
import { ReactSketchCanvas, ReactSketchCanvasRef } from "react-sketch-canvas";
import { GuessState, SketchpadRef, TurnCycleState, ApiResult } from "@/utils/types";
import { checkGuess } from "@/utils/check-guess";
import { Trash2 } from "lucide-react";
import { useGameStore } from "@/store/gameStore";
import Button from "./Button";
import GeminiAPICall from "@/utils/gemini-api-call";

function Sketchpad(_: unknown, ref: Ref<SketchpadRef>) {
  const canvasRef = useRef<ReactSketchCanvasRef>(null);
  const setTurnCycleState = useGameStore((state) => state.setTurnCycleState);
  const turnCycleState = useGameStore((state) => state.turnCycleState);
  const setResponse = useGameStore((state) => state.setResponse);
  const currentDrawingPrompt = useGameStore((state) => state.currentDrawingPrompt);
  const setGuessState = useGameStore((state) => state.setGuessState);
  const incrementCorrectGuesses = useGameStore((state) => state.incrementCorrectGuesses);

  const isCanvasDisabled = turnCycleState !== TurnCycleState.Drawing;

  // For functions that other components / parent need
  useImperativeHandle(
    ref,
    () => ({
      clearCanvas: () => {
        clearCanvas();
      },
    }),
    []
  );

  // This clear canvas is passed upward to the game.tsx, it needs to be called when turn cycle is at results so that is why no !isCanvasDisabled
  const clearCanvas = () => {
    if (canvasRef.current) {
      canvasRef.current.clearCanvas();
    }
  };

  // This clear canvas is used for the red trash button
  const onTrashClick = () => {
    if (canvasRef.current && !isCanvasDisabled) {
      canvasRef.current.clearCanvas();
    }
  };

  // Currently this function as well as the API function is very very janky. This is Proof of Concept Code
  // The core code itself is fine however there are no guard rails and the code is a nightmare to debug
  // To-do: write tests
  async function handleSubmit() {
    if (!canvasRef.current) {
      console.error("Canvas ref is not available yet");
      return;
    }

    if (isCanvasDisabled) {
      console.error("Canvas is disabled");
      return;
    }

    setTurnCycleState(TurnCycleState.Loading);
    // Gemini API only accepts rawBase64Data not DataURI
    const fullDataURI = await canvasRef.current.exportImage("png");
    const rawBase64Data = fullDataURI.split(",")[1];

    // API Call
    const result = await GeminiAPICall(rawBase64Data);

    if (result.success) {
      setResponse(result.data.response);
      setTurnCycleState(TurnCycleState.ShowingResult);

      // Guess Check
      if (checkGuess(result.data.response, currentDrawingPrompt)) {
        setGuessState(GuessState.Correct);
        incrementCorrectGuesses();
      } else {
        setGuessState(GuessState.Incorrect);
      }
    } else {
      // TODO: now that errors properly propagate up all the way to the component
      // User needs to be shown

      // Placeholder for now
      console.error(result.error);
    }
  }

  return (
    <>
      <div
        role="game"
        className="w-full border-4 rounded-3xl bg-white overflow-hidden border-black shadow-[6px_8px_0px_0px_rgba(0,0,0,1)]"
      >
        {/* There is a minor bug here, react sketch canvas has no way to freeze the canvas and prevent the user from drawing
        this means the user can draw on the canvas after the drawing stage */}
        <ReactSketchCanvas
          className=""
          height="400px"
          strokeWidth={4}
          strokeColor="black"
          ref={canvasRef}
        ></ReactSketchCanvas>
      </div>

      <div className="flex flex-row gap-4 w-full">
        <Button onClick={handleSubmit} disabled={isCanvasDisabled} className="flex-grow">
          Submit Drawing
        </Button>
        <Button
          aria-label="clear canvas"
          onClick={onTrashClick}
          disabled={isCanvasDisabled}
          variant="danger"
        >
          <Trash2 size={32}></Trash2>
        </Button>
      </div>
    </>
  );
}

export default forwardRef<SketchpadRef>(Sketchpad);
