import { MoonIcon, SunIcon } from "@phosphor-icons/react";
import { handleToggleClick } from "astro-theme-toggle";
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
        <div className={twMerge("p-2 cursor-pointer text-xl", className)} onClick={handleClick}>
            {isDark ? <SunIcon /> : <MoonIcon />}
        </div>
    );
}
