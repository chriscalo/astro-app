import { defineConfig } from "astro/config";
import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: node({
    // Change "mode" to "middleware" when ready to write Express server
    // See https://docs.astro.build/en/guides/integrations-guide/node/#mode
    mode: "middleware",
  }),
});
