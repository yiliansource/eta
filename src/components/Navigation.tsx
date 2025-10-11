import { twMerge } from "tailwind-merge";
import { getContentNodeHref, type ContentTreeNode } from "../lib/content-trees";
import { anyChildOrSelf } from "../lib/trees";

export function Navigation({ tree, pathname }: { tree: ContentTreeNode[]; pathname: string }) {
    pathname = pathname.replace(/\/$/, "");

    return (
        <nav>
            <p className="mb-2 uppercase text-xs font-mono text-neutral-400 dark:text-neutral-600">Table of contents</p>
            <ol className="leading-6 font-mono">
                {tree
                    .toSorted((a, b) => a.order - b.order)
                    .map((t) => (
                        <NavigationItem key={t.key} node={t} currentPathname={pathname} />
                    ))}
            </ol>
        </nav>
    );
}

function NavigationItem({ node, currentPathname }: { node: ContentTreeNode; currentPathname?: string }) {
    const href = getContentNodeHref(node);

    const expanded = currentPathname && href && anyChildOrSelf(node, (n) => getContentNodeHref(n) === currentPathname);
    const focused = currentPathname && href === currentPathname;

    return (
        <li className="my-1 marker:text-neutral-400 dark:marker:text-neutral-500 marker:text-xs">
            <a
                href={href}
                className={twMerge(
                    "inline-block hover:underline underline-offset-2 decoration-2",
                    expanded ? "text-foreground" : "text-neutral-400 dark:text-neutral-400",
                    focused && "font-bold",
                )}
            >
                {node.title ?? node.key}
            </a>
            {expanded && node.children && node.children.length > 0 && (
                <ol className="pl-8 list-[lower-roman]" type="i">
                    {node.children.map((n) => (
                        <NavigationItem key={n.key} node={n} currentPathname={currentPathname} />
                    ))}
                </ol>
            )}
        </li>
    );
}
