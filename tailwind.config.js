/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html'],
  theme: {
    extend: {
      colors: {
        brand: '#4BA3D4',
        'brand-dark': '#0A2540',
        'brand-hover': '#3a8fc0',
        accent: '#00C49A',
        navy: '#061729',
        'light-bg': '#F5F7FA',
        'muted': '#7BA7CC',
        'border-c': '#EAECF0',
      },
      fontFamily: {
        display: ['Inter', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
    }
  },
  plugins: [],
}
