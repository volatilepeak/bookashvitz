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
        brand: {
          50: '#fdf5f2',
          100: '#fbe8e1',
          200: '#f7cfc2',
          300: '#f0ab95',
          400: '#e6805f',
          500: '#d4603e',
          600: '#c04a2b',
          700: '#a03b22',
          800: '#843220',
          900: '#6d2d1f',
        },
        neutral: {
          925: '#131211',
          950: '#0a0908',
        },
        warm: {
          50: '#faf9f7',
          100: '#f5f3ef',
          200: '#eae7e0',
          300: '#d9d4ca',
          400: '#b8b1a4',
          500: '#9a9184',
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
