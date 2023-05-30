/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
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
