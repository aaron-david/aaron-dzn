import { useEffect, useState } from 'react';
import type { LanguageCode } from '@/data/site';

type ThemeMode = 'light' | 'dark';

type ThemeToggleProps = {
  language: LanguageCode;
};

const storageKey = 'aarondzn-theme';

const labels: Record<
  LanguageCode,
  {
    light: string;
    dark: string;
    toLight: string;
    toDark: string;
  }
> = {
  'pt-BR': {
    light: 'Claro',
    dark: 'Escuro',
    toLight: 'Alternar para modo claro',
    toDark: 'Alternar para modo escuro'
  },
  en: {
    light: 'Light',
    dark: 'Dark',
    toLight: 'Switch to light mode',
    toDark: 'Switch to dark mode'
  },
  es: {
    light: 'Claro',
    dark: 'Oscuro',
    toLight: 'Cambiar al modo claro',
    toDark: 'Cambiar al modo oscuro'
  },
  nl: {
    light: 'Licht',
    dark: 'Donker',
    toLight: 'Schakel naar lichte modus',
    toDark: 'Schakel naar donkere modus'
  }
};

function getPreferredTheme(): ThemeMode {
  const storedTheme = window.localStorage.getItem(storageKey);

  if (storedTheme === 'light' || storedTheme === 'dark') {
    return storedTheme;
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme: ThemeMode) {
  document.documentElement.dataset.theme = theme;
}

export function ThemeToggle({ language }: ThemeToggleProps) {
  const [theme, setTheme] = useState<ThemeMode>('light');
  const copy = labels[language];
  const isDark = theme === 'dark';

  useEffect(() => {
    const preferredTheme = getPreferredTheme();
    applyTheme(preferredTheme);
    setTheme(preferredTheme);
  }, []);

  function handleToggle() {
    const nextTheme = isDark ? 'light' : 'dark';

    applyTheme(nextTheme);
    window.localStorage.setItem(storageKey, nextTheme);
    setTheme(nextTheme);
  }

  return (
    <button
      aria-label={isDark ? copy.toLight : copy.toDark}
      aria-pressed={isDark}
      className={`theme-toggle theme-toggle-${theme}`}
      onClick={handleToggle}
      title={isDark ? copy.toLight : copy.toDark}
      type="button"
    >
      <span className="theme-toggle-track" aria-hidden="true">
        <span className="theme-toggle-thumb" />
      </span>
      <span className="theme-toggle-label">{isDark ? copy.dark : copy.light}</span>
    </button>
  );
}
