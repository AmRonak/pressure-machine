/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      backgroundColor:{
        'primary': '#4218EF',
        'primaryDark': '#393185',
        'background-input': 'linear-gradient(to right, #ffffff, #f2f2f2, #e5e5e5, #d9d9d9, #cccccc)'
      },
      colors: {
        'inputBlack': '#2B2A29',
        'primary': '#4218EF',
        'primaryDark': '#393185',
      }
    },
  },
  plugins: [],
};
