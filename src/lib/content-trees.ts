import type { getCollection } from "astro:content";
import { bfs, type OrderedTree, type OrderedTreeNode } from "./trees";

export type ContentTree = OrderedTree<ContentTreeNode>;
export interface ContentTreeNode extends OrderedTreeNode {
    key: string;
    title?: string;
}

export function urlifyPostId(id: string): string {
    return id.replace(/\/_index$/, "");
}

export function getContentNodeHref(node: ContentTreeNode): string {
    return "/notes/" + node.key;
}

export function buildCrumbs(tree: ContentTree, targetKey: string): ContentTreeNode[] | null {
    for (const root of tree) {
        const path = bfs(root, (n) => n.key === targetKey);
        if (path) return path;
    }
    return null;
}

export function buildContentTree(entries: Awaited<ReturnType<typeof getCollection<"notes">>>): ContentTree {
    const tree: ContentTree = [];

    for (const entry of entries) {
        const urlid = urlifyPostId(entry.id);
        const parts = urlid.split("/");

        let current: ContentTree = tree;
        for (let i = 0; i < parts.length; i++) {
            const key = parts.slice(0, i + 1).join("/");
            let node = current.find((c) => c.key === key);

            if (!node) {
                node = {
                    key,
                    order: 0,
                };
                current.push(node);
            }

            if (i === parts.length - 1) {
                node.title = entry.data.title;
                node.order = entry.data.order ?? 0;
            }

            if (i < parts.length - 1) {
                node.children = node.children ?? [];
                current = node.children;
            }
        }
    }

    const sortingFn = (a: ContentTreeNode, b: ContentTreeNode) => a.order - b.order;
    const sortChildrenRecursively = (node: ContentTreeNode): void => {
        if (!node.children) return;

        node.children.sort(sortingFn);
        node.children.forEach(sortChildrenRecursively);
    };

    tree.forEach(sortChildrenRecursively);
    tree.sort(sortingFn);

    return tree;
}
