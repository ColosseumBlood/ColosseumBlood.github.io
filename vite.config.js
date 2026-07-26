import { defineConfig } from "vite";

export default defineConfig({
  base: "/ColosseumBlood-site/",
  build: {
    target: "es2022",
    cssMinify: "lightningcss",
  },
});
