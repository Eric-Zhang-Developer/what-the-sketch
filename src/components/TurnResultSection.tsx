import { useGameStore } from "@/store/gameStore";
import { TurnResultProps, GuessState } from "@/utils/types";
import Markdown from "react-markdown";
import Button from "./ui/Button";
import Confetti from "./ui/Confetti";

export default function TurnResultSection({ onNextPromptClick }: TurnResultProps) {
  const guessState = useGameStore((state) => state.guessState);
  const response = useGameStore((state) => state.response);

  // TODO: Refactor, this is kinda fragile
  const parts = response.split("My guess is ");

  const commentary = parts[0];
  const guess = parts[1];

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
        className={`border-4 p-8 rounded-2xl text-center bg-white flex flex-col gap-4 ${borderColorMap[guessState]}`}
        style={{
          boxShadow: `4px 6px 0px 0px rgba(${borderShadowColorMap[guessState]})`,
        }}
        data-testid="turn-result-section"
      >
        <div className="text-2xl text-slate-800 text-left">
          <Markdown>{commentary}</Markdown>
        </div>

        {/* Line Separator */}
        <div className="w-full border-b-2 h-1 border-slate-300 border-double"></div>

        <div className="text-4xl">
          <Markdown>{guess}</Markdown>
        </div>
      </div>
      <Button onClick={onNextPromptClick}>Next Prompt</Button>

      {guessState === GuessState.Correct && <Confetti></Confetti>}
    </>
  );
}
