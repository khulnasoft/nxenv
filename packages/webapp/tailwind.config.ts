import type { Config } from 'tailwindcss';
import config from '@nxenv/shared/tailwind.config';
import path from 'path';
import * as fs from 'fs';

export default {
  ...config,
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    path.join(
      fs.realpathSync('./node_modules/@nxenv/shared/src'),
      '**/*.{js,ts,jsx,tsx}',
    ),
  ],
  // eslint-disable-next-line
} satisfies Config;
