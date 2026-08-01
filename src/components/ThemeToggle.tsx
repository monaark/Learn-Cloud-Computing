import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { ThemeMode } from '../types';

interface ThemeToggleProps {
  onThemeChange?: (theme: ThemeMode) => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ onThemeChange }) => {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('cloud-theme');
      if (saved === 'light' || saved === 'dark') return saved;
    }
    return 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('cloud-theme', theme);
    if (onThemeChange) {
      onThemeChange(theme);
    }
  }, [theme, onThemeChange]);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      id="theme-toggle-btn"
      type="button"
      className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg border text-sm font-medium transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
      style={{
        backgroundColor: 'var(--bg-card)',
        borderColor: 'var(--border-main)',
        color: 'var(--text-main)',
      }}
      title={theme === 'dark' ? 'Alternar para Modo Claro' : 'Alternar para Modo Escuro'}
      aria-label="Alternar tema da interface"
    >
      {theme === 'dark' ? (
        <>
          <Sun className="w-4 h-4 text-emerald-400 animate-spin-once" />
          <span className="hidden sm:inline font-mono text-xs">Light Mode</span>
        </>
      ) : (
        <>
          <Moon className="w-4 h-4 text-emerald-600 animate-spin-once" />
          <span className="hidden sm:inline font-mono text-xs">Dark Mode</span>
        </>
      )}
    </button>
  );
};
