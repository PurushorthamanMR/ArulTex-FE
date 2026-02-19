// Theme Manager Utility
export const ThemeManager = {
  // Initialize theme from localStorage or default to light
  initTheme: () => {
    const savedTheme = localStorage.getItem("themeMode") || "light";
    ThemeManager.applyTheme(savedTheme);
    return savedTheme;
  },

  // Apply theme changes
  applyTheme: (theme) => {
    // Update localStorage
    localStorage.setItem("themeMode", theme);
    
    // Update document attributes
    document.documentElement.setAttribute("data-layout-mode", theme === "dark" ? "dark_mode" : "light_mode");
    document.documentElement.setAttribute("data-layout-style", "default");
    document.documentElement.setAttribute("data-nav-color", theme === "dark" ? "dark" : "light");
    
    // Update body class
    if (theme === "dark") {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  },

  // Toggle between light and dark themes
  toggleTheme: () => {
    const currentTheme = localStorage.getItem("themeMode") || "light";
    const newTheme = currentTheme === "light" ? "dark" : "light";
    ThemeManager.applyTheme(newTheme);
    return newTheme;
  },

  // Get current theme
  getCurrentTheme: () => {
    return localStorage.getItem("themeMode") || "light";
  }
}; 