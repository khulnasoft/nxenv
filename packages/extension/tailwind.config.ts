import type { Config } from 'tailwindcss';
import config from '@nxenv/shared/tailwind.config';

module.exports = {
  ...config,
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@nxenv/shared/src/**/*.{js,ts,jsx,tsx}',
  ],
  // eslint-disable-next-line
} satisfies Config;
