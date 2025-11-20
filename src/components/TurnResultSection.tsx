import { useGameStore } from "@/store/gameStore";
import { TurnResultProps, GuessState } from "@/utils/types";
import Markdown from "react-markdown";

export default function TurnResultSection({ onNextPromptClick }: TurnResultProps) {
  const guessState = useGameStore((state) => state.guessState);
  const response = useGameStore((state) => state.response);

  const parts = response.split("My guess is ");

  const commentary = parts[0];
  const guess = parts[1];

  // Visual Indicator for guess correctness, this is a placeholder for a more advanced scoring system
  const borderColorMap = {
    [GuessState.Pending]: "border-black",
    [GuessState.Correct]: "border-emerald-500",
    [GuessState.Incorrect]: "border-red-500",
  };

  return (
    <>
      <div
        className={`border-2 py-10 px-10 rounded-2xl text-center mt-10 bg-slate-200 shadow-xl flex flex-col gap-4 ${borderColorMap[guessState]}`}
        data-testid="turn-result-section"
      >
        <div className="text-lg text-slate-800">
          <Markdown>{commentary}</Markdown>
        </div>
        <div className="text-2xl">
          <Markdown>{guess}</Markdown>
        </div>
      </div>

      <button
        onClick={onNextPromptClick}
        className="bg-blue-400 text-white px-10 py-3 rounded-xl text-2xl shadow-lg hover:cursor-pointer transition hover:scale-110"
      >
        Next Prompt
      </button>
    </>
  );
}
