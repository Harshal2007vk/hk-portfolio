/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        orbitron: ['Orbitron', 'monospace'],
        mono: ['Space Mono', 'monospace'],
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        cyan: { DEFAULT: '#00f5ff', dark: '#00b8c4' },
        purple: { DEFAULT: '#bf00ff', dark: '#8800bb' },
        dark: { DEFAULT: '#020812', 2: '#060e1e', 3: '#0a1628' },
        glass: 'rgba(0,245,255,0.04)',
      },
      animation: {
        'spin-slow': 'spin 12s linear infinite',
        'spin-reverse': 'spin 20s linear infinite reverse',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'scan': 'scan 3s linear infinite',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseGlow: {
          '0%,100%': { boxShadow: '0 0 10px #00f5ff40' },
          '50%': { boxShadow: '0 0 30px #00f5ff90, 0 0 60px #00f5ff40' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
      },
      backdropBlur: { xs: '2px' },
    },
  },
  plugins: [],
}
