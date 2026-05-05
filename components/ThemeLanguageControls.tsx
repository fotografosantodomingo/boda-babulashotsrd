"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

function englishPath(pathname: string) {
  if (pathname === "/") return "/en";
  if (pathname.startsWith("/en")) return pathname;
  return `/en${pathname}`;
}

function spanishPath(pathname: string) {
  if (pathname === "/en") return "/";
  if (pathname.startsWith("/en/")) return pathname.replace(/^\/en/, "") || "/";
  return pathname;
}

export function ThemeLanguageControls() {
  const pathname = usePathname() || "/";
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const isEnglish = pathname === "/en" || pathname.startsWith("/en/");
  const alternateHref = useMemo(() => (isEnglish ? spanishPath(pathname) : englishPath(pathname)), [isEnglish, pathname]);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const nextTheme = savedTheme === "dark" || (!savedTheme && prefersDark) ? "dark" : "light";

    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
  }, []);

  function toggleTheme() {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem("theme", nextTheme);
  }

  return (
    <div className="site-controls" aria-label={isEnglish ? "Site settings" : "Opciones del sitio"}>
      <button
        className="control-button"
        type="button"
        onClick={toggleTheme}
        aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      >
        {theme === "dark" ? "Light" : "Dark"}
      </button>
      <Link className="control-button" href={alternateHref} hrefLang={isEnglish ? "es-DO" : "en"}>
        {isEnglish ? "ES" : "EN"}
      </Link>
    </div>
  );
}
