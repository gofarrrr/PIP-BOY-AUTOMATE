import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Theme = 'pipboy' | 'clean';

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
    setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = 'pip-boy-theme';

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [theme, setThemeState] = useState<Theme>(() => {
        // Check localStorage for saved preference
        const saved = localStorage.getItem(THEME_STORAGE_KEY);
        if (saved === 'pipboy' || saved === 'clean') {
            return saved;
        }
        // Default to clean (modern/optimistic) theme
        return 'clean';
    });

    // Apply theme to document
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem(THEME_STORAGE_KEY, theme);
    }, [theme]);

    const toggleTheme = () => {
        setThemeState(prev => prev === 'pipboy' ? 'clean' : 'pipboy');
    };

    const setTheme = (newTheme: Theme) => {
        setThemeState(newTheme);
    };

    // Expose API for easter egg/external triggers
    useEffect(() => {
        (window as any).__THEME_API__ = { setTheme };
    }, [setTheme]);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

// Helper to check if we're in clean mode
export const useIsCleanTheme = (): boolean => {
    const { theme } = useTheme();
    return theme === 'clean';
};
