/** Design tokens from the brand brief. */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: 'var(--color-primary)', dark: 'var(--color-primary-dark)', soft: 'var(--color-primary-soft)', cream: 'var(--color-cream)' },
        ink: { DEFAULT: 'var(--color-text)', muted: 'var(--color-muted)' },
        line: 'var(--color-border)',
      },
      fontFamily: {
        display: ['"DM Serif Display"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      borderRadius: { card: '24px' },
      boxShadow: { soft: '0 12px 36px -24px rgba(7,91,53,.22)' },
    },
  },
  plugins: [],
};
