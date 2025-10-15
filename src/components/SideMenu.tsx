import { ListIcon, XIcon } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

import type { ContentTree } from "../lib/content-trees";
import { Navigation } from "./Navigation";
import { ThemeToggle } from "./ThemeToggle";

export function SideMenu({ tree, pathname }: { tree: ContentTree; pathname: string }) {
    const [expanded, setExpanded] = useState(false);

    return (
        <>
            <div
                className="p-2 text-xl"
                onClick={() => {
                    setExpanded(true);
                }}
            >
                <ListIcon />
            </div>
            <AnimatePresence>
                {expanded && (
                    <>
                        <motion.div
                            className={twMerge("fixed inset-0 bg-black/60 z-100")}
                            variants={{
                                hidden: { opacity: 0 },
                                visible: { opacity: 1 },
                            }}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            onClick={() => setExpanded(false)}
                        ></motion.div>
                        <motion.div
                            className={twMerge("fixed flex flex-col top-0 bottom-0 left-full w-64 bg-bg z-110")}
                            variants={{
                                hidden: { translateX: 0 },
                                visible: { translateX: "-100%" },
                            }}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            transition={{ ease: "easeInOut" }}
                        >
                            <div className="p-2 flex flex-row justify-between text-xl opacity-60">
                                <ThemeToggle className="" />
                                <div className="p-2" onClick={() => setExpanded(false)}>
                                    <XIcon />
                                </div>
                            </div>
                            <div className="mt-4 px-3">
                                <Navigation tree={tree} pathname={pathname} />
                            </div>
                            <div className="mt-auto mb-0 py-2 px-3 opacity-60 font-mono">
                                <a href="https://hornik.dev" target="_blank" className="text-sm">
                                    &copy; {new Date().getFullYear()} Ian Hornik
                                </a>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
