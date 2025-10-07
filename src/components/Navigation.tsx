import { twMerge } from "tailwind-merge";
import type { NavigationTreeNode } from "../lib/navigation";
import { anyInTree } from "../lib/navigation-utils";

export function Navigation({ tree, pathname }: { tree: NavigationTreeNode[]; pathname: string }) {
    pathname = pathname.replace(/\/$/, "");

    return (
        <nav>
            <p className="mb-2 uppercase text-xs font-mono text-neutral-400 dark:text-neutral-600">Table of contents</p>
            <ol className="leading-6 font-mono">
                {tree
                    .toSorted((a, b) => a.order - b.order)
                    .map((t) => (
                        <NavigationItem key={t.key} node={t} pathname={pathname} />
                    ))}
            </ol>
        </nav>
    );
}

function NavigationItem({ node, pathname }: { node: NavigationTreeNode; pathname: string }) {
    const expanded = node.href && anyInTree(node, (n) => n.href === pathname);
    const focused = node.href === pathname;

    return (
        <li className="my-1 marker:text-neutral-400 dark:marker:text-neutral-500 marker:text-xs">
            {node.href ? (
                <a
                    href={node.href}
                    className={twMerge(
                        "inline-block hover:underline underline-offset-2 decoration-2",
                        expanded ? "text-foreground" : "text-neutral-400 dark:text-neutral-400",
                        focused && "font-bold",
                    )}
                >
                    {node.title ?? node.key}
                </a>
            ) : (
                <span>{node.title ?? node.key}</span>
            )}
            {expanded && node.children && node.children.length > 0 && (
                <ol className="pl-8 list-[lower-roman]" type="i">
                    {node.children
                        .toSorted((a, b) => a.order - b.order)
                        .map((n) => (
                            <NavigationItem key={n.key} node={n} pathname={pathname} />
                        ))}
                </ol>
            )}
        </li>
    );
}
