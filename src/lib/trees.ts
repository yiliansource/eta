export interface TreeNode {
    key: string;
    children?: this[];
}
export interface OrderedTreeNode extends TreeNode {
    order: number;
}

export type Tree<T extends TreeNode> = T[];
export type OrderedTree<T extends OrderedTreeNode> = T[];

export function anyChildOrSelf<T extends TreeNode>(node: T, predicate: (n: T) => boolean): boolean {
    return predicate(node) || (node.children?.some((child) => anyChildOrSelf(child, predicate)) ?? false);
}

export function bfs<T extends TreeNode>(node: T, predicate: (n: T) => boolean): T[] | null {
    const queue: T[] = [node];
    const paths: Map<string, T[]> = new Map([[node.key, [node]]]);

    while (queue.length > 0) {
        const head = queue.shift()!;
        const path = paths.get(head.key)!;

        if (predicate(head)) {
            return path;
        }

        for (const child of head.children ?? []) {
            if (paths.has(child.key)) {
                continue;
            }

            queue.push(child);
            paths.set(child.key, [...path, child]);
        }
    }

    return null;
}

export type PrevNextResult<T extends TreeNode> = {
    prev: T | null;
    next: T | null;
};

export function getPrevNextInTree<T extends OrderedTreeNode>(
    tree: OrderedTree<T>,
    predicate: (n: T) => boolean,
): PrevNextResult<T> {
    const path =
        tree
            .map((n) => bfs(n, predicate))
            .find(Boolean)
            ?.slice(-3) ?? [];

    const parent = path[path.length - 2];
    const grandparent = path[path.length - 3];

    const siblings = parent?.children ?? tree;
    const index = siblings.findIndex(predicate);

    const parentSiblings = parent ? (grandparent?.children! ?? tree) : [];
    const parentIndex = parentSiblings.indexOf(parent);

    return {
        prev: siblings[index - 1] ?? parent,
        next: siblings[index]!.children
            ? siblings[index]!.children[0]
            : index + 1 < siblings.length
              ? siblings[index + 1]
              : parentIndex > -1
                ? parentSiblings[parentIndex + 1]
                : null,
    };
}
