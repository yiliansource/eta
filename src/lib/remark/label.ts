import type { RemarkPlugin } from "@astrojs/markdown-remark";
import { toString } from "mdast-util-to-string";
import { visit } from "unist-util-visit";

const remarkLabel: RemarkPlugin = () => {
    return (tree) => {
        visit(tree, (node, index, parent) => {
            if (!parent) return;
            if (node.type !== "textDirective") return;
            if (node.name !== "label") return;

            const label = toString(node).trim();

            parent.children.splice(index!, 1, {
                type: "html",
                value: `<a id="${label}" name="${label}"></a>`,
            });
        });
    };
};

export default remarkLabel;
