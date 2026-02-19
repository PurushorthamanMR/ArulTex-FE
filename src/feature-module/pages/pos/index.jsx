import React, { useEffect, useState } from 'react';
import { ThemeManager } from '../../../core/utils/themeManager';
// ... existing imports ...

const Pos = () => {
  const [darkMode, setDarkMode] = useState(ThemeManager.getCurrentTheme() === 'dark');

  useEffect(() => {
    // Initialize theme
    const currentTheme = ThemeManager.initTheme();
    setDarkMode(currentTheme === 'dark');

    // Listen for theme changes
    const handleThemeChange = () => {
      const newTheme = ThemeManager.getCurrentTheme();
      setDarkMode(newTheme === 'dark');
    };

    window.addEventListener('storage', handleThemeChange);
    return () => window.removeEventListener('storage', handleThemeChange);
  }, []);

  const toggleDarkMode = () => {
    const newTheme = ThemeManager.toggleTheme();
    setDarkMode(newTheme === 'dark');
  };

  // ... rest of your component code ...
  
  return (
    <div className={`pos-container ${darkMode ? 'dark-mode' : ''}`}>
      {/* ... existing JSX ... */}
    </div>
  );
};

export default Pos; 