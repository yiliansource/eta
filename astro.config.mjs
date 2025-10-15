// @ts-check
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import rehypeKatex from "rehype-katex";
import remarkDirective from "remark-directive";
import remarkMath from "remark-math";

import remarkExcerpt from "./src/lib/remark/excerpt";
import remarkLabel from "./src/lib/remark/label";
import remarkProof from "./src/lib/remark/proof";
import remarkTheorem from "./src/lib/remark/theorem";

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
