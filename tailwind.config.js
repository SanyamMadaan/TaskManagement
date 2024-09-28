/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './(components)/**/*.{js,ts,jsx,tsx,mdx}', // If you have folder names with parentheses
    './node_modules/@shadcn/**/*.{js,ts,jsx,tsx}', // Add this line for shadcn components
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
