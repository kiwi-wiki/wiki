/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        gray: {
          50: '#FAFAFA',
          100: '#F4F4F5',
          200: '#E4E4E7',
          300: '#D4D4D8',
          400: '#A1A1AA',
          500: '#71717A',
          600: '#52525B',
          700: '#3F3F46',
          800: '#27272A',
          900: '#18181B',
          950: '#0F0F12',
        },
      },
      boxShadow: {
        dialog: '0 16px 70px rgba(0, 0, 0, 0.2);',
      },
      keyframes: {
        dialogShow: {
          '0%': { opacity: 0, transform: ' translateY(10px) scale(0.96)' },
          '100%': { opacity: 1, transform: ' translateY(0) scale(1)' },
        },

        overlay: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
      animation: {
        dialogShow: 'dialogShow 0.15s ease-out',
        overlay: 'overlay 0.15s ease-out',
      },
    },
  },
  plugins: [],
};
