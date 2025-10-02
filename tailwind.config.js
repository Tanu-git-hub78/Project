/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  safelist: [
    'bg-blue-100',
    'text-blue-600',
    'bg-purple-100', 
    'text-purple-600',
    'bg-green-100',
    'text-green-600',
    'bg-red-100',
    'text-red-600',
    'bg-yellow-100',
    'text-yellow-600',
    'bg-orange-100',
    'text-orange-600',
    'bg-indigo-100',
    'text-indigo-600'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
