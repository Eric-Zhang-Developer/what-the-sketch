import { useGameStore } from "@/store/gameStore";
import { TurnResultProps, GuessState } from "@/utils/types";
import Markdown from "react-markdown";
import Button from "./Button";

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

  const borderShadowColorMap = {
    [GuessState.Pending]: "0, 0, 0, 1",
    [GuessState.Correct]: "16, 185, 129, 1",
    [GuessState.Incorrect]: "239, 68, 68, 1",
  };

  return (
    <>
      <div
        className={`border-4 py-10 px-10 rounded-2xl text-center mt-10 bg-slate-200 flex flex-col gap-4 ${borderColorMap[guessState]}`}
        style={{
          boxShadow: `4px 6px 0px 0px rgba(${borderShadowColorMap[guessState]})`,
        }}
        data-testid="turn-result-section"
      >
        <div className="text-lg text-slate-800">
          <Markdown>{commentary}</Markdown>
        </div>
        <div className="text-2xl">
          <Markdown>{guess}</Markdown>
        </div>
      </div>

      <Button onClick={onNextPromptClick}>Next Prompt</Button>
    </>
  );
}
