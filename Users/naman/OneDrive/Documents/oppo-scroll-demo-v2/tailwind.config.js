/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', '"Segoe UI"', 'sans-serif'],
        display: ['Fraunces', 'Georgia', 'serif'],
        mono: ['"Space Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      colors: {
        paper: '#FAF8F3',
        ink: '#1B1B18',
        muted: '#6F6E68',
        line: '#E4E2D8',
        pine: '#2E5C4F',
        sage: '#9CAF88',
        coal: '#141412',
      },
    },
  },
  plugins: [],
}

