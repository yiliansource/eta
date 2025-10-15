import { CaretDownIcon, MinusIcon, PlusIcon, ShieldChevronIcon, TagChevronIcon } from "@phosphor-icons/react";
import { motion } from "motion/react";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

import { type ContentTreeNode, getContentNodeHref } from "../lib/content-trees";
import { anyChildOrSelf } from "../lib/trees";

export function Navigation({ tree, pathname }: { tree: ContentTreeNode[]; pathname: string }) {
    pathname = pathname.replace(/\/$/, "");

    return (
        <nav>
            <p className="mb-2 uppercase text-xs font-mono text-fg-dimmer">Table of contents</p>
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

    const hasChildren = node.children && node.children.length > 0;
    const focused = currentPathname && href === currentPathname;
    const active = currentPathname && href && anyChildOrSelf(node, (n) => getContentNodeHref(n) === currentPathname);

    const [expanded, setExpanded] = useState(active);

    return (
        <li className={twMerge("relative my-1 pl-4", active ? "text-foreground" : "text-fg-dim")}>
            {hasChildren && (
                <div className="absolute -left-1 top-[2px] p-1 cursor-pointer" onClick={() => setExpanded(!expanded)}>
                    <motion.div animate={{ rotateZ: expanded ? 0 : -90 }}>
                        <CaretDownIcon className="size-3" />
                    </motion.div>
                </div>
            )}
            <a
                href={href}
                className={twMerge(
                    "inline-block hover:underline underline-offset-2 decoration-2",
                    focused && "font-bold",
                )}
            >
                {node.title ?? node.key}
            </a>
            {expanded && hasChildren && (
                <ol className="" type="i">
                    {node.children!.map((n) => (
                        <NavigationItem key={n.key} node={n} currentPathname={currentPathname} />
                    ))}
                </ol>
            )}
        </li>
    );
}
