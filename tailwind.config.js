/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['index.html', './src/**/*.{js,jsx,ts,tsx,vue,html}'],
  theme: {
    screens: {
      xs: '390px',
      sm: '576px',
      bipSm: '480px',
      bipMd: '800px',
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
