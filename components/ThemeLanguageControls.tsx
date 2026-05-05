export function ThemeLanguageControls() {
  const script = `
    (function () {
      var root = document.documentElement;
      var path = window.location.pathname;
      var isEnglish = path === "/en/" || path === "/en" || path.indexOf("/en/") === 0;
      var savedTheme = window.localStorage.getItem("theme");
      var prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
      var theme = savedTheme || (prefersDark ? "dark" : "light");
      var themeButton = document.querySelector("[data-theme-toggle]");
      var languageLink = document.querySelector("[data-language-toggle]");
      var header = document.querySelector("[data-site-header]");

      function englishPath(value) {
        if (value === "/") return "/en/";
        if (value.indexOf("/en") === 0) return value;
        return "/en" + value;
      }

      function spanishPath(value) {
        if (value === "/en/" || value === "/en") return "/";
        if (value.indexOf("/en/") === 0) return value.replace(/^\\/en/, "") || "/";
        return value;
      }

      function paint(nextTheme) {
        root.dataset.theme = nextTheme;
        if (themeButton) {
          themeButton.textContent = nextTheme === "dark" ? "Light" : "Dark";
          themeButton.setAttribute("aria-label", nextTheme === "dark" ? "Switch to light mode" : "Switch to dark mode");
        }
      }

      paint(theme);

      if (themeButton) {
        themeButton.addEventListener("click", function () {
          theme = root.dataset.theme === "dark" ? "light" : "dark";
          window.localStorage.setItem("theme", theme);
          paint(theme);
        });
      }

      if (languageLink) {
        languageLink.href = isEnglish ? spanishPath(path) : englishPath(path);
        languageLink.textContent = isEnglish ? "ES" : "EN";
        languageLink.setAttribute("hreflang", isEnglish ? "es-DO" : "en");
      }

      if (header && isEnglish) {
        header.querySelector("[data-brand]").textContent = "Weddings";
        header.querySelector("[data-brand]").href = "/en/";
        header.querySelector("[data-nav-main]").textContent = "Dominican Republic";
        header.querySelector("[data-nav-main]").href = "/en/";
        header.querySelector("[data-nav-punta]").href = "/en/fotografo-bodas-punta-cana/";
        header.querySelector("[data-nav-santo]").href = "/en/fotografo-bodas-santo-domingo/";
        header.querySelector("[data-nav-romana]").href = "/en/fotografo-bodas-la-romana/";
        header.querySelector("[data-nav-book]").textContent = "Book";
        header.querySelector("[data-nav-book]").href = "/en/#contacto";
      }
    })();
  `;

  return (
    <div className="site-controls" aria-label="Opciones del sitio">
      <button className="control-button" type="button" data-theme-toggle aria-label="Switch theme">
        Dark
      </button>
      <a className="control-button" data-language-toggle href="/en/" hrefLang="en">
        EN
      </a>
      <script dangerouslySetInnerHTML={{ __html: script }} />
    </div>
  );
}
