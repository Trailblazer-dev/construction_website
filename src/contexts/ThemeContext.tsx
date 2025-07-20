import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

// Define theme types
export type ThemeMode = 'light' | 'dark';

export interface Theme {
  mode: ThemeMode;
  colors: {
    primary: ColorShades;
    accent: ColorShades;
    earth: ColorShades;
    success: ColorShades;
    warning: ColorShades;
    danger: ColorShades;
    background: {
      light: string;
      dark: string;
    };
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
  };
  typography: {
    heading: string;
    body: string;
  };
  breakpoints: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
  };
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
    full: string;
  };
  animation: {
    fast: string;
    normal: string;
    slow: string;
  };
  shadows: Record<string, string>;
}

interface ColorShades {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
}

export interface ThemeContextType {
  mode: ThemeMode;
  toggleMode: () => void;
  theme: Theme;
}

// Create the context
export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Custom hook for using the theme
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [mode, setMode] = useState<ThemeMode>(() => {
    // Check for saved theme preference or use browser preference
    const savedMode = localStorage.getItem('theme-mode');
    if (savedMode === 'dark' || savedMode === 'light') {
      return savedMode;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    // Apply theme to document
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(mode);
    
    // Save to localStorage
    localStorage.setItem('theme-mode', mode);
    
    // Set CSS variables
    Object.entries(designTokens.spacing).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--theme-spacing-${key}`, value);
    });
    
    Object.entries(designTokens.radius).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--theme-radius-${key}`, value);
    });
    
    Object.entries(designTokens.transitions).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--theme-transition-${key}`, value);
    });
    
    Object.entries(designTokens.fonts).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--theme-font-family-${key}`, value);
    });
  }, [mode]);

  const toggleMode = () => {
    setMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const value: ThemeContextType = {
    mode,
    toggleMode,
    theme: {
      mode,
      colors: {
        primary: designTokens.colors.primary,
        accent: designTokens.colors.accent,
        earth: designTokens.colors.earth,
        success: {
          50: '#ECFDF5',
          100: '#D1FAE5',
          200: '#A7F3D0',
          300: '#6EE7B7',
          400: '#34D399',
          500: '#10B981',
          600: '#059669',
          700: '#047857',
          800: '#065F46',
          900: '#064E3B',
        },
        warning: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
        },
        danger: {
          50: '#FEF2F2',
          100: '#FEE2E2',
          200: '#FECACA',
          300: '#FCA5A5',
          400: '#F87171',
          500: '#EF4444',
          600: '#DC2626',
          700: '#B91C1C',
          800: '#991B1B',
          900: '#7F1D1D',
        },
        background: {
          light: '#FFFFFF',
          dark: '#121212',
        },
      },
      spacing: designTokens.spacing,
      typography: {
        heading: designTokens.fonts.heading,
        body: designTokens.fonts.body
      },
      breakpoints: {
        xs: '320px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
      borderRadius: {
        sm: designTokens.radius.sm,
        md: designTokens.radius.md,
        lg: designTokens.radius.lg,
        full: designTokens.radius.full,
      },
      animation: {
        fast: designTokens.transitions.fast,
        normal: designTokens.transitions.normal,
        slow: designTokens.transitions.slow,
      },
      shadows: designTokens.shadows
    }
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

// Design tokens
const designTokens = {
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
  },
  colors: {
    primary: {
      50: '#EFF6FF',
      100: '#DBEAFE',
      200: '#BFDBFE',
      300: '#93C5FD',
      400: '#60A5FA',
      500: '#3B82F6',
      600: '#2563EB',
      700: '#1D4ED8',
      800: '#1E3A8A', // Main brand color
      900: '#1E3A5F',
    },
    accent: {
      50: '#FFF7ED',
      100: '#FFEDD5',
      200: '#FED7AA',
      300: '#FDBA74',
      400: '#FB923C',
      500: '#F97316', // Main accent
      600: '#EA580C',
      700: '#C2410C',
      800: '#9A3412',
      900: '#7C2D12',
    },
    earth: {
      50: '#F9FAFB',
      100: '#F3F4F6',
      200: '#E5E7EB',
      300: '#D1D5DB',
      400: '#9CA3AF',
      500: '#6B7280',
      600: '#4B5563',
      700: '#374151',
      800: '#1F2937',
      900: '#111827',
    },
  },
  fonts: {
    heading: 'Montserrat, sans-serif',
    body: 'Inter, Roboto, sans-serif',
  },
  shadows: {
    card: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
    'card-hover': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    dropdown: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    'button-3d': '0 2px 0 rgba(0, 0, 0, 0.1)',
    'button-active': '0 0 0 rgba(0, 0, 0, 0.1), inset 0 2px 4px rgba(0, 0, 0, 0.1)',
    construction: '0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.1)',
  },
  transitions: {
    fast: '0.15s',
    normal: '0.3s',
    slow: '0.5s',
    ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
  radius: {
    sm: '0.125rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    full: '9999px',
  },
};
