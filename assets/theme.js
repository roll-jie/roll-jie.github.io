(() => {
  const storageKey = "roll-jie-theme";
  const root = document.documentElement;

  function applyTheme(theme) {
    if (theme === "light" || theme === "dark") {
      root.dataset.theme = theme;
    } else {
      delete root.dataset.theme;
    }
  }

  try {
    applyTheme(localStorage.getItem(storageKey));
  } catch {
    // Keep the system preference if browser storage is unavailable.
  }

  document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("theme");
    const systemDark = matchMedia("(prefers-color-scheme: dark)");
    const isDark = () => root.dataset.theme ? root.dataset.theme === "dark" : systemDark.matches;

    function updateToggle() {
      const dark = isDark();
      toggle.setAttribute("aria-pressed", String(dark));
      toggle.title = dark ? "切换到浅色" : "切换到深色";
    }

    updateToggle();
    toggle.hidden = false;
    systemDark.addEventListener("change", updateToggle);

    toggle.addEventListener("click", () => {
      const theme = isDark() ? "light" : "dark";
      applyTheme(theme);
      updateToggle();
      try {
        localStorage.setItem(storageKey, theme);
      } catch {
        // The selection still applies to this page.
      }
    });
  });
})();
