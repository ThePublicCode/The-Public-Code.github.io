import { defineConfig } from "vite";
import { bhMarkdown } from "@bruk-io/bh-01/vite-plugin";

export default defineConfig({
  root: ".",
  build: {
    outDir: "dist",
  },
  plugins: [bhMarkdown()],
});
