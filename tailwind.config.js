/** Design tokens from the brand brief. */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: '#2D6A4F', dark: '#193C30', soft: '#E7F0E8', cream: '#F7F8F3' },
        ink: { DEFAULT: '#1F3028', muted: '#58675E' },
        line: '#D8E2D9',
      },
      fontFamily: {
        display: ['"DM Serif Display"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      borderRadius: { card: '4px' },
      boxShadow: { soft: '0 8px 24px -16px rgba(25,60,48,.24)' },
    },
  },
  plugins: [],
};
