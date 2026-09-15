import { useGameStore } from "@/store/gameStore";
import { AI_PERSONALITIES, AIPersonality, PROMPT_CATEGORIES, PromptCategory } from "@/utils/types";
import Image from "next/image";
import Button from "./Button";
import DropDownList from "./DropDownList";
import Footer from "./Footer";
export default function Lobby() {
  const setPromptCategory = useGameStore((state) => state.setPromptCategory);
  const promptCategory = useGameStore((state) => state.promptCategory);
  const setAiPersonality = useGameStore((state) => state.setAiPersonality);
  const aiPersonality = useGameStore((state) => state.aiPersonality);
  const startGame = useGameStore((state) => state.startGame);

  return (
    <main className="container mx-auto flex flex-col items-center gap-10 justify-center pt-20 px-4 min-h-screen">
      <div className="flex w-full max-w-2xl flex-col items-center gap-4">
        <h1 className="w-full">
          <Image
            src="/banner.webp"
            alt="What the Sketch?"
            width={900}
            height={314}
            className="w-full max-w-2xl h-auto"
            priority
          ></Image>
        </h1>
        <p className="text-2xl text-gray-900 text-center sm:mb-4 mb-2">
          Draw a prompt and see if AI can guess your sketch
        </p>
      </div>

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
      <Footer />
    </main>
  );
}
