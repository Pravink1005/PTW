/** Design tokens from the brand brief. */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: '#16834A', dark: '#075B35', soft: '#E9F6E9', cream: '#FFFDF5' },
        ink: { DEFAULT: '#24332B', muted: '#647067' },
        line: '#E1EAE2',
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'system-ui', 'sans-serif'],
        sans: ['Figtree', 'system-ui', 'sans-serif'],
      },
      borderRadius: { card: '1.5rem' },
      boxShadow: { soft: '0 6px 24px -8px rgba(7,91,53,.14)' },
    },
  },
  plugins: [],
};
