import { useGameStore } from "@/store/gameStore";
import { AI_PERSONALITIES, AIPersonality, PROMPT_CATEGORIES, PromptCategory } from "@/utils/types";
import Image from "next/image";
import Button from "./Button";
import DropDownList from "./DropDownList";
export default function Lobby() {
  const setPromptCategory = useGameStore((state) => state.setPromptCategory);
  const promptCategory = useGameStore((state) => state.promptCategory);
  const setAiPersonality = useGameStore((state) => state.setAiPersonality);
  const aiPersonality = useGameStore((state) => state.aiPersonality);
  const startGame = useGameStore((state) => state.startGame);

  return (
    <main className="container mx-auto flex flex-col items-center gap-10 justify-center pt-20 px-4">
      <Image
        aria-label="what-the-sketch-banner"
        src="/banner.webp"
        alt="What the Sketch? Banner"
        width={900}
        height={314}
        className="w-full max-w-3xl h-auto"
        priority
      ></Image>
      <DropDownList
        options={PROMPT_CATEGORIES}
        displayText="Category: "
        value={promptCategory}
        onChange={(value: string) => setPromptCategory(value as PromptCategory)}
      ></DropDownList>
      <DropDownList
        options={AI_PERSONALITIES}
        displayText="AI Personality: "
        value={aiPersonality}
        onChange={(value: string) => setAiPersonality(value as AIPersonality)}
      ></DropDownList>
      <Button onClick={startGame}>Start Game!</Button>
    </main>
  );
}
