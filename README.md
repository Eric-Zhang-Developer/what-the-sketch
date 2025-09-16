[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Google GenAI](https://img.shields.io/badge/google%20gemini-8E75B2?style=for-the-badge&logo=google%20gemini&logoColor=white)](https://gemini.google/about/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)
[![Vitest](https://img.shields.io/badge/Vitest-%236E9F18.svg?style=for-the-badge&logo=vitest&logoColor=white)](https://vitest.dev/)
[![React Testing Library](https://img.shields.io/badge/RTL-%23E33332.svg?style=for-the-badge&logo=testing-library&logoColor=white)](https://testing-library.com/)
[![Eslint](https://img.shields.io/badge/eslint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)](https://eslint.org/)
[![Turborepo](https://img.shields.io/badge/-Turborepo-EF4444?style=for-the-badge&logo=turborepo&logoColor=white)](https://turborepo.org/)

![Test Coverage](https://img.shields.io/badge/Coverage-83.5%25-green?style=for-the-badge)

# AI Pictionary

A web application where you draw a picture based on a given prompt, and a generative AI attempts to guess what it is.

## Overview

AI Pictionary is an interactive game that tests both your drawing skills and the descriptive power of modern multimodal AI. Users are given a random prompt to draw on a digital canvas. The drawing is then sent to the Google Gemini model, which analyzes the image and provides its best guess in a descriptive text format.

The application is built with a modern, full-stack approach, prioritizing a fun user experience and a robust, test-driven development process.

## How It Works

1.  **Start the Game**: From the lobby, click the "Start Game\!" button to begin.
2.  **Get a Prompt**: You'll be given a random prompt, like "Draw a cat" or "Draw a house."
3.  **Draw Your Masterpiece**: Use the sketchpad to draw your interpretation of the prompt. You can clear the canvas if you need to start over.
4.  **Submit for Guessing**: Once you're ready, submit your drawing. The image data is sent to the backend, which forwards it to the AI for analysis.
5.  **See the Result**: The AI's guess is displayed on the screen. The application checks if your prompt word is mentioned in the AI's response to determine if the guess was correct.
6.  **Play Through Rounds**: Continue with new prompts for a total of 5 rounds, after which your final score is displayed.

## Key Features

- **Interactive Drawing Canvas**: A responsive and easy-to-use sketchpad for creating your drawings.
- **AI-Powered Guessing**: Leverages Google's Gemini Flash model to analyze and interpret user-submitted drawings.
- **Randomized Prompts**: A wide variety of drawing prompts are randomly selected, ensuring high replayability.
- **Gamified Experience**: A complete game loop that includes a lobby, multiple rounds of play, and a final results screen.
- **Comprehensive Testing**: A robust suite of unit and integration tests built with Vitest and React Testing Library ensures the application's core logic and UI components are reliable.

## Setup

To run this project locally:

1.  Navigate to the project directory:
    ```bash
    cd ai-pictionary
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Run the development server:
    ```bash
    npm run dev
    ```

## Tech Stack

### Frontend

- **React**
- **Next.js** (App Router)
- **TypeScript**
- **TailwindCSS**

### Backend

- **Next.js API Routes**
- **Google Gemini** (for AI vision and content generation)

### Testing

- **Vitest**
- **React Testing Library**
- **jsdom**
