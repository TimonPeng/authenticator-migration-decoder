import { nextui } from '@nextui-org/react';
import { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}', './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      // px-4
      padding: '1rem',
    },
    extend: {},
  },
  plugins: [nextui()],
  corePlugins: {
    preflight: true,
  },
  darkMode: 'class',
} satisfies Config;
