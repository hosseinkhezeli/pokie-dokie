/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx,html}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary-40)',
        'on-primary': 'var(--color-100)',
        'primary-container': 'var(--color-primary-90)',
        'on-primary-container': 'var(--color-primary-10)',
        'primary-fixed': 'var(--color-primary-90)',
        'primary-fixed-dim': 'var(--color-primary-80)',
        'on-primary-fixed': 'var(--color-primary-10)',
        'on-primary-fixed-variant': 'var(--color-primary-30)',
        // _______________________________________________________
        secondary: 'var(--color-secondary-40)',
        'on-secondary': 'var(--color-100)',
        'secondary-container': 'var(--color-secondary-90)',
        'on-secondary-container': 'var(--color-secondary-10)',
        'secondary-fixed': 'var(--color-secondary-90)',
        'secondary-fixed-dim': 'var(--color-secondary-80)',
        'on-secondary-fixed': 'var(--color-secondary-10)',
        'on-secondary-fixed-variant': 'var(--color-secondary-30)',
        // _______________________________________________________
        tertiary: 'var(--color-tertiary-40)',
        'on-tertiary': 'var(--color-100)',
        'tertiary-container': 'var(--color-tertiary-90)',
        'on-tertiary-container': 'var(--color-tertiary-10)',
        'tertiary-fixed': 'var(--color-tertiary-90)',
        'tertiary-fixed-dim': 'var(--color-tertiary-80)',
        'on-tertiary-fixed': 'var(--color-tertiary-10)',
        'on-tertiary-fixed-variant': 'var(--color-tertiary-30)',
        // _______________________________________________________
        error: 'var(--color-error-40)',
        'on-error': 'var(--color-100)',
        'error-container': 'var(--color-error-90)',
        'on-error-container': 'var(--color-error-10)',
        // _______________________________________________________
        surface: 'var(--color-neutral-95)',
        'surface-dim': 'var(--color-neutral-90)',
        'surface-bright': 'var(--color-neutral-98)',
        // _______________________________________________________
        'on-surface': 'var(--color-neutral-10)',
        outline: 'var(--color-neutral-50)',
      },
      borderRadius: {
        md: '12px',
        lg: '16px',
      },
      boxShadow: {
        md: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
        lg: '0 10px 15px rgba(0,0,0,0.1)',
      },
    },
  },
  plugins: [],
};
