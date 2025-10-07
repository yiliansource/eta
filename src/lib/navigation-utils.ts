import type { NavigationTreeNode } from "./navigation";

export function anyInTree(node: NavigationTreeNode, predicate: (n: NavigationTreeNode) => boolean): boolean {
    return predicate(node) || (node.children?.some((child) => anyInTree(child, predicate)) ?? false);
}

export function buildCrumbs(root: NavigationTreeNode, targetKey: string): NavigationTreeNode[] | null {
    if (root.key === targetKey) {
        return [root];
    }

    if (root.children) {
        for (const child of root.children) {
            const path = buildCrumbs(child, targetKey);
            if (path) {
                return [root, ...path];
            }
        }
    }

    return null;
}
