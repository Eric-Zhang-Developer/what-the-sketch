/**
 * Gets a random prompt from the list of provided random prompts
 * @returns {string} Returns a string which is the prompt
 * Currently DRAWING_PROMPTS is a 100 item static list of prompts
 * A future feature could be selecting from prompt categories as well as difficulties.
 * Example a easy geography / map / culture question is draw the USA, a hard one would be draw Brunei
 */

import { DRAWING_PROMPTS } from "@/utils/drawing-prompts";
import { PromptCategory } from "./types";

export const getRandomPrompt = (category: PromptCategory): string => {
  const pool =
    category === PromptCategory.Default
      ? DRAWING_PROMPTS
      : DRAWING_PROMPTS.filter((p) => p.category === category);

  const randomIndex = Math.floor(Math.random() * pool.length);
  return pool[randomIndex].name;
};
