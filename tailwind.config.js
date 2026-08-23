export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Cormorant Garamond', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif']
      },
      colors: {
        gold: '#bfa56a',
        red: '#d11f26',
        redSoft: '#fbebeb',
        black: '#0b0b0e',
        slate: {
          950: '#020617'
        }
      },
      boxShadow: {
        luxe: '0 30px 80px rgba(15, 23, 42, 0.16)',
        glow: '0 0 70px rgba(209, 31, 38, 0.18)'
      },
      backgroundImage: {
        'hero-gradient': 'radial-gradient(circle at top left, rgba(209, 31, 38, 0.16), transparent 20%), radial-gradient(circle at bottom right, rgba(15, 15, 15, 0.14), transparent 30%)'
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' }
        }
      },
      animation: {
        marquee: 'marquee 28s linear infinite'
      }
    }
  },
  plugins: []
};
