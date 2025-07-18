import { createContext } from 'react';
import type { ThemeMode, Theme } from '../types';

export interface ThemeContextType {
  mode: ThemeMode;
  toggleMode: () => void;
  theme: Theme;
}

// Create context
export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
