import { MoonIcon, SunIcon } from "@phosphor-icons/react";
import { handleToggleClick } from "astro-theme-toggle";
import { AnimatePresence, motion } from "motion/react";
import { useCallback } from "react";
import { twMerge } from "tailwind-merge";

import { useIsDarkTheme } from "../lib/theme";

export function ThemeToggle({ className }: { className?: string }) {
    const isDark = useIsDarkTheme();
    const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        handleToggleClick({
            clientX: rect.left + rect.width / 2,
            clientY: rect.top + rect.height / 2,
        });
    }, []);

    return (
        <motion.div className={twMerge("p-2 cursor-pointer text-xl", className)} onClick={handleClick}>
            <AnimatePresence mode="wait">
                <motion.div
                    key={String(isDark)}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    {isDark ? <SunIcon /> : <MoonIcon />}
                </motion.div>
            </AnimatePresence>
        </motion.div>
    );
}
