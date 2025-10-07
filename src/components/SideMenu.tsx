import { ListIcon, MoonIcon, SunIcon, XIcon } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import type { NavigationTreeNode } from "../lib/navigation";
import { Navigation } from "./Navigation";
import { handleToggleClick } from "astro-theme-toggle";

export function SideNavigation({ tree, pathname }: { tree: NavigationTreeNode[]; pathname: string }) {
    const [expanded, setExpanded] = useState(false);

    const [theme, setTheme] = useState("light");

    useEffect(() => {
        const observer = new MutationObserver(() => {
            const newTheme = document.documentElement.getAttribute("data-theme") || "light";
            setTheme(newTheme);
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["data-theme"],
        });

        return () => observer.disconnect();
    }, []);

    return (
        <>
            <div
                className="px-1 text-xl"
                onClick={() => {
                    setExpanded(true);
                    console.log("aaa");
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
                            className={twMerge("fixed flex flex-col top-0 bottom-0 left-full w-64 bg-background z-110")}
                            variants={{
                                hidden: { translateX: 0 },
                                visible: { translateX: "-100%" },
                            }}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            transition={{ ease: "easeInOut" }}
                        >
                            <div className="p-4 flex flex-row justify-between text-2xl opacity-60">
                                <div onClick={(e) => handleToggleClick({ clientX: e.clientX, clientY: e.clientY })}>
                                    {theme === "light" ? <MoonIcon /> : <SunIcon />}
                                </div>
                                <div className="" onClick={() => setExpanded(false)}>
                                    <XIcon />
                                </div>
                            </div>
                            <div className="mt-4 px-3">
                                <Navigation tree={tree} pathname={pathname} />
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
