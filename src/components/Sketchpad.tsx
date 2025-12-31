import { useRef, forwardRef, useImperativeHandle, type Ref } from "react";
import { ReactSketchCanvas, ReactSketchCanvasRef } from "react-sketch-canvas";
import { GuessState, SketchpadRef, TurnCycleState } from "@/utils/types";
import { checkGuess } from "@/utils/check-guess";
import { Trash2, Undo2, Pencil, Eraser } from "lucide-react";
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
  const setErrorMessage = useGameStore((state) => state.setErrorMessage);
  const isEraseMode = useGameStore((state) => state.isEraseMode);
  const setEraseMode = useGameStore((state) => state.setEraseMode);

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

  const onUndoClick = () => {
    if (canvasRef.current && !isCanvasDisabled) {
      canvasRef.current.undo();
    }
  };

  const onEraseModeClick = () => {
    if (canvasRef.current && !isCanvasDisabled) {
      const newEraseMode = !isEraseMode;
      setEraseMode(newEraseMode);
      canvasRef.current.eraseMode(newEraseMode);
    }
  };

  /**
   * Exports canvas to base64 and asks Gemini to guess the drawing.
   * Updates UI state based on whether the AI correctly identified the prompt.
   */
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
      // Error UI for User
      setTurnCycleState(TurnCycleState.Error);
      setErrorMessage(result.error);
    }
  }

  return (
    <>
      <div
        role="game"
        className="w-full border-4 rounded-3xl bg-white overflow-hidden border-black shadow-[6px_8px_0px_0px_rgba(0,0,0,1)]"
      >
        {/* This wrapper div disables the canvas when needed */}
        <div className={isCanvasDisabled ? "pointer-events-none" : ""}>
          <ReactSketchCanvas
            className=""
            height="60vh"
            strokeWidth={4}
            strokeColor="black"
            ref={canvasRef}
          ></ReactSketchCanvas>
        </div>
      </div>

      <div className="flex flex-row flex-wrap gap-4 w-full justify-center">
        <Button
          onClick={onEraseModeClick}
          variant={isEraseMode ? "danger" : "primary"}
          disabled={isCanvasDisabled}
        >
          {isEraseMode ? <Eraser size={32}></Eraser> : <Pencil size={32}></Pencil>}
        </Button>
        <Button onClick={onUndoClick} disabled={isCanvasDisabled}>
          <Undo2 size={32}></Undo2>
        </Button>
        <Button
          aria-label="clear canvas"
          onClick={onTrashClick}
          disabled={isCanvasDisabled}
          variant="danger"
        >
          <Trash2 size={32}></Trash2>
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={isCanvasDisabled}
          className="w-full md:flex-grow md:w-auto"
        >
          Submit Drawing
        </Button>
      </div>
    </>
  );
}

export default forwardRef<SketchpadRef>(Sketchpad);
