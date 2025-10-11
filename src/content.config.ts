import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

export const collections = {
    notes: defineCollection({
        loader: glob({ pattern: "**/*.mdx", base: "./src/content/notes" }),
        schema: z.object({
            title: z.string(),
            description: z.string().optional(),
            draft: z.boolean().optional(),
            order: z.number().optional(),
        }),
    }),
};
