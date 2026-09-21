import { createContext, useContext } from 'react';

export type ThemeProviderState = {
    theme: 'light' | 'dark';
    toggleTheme: () => void;
};

export const initialState: ThemeProviderState = {
    theme: 'light',
    toggleTheme: () => null,
};

// This file contains NO components, so it won't trigger the warning
export const ThemeProviderContext =
    createContext<ThemeProviderState>(initialState);

export const useTheme = () => {
    const context = useContext(ThemeProviderContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
