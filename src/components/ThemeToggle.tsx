import { useEffect } from 'react';

import { Sun, Moon } from '@phosphor-icons/react';

import { type themes, useThemeStore } from '../store/store';

const ThemeToggle = () => {
  const theme = useThemeStore((state) => state.theme);
  const setTheme = useThemeStore((state) => state.setTheme);

  useEffect(() => {
    document.querySelector('html')?.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <button
      className='btn mr-4'
      onClick={(e) => {
        const child = e.currentTarget.firstChild;
        if (child instanceof SVGElement) {
          setTheme(child.dataset.value as themes);
        }
      }}
    >
      {theme === 'corporate' ? (
        <Moon
          size={20}
          data-value='business'
        />
      ) : (
        <Sun
          size={20}
          data-value='corporate'
        />
      )}
    </button>
  );
};

export default ThemeToggle;
