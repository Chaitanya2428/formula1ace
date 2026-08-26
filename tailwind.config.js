/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        f1: {
          red: '#E10600',
          'red-light': '#FF2A2A',
          'red-dark': '#9B0000',
          black: '#0A0A0B',
          carbon: '#15151E',
          dark: '#0F0F11',
          grey: '#26262A',
          'grey-light': '#303030',
          silver: '#A8A8A8',
          white: '#FFFFFF',
        },
      },
      fontFamily: {
        display: ['"Titillium Web"', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'car-drive': 'carDrive 2.2s cubic-bezier(0.34,1.56,0.64,1) forwards',
        'drift-in': 'driftIn 1.6s cubic-bezier(0.22,1,0.36,1) forwards',
        'drift-out': 'driftOut 0.9s cubic-bezier(0.5,0,0.75,0) forwards',
        'countdown-pop': 'countdownPop 0.9s ease-out forwards',
        'glow-pulse': 'glowPulse 2.5s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
        'float': 'float 4s ease-in-out infinite',
        'flag-wave': 'flagWave 1.5s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        carDrive: {
          '0%': { transform: 'translateX(-110%) scaleX(1)' },
          '60%': { transform: 'translateX(45%) scaleX(1)' },
          '85%': { transform: 'translateX(65%) scaleX(0.96)' },
          '100%': { transform: 'translateX(120%) scaleX(1.1)' },
        },
        driftIn: {
          '0%': { transform: 'translateX(-120%) rotate(0deg)' },
          '40%': { transform: 'translateX(10%) rotate(-18deg)' },
          '70%': { transform: 'translateX(30%) rotate(-12deg)' },
          '100%': { transform: 'translateX(38%) rotate(-14deg)' },
        },
        driftOut: {
          '0%': { transform: 'translateX(38%) rotate(-14deg)' },
          '30%': { transform: 'translateX(50%) rotate(-22deg)' },
          '100%': { transform: 'translateX(130%) rotate(-8deg)' },
        },
        countdownPop: {
          '0%': { opacity: '0', transform: 'scale(0.3)' },
          '40%': { opacity: '1', transform: 'scale(1.15)' },
          '100%': { opacity: '0', transform: 'scale(2)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 12px rgba(225,6,0,0.3)' },
          '50%': { boxShadow: '0 0 24px rgba(225,6,0,0.6)' },
        },
        flagWave: {
          '0%, 100%': { transform: 'skewX(-8deg) rotate(-2deg)' },
          '50%': { transform: 'skewX(8deg) rotate(2deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};
