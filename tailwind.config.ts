import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
        },
        dark: {
          50: '#f9fafb',
          100: '#f3f4f6',
          900: '#111827',
        },
      },
      animation: {
        'pulse-ring': 'pulse-ring 2s infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        'pulse-ring': {
          '0%': { boxShadow: '0 0 0 0 rgba(14, 165, 233, 0.7)' },
          '70%': { boxShadow: '0 0 0 30px rgba(14, 165, 233, 0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(14, 165, 233, 0)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      boxShadow: {
        'card': '0 10px 30px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 20px 40px rgba(0, 0, 0, 0.15)',
      },
    },
  },
  plugins: [],
}
export default config
