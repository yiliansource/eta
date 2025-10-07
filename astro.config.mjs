// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";

import tailwindcss from "@tailwindcss/vite";

import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import remarkDirective from "remark-directive";

import remarkTheorem from "./src/lib/remark/theorem";
import remarkProof from "./src/lib/remark/proof";
import remarkExcerpt from "./src/lib/remark/excerpt";
import remarkLabel from "./src/lib/remark/label";

export default defineConfig({
    vite: {
        plugins: [tailwindcss()],
    },
    integrations: [
        mdx({
            remarkPlugins: [remarkLabel, remarkExcerpt, remarkTheorem, remarkProof, remarkDirective, remarkMath],
            rehypePlugins: [rehypeKatex],
        }),
        react(),
    ],
});
