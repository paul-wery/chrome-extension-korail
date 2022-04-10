import { defineConfig } from '@twind/core';
import presetTailwind from '@twind/preset-tailwind';
import presetAutoprefix from '@twind/preset-autoprefix';

export default defineConfig({
  presets: [presetAutoprefix(), presetTailwind()],
  darkMode: 'class',
  theme: {
    fontFamily: {
      serif: ['serif'],
      heading: [
        'var(--font-family-heading)',
        'Inter',
        'SF Pro Text',
        'system-ui',
      ],
      sans: ['var(--font-family-sans)'],
      monospace: [`SF Mono`, `ui-monospace`, `Monaco`, 'Monospace'],
    },
    extend: {
      colors: {
        primary: {
          '50': '#f0f9ff',
          '100': '#e0f2fe',
          '200': '#bae6fd',
          '300': '#7dd3fc',
          '400': '#38bdf8',
          '500': '#0ea5e9',
          '600': '#0284c7',
          '700': '#0369a1',
          '800': '#075985',
          '900': '#0c4a6e',
          '950': '#082f49',
          contrast: '#fff',
        },
        black: {
          50: '#525252',
          100: '#424242',
          200: '#363636',
          300: '#282828',
          400: '#222',
          500: '#141414',
          600: '#0a0a0a',
          700: '#000',
        },
      },
    },
  },
});
