/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Manrope', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        soft: '0 18px 60px rgba(15, 23, 42, 0.10)',
        glow: '0 0 0 1px rgba(99, 102, 241, 0.10), 0 18px 45px rgba(79, 70, 229, 0.16)'
      }
    }
  },
  plugins: []
};
