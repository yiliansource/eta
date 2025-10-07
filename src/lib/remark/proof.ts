import type { RemarkPlugin } from "@astrojs/markdown-remark";
import { visit } from "unist-util-visit";

const remarkProof: RemarkPlugin = () => {
    return (tree, file) => {
        visit(tree, (node) => {
            if (node.type !== "containerDirective") return;
            if (node.name !== "proof") return;

            // @ts-ignore
            node.type = "mdxJsxFlowElement";
            node.name = "Proof";
            // @ts-ignore
            node.attributes = [];
            node.data = node.data || {};
        });
    };
};

export default remarkProof;
