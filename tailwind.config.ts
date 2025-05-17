import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        dana: ['var(--font-dana)', 'sans-serif'],
      },
      fontSize: {
        titleXl: ['20px', { lineHeight: '100%', fontWeight: '500' }],
        titleLg: ['18px', { lineHeight: '100%', fontWeight: '500' }],
        titleMd: ['16px', { lineHeight: '100%', fontWeight: '500' }],
        titleSm: ['14px', { lineHeight: '100%', fontWeight: '500' }],
        bodyMd: ['16px', { lineHeight: '100%', fontWeight: '400' }],
        bodySm: ['14px', { lineHeight: '100%', fontWeight: '400' }],
        bodyXs: ['12px', { lineHeight: '100%', fontWeight: '400' }],
      },
      colors: {
        primary: 'var(--color-brand)',
        error: 'var(--color-error)',
        icon: {
          gray: 'var(--color-gray)',
        },
        background: {
          lowest: 'var(--color-lowest)',
          low: 'var(--color-low)',
        },
        surface: {
          disabled: 'var(--color-surface-disabled)',
          caution: 'var(--color-surface-caution)',
          error: 'var(--color-surface-error)',
          info: 'var(--color-surface-info)',
        },
        text: {
          primary: 'var(--color-text-black)',
          secondary: 'var(--color-gray)',
          disabled: 'var(--color-text-disabled)',
          contrast: 'var(--color-lowest)',
        },
        border: {
          primary: 'var(--color-border-default)',
          disabled: 'var(--color-border-disabled)',
        },
      },
      boxShadow: {
        high: '0px 0px 5px 0px #00000033',
        medium: '0px 0px 5px 0px #00000026',
        low: '0px 0px 5px 0px #0000001A',
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-in-out forwards',
        'fade-out': 'fadeOut 0.3s ease-in-out forwards',
        'slide-up': 'slideUp 0.3s ease forwards',
        'slide-down': 'slideDown 0.3s ease forwards',
        'slide-down-fade': 'slideDownWithFade 0.3s ease forwards',
        grow: 'grow 0.15s ease forwards',
        wave: 'waveMove 25s ease-in-out infinite',
        hovering: 'hovering 3s ease infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0%)' },
        },
        waveMove: {
          '0%, 100%': {
            transform: 'translateX(0) skew(0deg) scale(1.5)',
            opacity: '1',
          },
          '50%': {
            transform: 'translateX(2%) skew(15deg) scale(1.4)',
            opacity: '0.8',
          },
        },
        slideDown: {
          '0%': { transform: 'translateY(0%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        slideDownWithFade: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(0%)', opacity: '1' },
        },
        grow: {
          '0%': { transform: 'scale(0)' },
          '100%': { transform: 'scale(1)' },
        },
        hovering: {
          '0% ,100%': { transform: 'translate(-8%,0%)' },
          '25%': { transform: 'translate(0%,8%)' },
          '50%': { transform: 'translate(8%,0%)' },
          '75%': { transform: 'translate(0%,-8%)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
