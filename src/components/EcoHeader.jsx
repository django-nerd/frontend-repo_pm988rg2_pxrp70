import { useEffect } from 'react';
import { Leaf, Sun, Moon } from 'lucide-react';

function useTheme() {
  const setTheme = (isDark) => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const init = () => {
    const stored = localStorage.getItem('theme');
    if (stored) {
      setTheme(stored === 'dark');
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark);
    }
  };

  useEffect(() => {
    init();
    // Listen for system changes
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e) => {
      const stored = localStorage.getItem('theme');
      if (!stored) setTheme(e.matches);
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return { setTheme };
}

export default function EcoHeader({ theme, setThemeState }) {
  const { setTheme } = useTheme();

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next === 'dark');
    setThemeState(next);
  };

  return (
    <header className="w-full sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/80 dark:bg-neutral-900/80 border-b border-neutral-200 dark:border-neutral-800">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-emerald-200/70 dark:bg-emerald-400/20 grid place-items-center">
            <Leaf className="text-emerald-700 dark:text-emerald-300" size={22} />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 tracking-tight">EcoEcho</h1>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 -mt-0.5">Track actions. Amplify impact.</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="inline-flex items-center gap-2 rounded-full border border-neutral-200 dark:border-neutral-700 px-3 py-1.5 text-sm text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            <span className="hidden sm:block">{theme === 'dark' ? 'Light' : 'Dark'} mode</span>
          </button>
        </div>
      </div>
    </header>
  );
}
