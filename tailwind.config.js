/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary - Green from logo
        primary: {
          50: '#F3FAE7',
          100: '#E6F5CF',
          200: '#CEEBA0',
          300: '#AED970',
          400: '#92CC44',
          500: '#76b82a', // Bright green from logo
          600: '#5a9020', // Darker green variant
          700: '#47721A',
          800: '#345415',
          900: '#273F10',
        },
        // Secondary - Deep teal/blue from logo
        secondary: {
          50: '#EDF6F9',
          100: '#D0E7EE',
          200: '#A6D3DE',
          300: '#7CBCCE',
          400: '#52A5BE',
          500: '#286b7e', // Deep teal/blue from logo (#286b7e)
          600: '#215a6b', // Darker teal/blue variant
          700: '#1c5969',
          800: '#153e4a',
          900: '#0e2b34',
        },
        // Accent - Yellow/gold from logo
        accent: {
          50: '#FEFAED',
          100: '#FEF5DB',
          200: '#FCEAB8',
          300: '#FADF94',
          400: '#F9D46F',
          500: '#f7c948', // Yellow/gold from logo
          600: '#e5b730', // Darker yellow/gold variant
          700: '#C89B18',
          800: '#9A7813',
          900: '#735A0E',
        },
        // Additional Construction-themed colors
        asphalt: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
        },
        charcoal: {
          50: '#F5F5F5',
          100: '#EBEBEB',
          200: '#D6D6D6',
          300: '#C2C2C2',
          400: '#ADADAD',
          500: '#999999',
          600: '#666666',
          700: '#444444',
          800: '#333333',
          900: '#222222', // Dark gray/black from logo
        },
        // Signaling colors
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
        // Construction-specific highlights
        emerald: {
          300: '#6EE7B7',
          400: '#34D399',
          500: '#10B981',
          600: '#059669',
          700: '#047857',
        },
        teal: {
          300: '#5EEAD4',
          400: '#2DD4BF',
          500: '#14B8A6',
          600: '#0D9488',
          700: '#0F766E',
        },
        neon: {
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
        }
      },
      fontFamily: {
        heading: ['Montserrat', 'sans-serif'],
        body: ['Inter', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'dropdown': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'button-3d': '0 2px 0 rgba(0, 0, 0, 0.1)',
        'button-active': '0 0 0 rgba(0, 0, 0, 0.1), inset 0 2px 4px rgba(0, 0, 0, 0.1)',
        'construction': '0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.1)',
        'admin': '0 4px 10px -2px rgba(10, 180, 129, 0.2)',
        'project-manager': '0 4px 10px -2px rgba(245, 158, 11, 0.2)',
        'engineer': '0 4px 10px -2px rgba(20, 184, 166, 0.2)',
        'driver': '0 4px 10px -2px rgba(219, 119, 6, 0.2)',
        'client': '0 4px 10px -2px rgba(5, 150, 105, 0.1)',
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in',
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'slide-in-left': 'slideInLeft 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
    },
  },
  
    
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
