import { useRef, forwardRef, useImperativeHandle, type Ref } from "react";
import { ReactSketchCanvas, ReactSketchCanvasRef } from "react-sketch-canvas";
import { GuessState, SketchpadRef, TurnCycleState } from "@/utils/types";
import { checkGuess } from "@/utils/check-guess";
import { Trash2 } from "lucide-react";
import { useGameStore } from "@/store/gameStore";

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

    try {
      // API Call

      const response = await fetch("http://localhost:3000/api/generate-response", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: rawBase64Data }),
      });

      // To-Do : More Robust Error Handling, write tests for this function.
      // Better idea is to separate this try catch block into its own function
      if (!response.ok) {
        throw new Error(`API Error: ${response.status} `);
      }

      const result = await response.json();

      setResponse(result.response);
      setTurnCycleState(TurnCycleState.ShowingResult);

      // Guess Check
      if (checkGuess(result.response, currentDrawingPrompt)) {
        setGuessState(GuessState.Correct);
        incrementCorrectGuesses();
      } else {
        setGuessState(GuessState.Incorrect);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div role="game" className="w-full">
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

      <div className="flex flex-row gap-4">
        <button
          onClick={handleSubmit}
          disabled={isCanvasDisabled}
          className="bg-blue-400 text-white px-10 py-3 rounded-xl text-2xl shadow-lg 
          hover:cursor-pointer transition hover:scale-110 
          disabled:bg-blue-300 disabled:opacity-80 disabled:hover:scale-100 disabled:hover:cursor-default"
        >
          Submit Drawing
        </button>
        <button
          aria-label="clear canvas"
          onClick={onTrashClick}
          disabled={isCanvasDisabled}
          className="bg-red-400 py-3 px-3 text-2xl text-white rounded-xl shadow-lg hover:cursor-pointer transition hover:scale-110
          disabled:bg-red-300 disabled:opacity-80 disabled:hover:scale-100 disabled:hover:cursor-default"
        >
          <Trash2 size={32}></Trash2>
        </button>
      </div>
    </>
  );
}

export default forwardRef<SketchpadRef>(Sketchpad);
