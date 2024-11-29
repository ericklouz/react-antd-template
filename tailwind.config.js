import { COLORS } from './src/config';
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: COLORS.primary[50],
          100: COLORS.primary[100],
          200: COLORS.primary[200],
          300: COLORS.primary[300],
          400: COLORS.primary[400],
          500: COLORS.primary[500],
          600: COLORS.primary[600],
          700: COLORS.primary[700],
          800: COLORS.primary[800],
          900: COLORS.primary[900],
          950: COLORS.primary[950]
        },
        secondary: {
          50: COLORS.secondary[50],
          100: COLORS.secondary[100],
          200: COLORS.secondary[200],
          300: COLORS.secondary[300],
          400: COLORS.secondary[400],
          500: COLORS.secondary[500],
          600: COLORS.secondary[600],
          700: COLORS.secondary[700],
          800: COLORS.secondary[800],
          900: COLORS.secondary[900],
          950: COLORS.secondary[950]
        },
        grey: {
          50: COLORS.grey[50],
          100: COLORS.grey[100],
          200: COLORS.grey[200],
          300: COLORS.grey[300],
          400: COLORS.grey[400],
          500: COLORS.grey[500],
          600: COLORS.grey[600],
          700: COLORS.grey[700],
          800: COLORS.grey[800],
          900: COLORS.grey[900],
          950: COLORS.grey[950]
        },
        dark: {
          50: COLORS.dark[50],
          100: COLORS.dark[100],
          200: COLORS.dark[200],
          300: COLORS.dark[300],
          400: COLORS.dark[400],
          500: COLORS.dark[500],
          600: COLORS.dark[600],
          700: COLORS.dark[700],
          800: COLORS.dark[800],
          900: COLORS.dark[900],
          950: COLORS.dark[950]
        }
      },
      screens: {
      xs: '0px',      // Opcional: Definir explícitamente un rango para XS
      sm: '576px',    // Small - Bootstrap sm
      md: '768px',    // Medium - Bootstrap md
      lg: '992px',    // Large - Bootstrap lg
      xl: '1200px',   // Extra Large - Bootstrap xl
      '2xl': '1400px' // Extra Extra Large - Bootstrap xxl
    },
    }
  },
  plugins: [],
  corePlugins: {
    preflight: false
  },
  important: true
};
