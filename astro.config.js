import { defineConfig } from "astro/config";
import node from "@astrojs/node";
import vue from "@astrojs/vue";
import yaml from "@rollup/plugin-yaml";

// https://astro.build/config
export default defineConfig({
  srcDir: "./",
  output: "server",
  adapter: node({
    // See https://docs.astro.build/en/guides/integrations-guide/node/#mode
    mode: "middleware",
  }),
  integrations: [vue()],
  vite: {
    resolve: {
      alias: {
        "~": "./",
      },
    },
    plugins: [yaml()],
  },
});
