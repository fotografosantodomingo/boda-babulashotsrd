"use client";

import type { MouseEvent } from "react";
import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

function targetLanguagePath(pathname: string, targetLocale: "es" | "en") {
  const currentPath = pathname || "/";

  if (targetLocale === "es") {
    return currentPath.replace(/^\/en(?=\/|$)/, "") || "/";
  }

  if (currentPath === "/" || currentPath === "/en" || currentPath === "/en/") {
    return "/en/";
  }

  if (currentPath.startsWith("/en/")) {
    return currentPath;
  }

  return `/en${currentPath}`;
}

export function ThemeLanguageControls() {
  const pathname = usePathname() || "/";
  const router = useRouter();
  const isEnglish = pathname === "/en" || pathname === "/en/" || pathname.startsWith("/en/");
  const targetLocale = isEnglish ? "es" : "en";
  const languagePath = useMemo(() => targetLanguagePath(pathname, targetLocale), [pathname, targetLocale]);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = savedTheme === "light" || savedTheme === "dark" ? savedTheme : prefersDark ? "dark" : "light";

    document.documentElement.dataset.theme = initialTheme;
    setTheme(initialTheme);
  }, []);

  function handleThemeToggle() {
    const nextTheme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem("theme", nextTheme);
    setTheme(nextTheme);
  }

  function handleLanguageSwitch(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    router.push(languagePath);
  }

  return (
    <div className="site-controls" aria-label="Opciones del sitio">
      <button
        className="control-button"
        type="button"
        onClick={handleThemeToggle}
        aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      >
        {theme === "dark" ? "Light" : "Dark"}
      </button>
      <a
        className="control-button"
        href={languagePath}
        hrefLang={isEnglish ? "es-DO" : "en"}
        onClick={handleLanguageSwitch}
        aria-label={isEnglish ? "Cambiar a español" : "Switch to English"}
        data-language-target={languagePath}
      >
        {isEnglish ? "ES" : "EN"}
      </a>
    </div>
  );
}
