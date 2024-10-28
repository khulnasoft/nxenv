import type { Config } from 'tailwindcss'
import config from '@nxenv/shared/tailwind.config';

export default {
  ...config,
  content: [
    './src/**/*.{ts,tsx}',
    './node_modules/@nxenv/shared/src/**/*.{ts,tsx}',
  ],
  safelist: [
    {
      pattern: /^(.*?)/,
    },
  ]
} satisfies Config;
