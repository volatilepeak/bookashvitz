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
          50: '#f2f7f2',
          100: '#dce8dc',
          200: '#b5cfb5',
          300: '#7aaa7a',
          400: '#4d8a4d',
          500: '#2d6b2d',
          600: '#1e5520',
          700: '#174218',
          800: '#112e12',
          900: '#0b1f0c',
          950: '#061108',
        },
        warm: {
          50: '#fdfcfa',
          100: '#f8f4ed',
          200: '#f0e9db',
          300: '#e2d5c0',
          400: '#cdb99a',
          500: '#b8a07a',
        },
        ember: {
          50: '#fef8f0',
          100: '#fdecd4',
          200: '#fad5a5',
          300: '#f5b56b',
          400: '#ef8f32',
          500: '#e47515',
          600: '#c55a0c',
          700: '#a3430e',
          800: '#843613',
          900: '#6c2e13',
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
