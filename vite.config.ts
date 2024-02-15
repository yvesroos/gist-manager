import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // test: {
  //   setupFiles: ["test/setup.ts"],
  // },
  test: {
    globals: true,
    environment: "happy-dom",
    setupFiles: ["setupTests.ts"],
  },
});
