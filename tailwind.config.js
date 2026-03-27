/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['"Hind"', 'sans-serif'],
        devanagari: ['"Noto Serif Devanagari"', 'serif'],
      },
      colors: {
        gold: {
          50: '#fdf9ec',
          100: '#faf0cc',
          200: '#f5de95',
          300: '#efc558',
          400: '#e9ad2d',
          500: '#d4921c',
          600: '#b97116',
          700: '#975217',
          800: '#7c411a',
          900: '#683618',
        },
        maroon: {
          50: '#fff1f2',
          100: '#ffe4e6',
          200: '#fecdd3',
          300: '#fda4af',
          400: '#fb7185',
          500: '#8B0000',
          600: '#7a0000',
          700: '#6b0000',
          800: '#5c0000',
          900: '#4d0000',
        },
        cream: '#FFF8E7',
        saffron: '#FF9933',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
    },
  },
  plugins: [],
}
