/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#f0f5f0',
          100: '#d9e8d9',
          200: '#b3d1b3',
          300: '#6b9e6b',
          400: '#4a7c4a',
          500: '#2d5a2d',
          600: '#1e4620',
          700: '#163518',
          800: '#0f2510',
          900: '#0a1a0b',
        },
        warm: {
          50: '#fdfcfa',
          100: '#f8f5f0',
          200: '#f0ebe0',
          300: '#e5ddd0',
          400: '#d4c9b8',
          500: '#b8a992',
        },
        slate: {
          350: '#99a3af',
        },
        stone: {
          350: '#a8a29e',
        },
      },
      fontFamily: {
        display: ['Georgia', 'Cambria', 'Times New Roman', 'serif'],
        body: ['system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
