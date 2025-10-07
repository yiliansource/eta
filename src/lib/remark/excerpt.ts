import type { RemarkPlugin } from "@astrojs/markdown-remark";
import { visit } from "unist-util-visit";
import { toString } from "mdast-util-to-string";
import type { Root, Content } from "mdast";

const remarkExcerpt: RemarkPlugin = () => {
    return (tree: Root, file) => {
        let cutoffIndex: number | null = null;
        let cutoffParent: any = null;

        // find the first :excerpt directive
        visit(tree, (node: any, index: number | undefined, parent: any | undefined) => {
            if (cutoffIndex !== null) return; // already found
            if (node.type !== "leafDirective") return;
            if (node.name !== "excerpt") return;

            cutoffIndex = typeof index === "number" ? index : null;
            cutoffParent = parent ?? null;
        });

        // if we found the marker and it has a parent with children
        if (cutoffIndex !== null && cutoffParent && Array.isArray(cutoffParent.children)) {
            const beforeNodes: Content[] = cutoffParent.children.slice(0, cutoffIndex);

            file.data.astro!.frontmatter!.description = toString({ type: "root", children: beforeNodes } as Root);

            cutoffParent.children.splice(cutoffIndex, 1);
        } else {
            // no marker found — optional fallback: take first paragraph
            const firstParagraph = (tree.children as Content[]).find((n: any) => n.type === "paragraph");
            const text = firstParagraph ? toString(firstParagraph as any) : "";

            file.data.astro!.frontmatter!.description = text;
        }
    };
};

export default remarkExcerpt;
