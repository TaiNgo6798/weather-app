import { createContext } from 'react';

export const ThemeContext = createContext<{theme: 'light' | 'dark' | null, setTheme?: (theme: 'light' | 'dark') => void}>({
    theme: 'light',
});