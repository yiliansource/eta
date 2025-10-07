// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";

import tailwindcss from "@tailwindcss/vite";

import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import remarkDirective from "remark-directive";

import remarkTheorems from "./src/lib/remark/theorem";
import remarkProofs from "./src/lib/remark/proof";

export default defineConfig({
    vite: {
        plugins: [tailwindcss()],
    },
    integrations: [mdx(), react()],
    markdown: {
        remarkPlugins: [remarkMath, remarkDirective, remarkTheorems, remarkProofs],
        rehypePlugins: [rehypeKatex],
    },
});
