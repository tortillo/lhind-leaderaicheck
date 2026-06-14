import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // Build to ./dist as a fully static site (deployable anywhere).
  build: { outDir: "dist" },
  // If you deploy under a subpath (e.g. company.com/aicheck/), set base here:
  // base: "/aicheck/",
});
