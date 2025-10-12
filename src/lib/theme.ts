import { useEffect, useState } from "react";

function getTheme() {
    return (typeof document !== "undefined" && document.documentElement.getAttribute("data-theme")) || "light";
}

export function useIsDarkTheme(): boolean {
    const [isDark, setIsDark] = useState(getTheme() === "dark");

    useEffect(() => {
        const observer = new MutationObserver(() => {
            setIsDark(getTheme() === "dark");
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["data-theme"],
        });

        return () => observer.disconnect();
    }, []);

    return isDark;
}
