import { getCollection } from "astro:content";

export interface NavigationTreeNode {
    title: string | null;
    href: string | null;
    key: string;
    order: number;
    children?: NavigationTreeNode[];
}

export async function getNavigationTree() {
    const notes = await getCollection("notes");
    const notesWithReplacedId = notes.map((n) => ({
        ...n,
        id: n.id.replace(/\/_index$/, ""),
    }));

    const root: NavigationTreeNode[] = [];
    const idSet = new Set(notesWithReplacedId.map((i) => i.id));

    for (const note of notesWithReplacedId) {
        const parts = note.id.split("/");

        let current = root;

        for (let i = 0; i < parts.length; i++) {
            const key = parts.slice(0, i + 1).join("/");
            let node = current.find((n) => n.key === key);

            if (!node) {
                const isExplicit = idSet.has(key);
                node = {
                    title: isExplicit ? (i === parts.length - 1 ? note.data.title : parts[i]) : null,
                    href: isExplicit ? key : null,
                    order: note.data.order ?? 0,
                    key,
                };
                current.push(node);
            }

            if (i === parts.length - 1) {
                node.title = note.data.title;
                node.href = "/notes/" + note.id;
                node.order = note.data.order ?? 0;
            }

            if (i < parts.length - 1) {
                node.children = node.children ?? [];
                current = node.children;
            }
        }
    }

    return root;
}
