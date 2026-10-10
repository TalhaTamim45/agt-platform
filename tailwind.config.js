/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#fffdfa',
          100: '#faf7f0',
          150: '#f7f2e7',
          200: '#f4ede1',
          300: '#ece1cf',
          400: '#decdb4',
          500: '#cca982',
        },
        navy: {
          950: '#071224',
          900: '#0c1f3b',
          850: '#11294d',
          800: '#173663',
          700: '#214981',
          600: '#2f60a3',
          500: '#437ac4',
        },
        gold: {
          100: '#fdf9ee',
          200: '#faefd2',
          300: '#f4dfaa',
          400: '#e7c777',
          500: '#c59b4c',
          600: '#aa8135',
          700: '#8c6623',
          800: '#6e4e16',
        },
      },
      fontFamily: {
        sans: ['var(--font-outfit)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'cream-sm': '0 2px 8px -2px rgba(12, 31, 59, 0.05), 0 1px 4px -1px rgba(197, 155, 76, 0.08)',
        'cream-md': '0 12px 30px -10px rgba(12, 31, 59, 0.08), 0 4px 12px -2px rgba(197, 155, 76, 0.12)',
        'cream-xl': '0 24px 50px -15px rgba(12, 31, 59, 0.12), 0 8px 24px -4px rgba(197, 155, 76, 0.18)',
      },
    },
  },
  plugins: [],
};
