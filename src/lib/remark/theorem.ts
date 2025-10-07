import type { RemarkPlugin } from "@astrojs/markdown-remark";
import { visit } from "unist-util-visit";

const BLOCK_NAMES = new Set(["theorem", "lemma", "proposition", "corollary", "definition", "example", "remark"]);

const remarkTheorems: RemarkPlugin = () => {
    return (tree, file) => {
        let counter = 1;
        visit(tree, (node) => {
            if (node.type !== "containerDirective") return;
            if (!node.name) return;

            const name = node.name.trim().toLowerCase();
            if (!BLOCK_NAMES.has(name)) return;

            const key = name;
            const next = counter++;

            // @ts-ignore
            node.type = "mdxJsxFlowElement";
            node.name = "Theorem";
            node.attributes = [
                // @ts-ignore
                { type: "mdxJsxAttribute", name: "type", value: capitalize(name) },
                // @ts-ignore
                { type: "mdxJsxAttribute", name: "n", value: next },
            ];

            node.data = node.data || {};
            // @ts-ignore
            node.data._numbering = { type: capitalize(name), n: next };
        });
    };
};

export default remarkTheorems;

function capitalize(s: string) {
    return s.charAt(0).toUpperCase() + s.slice(1);
}
