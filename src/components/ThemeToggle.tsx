import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-2 rounded-lg bg-white/10 dark:bg-black/10 backdrop-blur-sm border border-white/20 dark:border-gray-600 hover:bg-white/20 dark:hover:bg-black/20 transition-all duration-200 touch-manipulation"
      aria-label={theme === 'light' ? t.darkMode : t.lightMode}
    >
      {theme === 'light' ? (
        <Moon size={14} className="sm:w-4 sm:h-4 text-gray-700 dark:text-gray-300" />
      ) : (
        <Sun size={14} className="sm:w-4 sm:h-4 text-yellow-500" />
      )}
    </button>
  );
};

export default ThemeToggle;