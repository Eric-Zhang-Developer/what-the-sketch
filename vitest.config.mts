import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { loadEnv } from "vite";
export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: "jsdom",
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
    env: loadEnv("test", process.cwd(), ""),
    coverage: {
      provider: "v8",
      include: ["src/**/*.{ts,tsx}"],
      exclude: [
        "src/utils/supabase/database.types.ts", // Supabase generated types
        "src/utils/supabase/server.ts", // Logic given by supabase / boilerplate code
        "src/app/layout.tsx", // No meaningful logic to test
        "src/utils/drawing-prompts.ts", // Static data
      ],
    },
  },
});
