/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'image-with-gradient': `
          linear-gradient(90deg, rgba(14, 86, 46, 0.56) 0.31%, rgba(14, 86, 46, 0.24) 33.46%, rgba(149, 227, 71, 0.21) 66.61%, rgba(149, 227, 71, 0.30) 99.77%),
          url('assets/images/Groups.png')
        `,
      },
    },
  },
  plugins: [],
};
