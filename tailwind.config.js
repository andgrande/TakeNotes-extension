/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'white-0': 'rgba(255,255,255)',
        'white-100': 'rgba(255,255,255,0.1)',
        'white-900': 'rgba(255,255,255,0.9)',
        'pale-200': 'rgb(242, 239, 229)',
        'pale-300': 'rgb(227, 225, 217)',
        'pale-500': 'rgb(199, 200, 204)',
        'pale-600': 'rgb(180, 180, 184)',
        'pale-700': 'rgb(92, 131, 116)',
        'pale-800': 'rgb(27, 66, 66)',
        'pale-900': 'rgb(9, 38, 53)',
      },
      spacing: {
        '85': '345px',
        '90vh': '90vh',
        '98vh': '98vh',
        'saf': '780px',
      },
      animation: {
        'fadein-out': 'fadein-out 2s',
      }
    },
  },
  plugins: [],
}

