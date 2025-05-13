/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Habilitar el modo oscuro
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: {
          50: 'var(--color-cream-50)',
          100: 'var(--color-cream-100)',
          200: 'var(--color-cream-200)',
          300: 'var(--color-cream-300)',
          400: 'var(--color-cream-400)',
          500: 'var(--color-cream-500)',
        },
        gold: {
          400: 'var(--color-gold-400)',
          500: 'var(--color-gold-500)',
          600: 'var(--color-gold-600)',
        },
        dark: {
          bg: '#1e1e1e',
          text: '#e4e4e7',
          accent: '#6b7280',
        },
      },
      fontFamily: {
        serif: ['Cinzel', 'serif'],
        display: ['Metamorphous', 'serif'],
        body: ['Playfair Display', 'serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'parallax-slow': 'parallax 15s linear infinite',
      },
      keyframes: {
        parallax: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-50%)' },
        },
      },
      transitionDuration: {
        '3000': '3000ms',
        '4000': '4000ms',
      },
      backgroundImage: {
        'roman-pattern': "url('https://images.pexels.com/photos/7794435/pexels-photo-7794435.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
        'marble-texture': "url('https://images.pexels.com/photos/7319307/pexels-photo-7319307.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
      },
    },
  },
  plugins: [],
};