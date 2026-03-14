import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        cabo: {
          ocean: '#0077B6',
          'ocean-deep': '#023E8A',
          'ocean-light': '#00B4D8',
          turquoise: '#48CAE4',
          sky: '#90E0EF',
          sand: '#F4E8C1',
          'sand-warm': '#E8D5A3',
          'sand-dark': '#C9A96E',
          sunset: '#FF6B35',
          'sunset-warm': '#FF8C42',
          coral: '#FF4F79',
          desert: '#8B6914',
          agave: '#2D6A4F',
          white: '#FAFAFA',
          dark: '#0A1628',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        body: ['var(--font-body)', 'sans-serif'],
        accent: ['var(--font-accent)', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-ocean': 'linear-gradient(135deg, #023E8A 0%, #0077B6 40%, #00B4D8 100%)',
        'gradient-sunset': 'linear-gradient(135deg, #FF6B35 0%, #FF8C42 50%, #FFB347 100%)',
        'gradient-sand': 'linear-gradient(180deg, #FAFAFA 0%, #F4E8C1 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'slide-down': 'slideDown 0.4s ease-out forwards',
        'scale-in': 'scaleIn 0.3s ease-out forwards',
        'wave': 'wave 8s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        wave: {
          '0%, 100%': { transform: 'translateX(0) translateY(0)' },
          '25%': { transform: 'translateX(-5px) translateY(-3px)' },
          '50%': { transform: 'translateX(0) translateY(-5px)' },
          '75%': { transform: 'translateX(5px) translateY(-3px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
