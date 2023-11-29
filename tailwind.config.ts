import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'um-navy-blue': '#162b48',
        'um-powder-blue': '#006ba6',
        'um-red': '#cc092f',
      },
    },
  },
  plugins: [],
};
export default config;
