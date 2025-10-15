import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getCollection } from "astro:content";

import { urlifyPostId } from "../lib/content-trees";

export async function GET(context: APIContext) {
    const notes = await getCollection("notes");
    return rss({
        title: "eta",
        description: "A collection of math notes.",
        site: context.site!,
        items: notes.map((note) => ({
            title: note.data.title,
            description: note.data.description,
            link: "/notes/" + urlifyPostId(note.id),
        })),
    });
}
