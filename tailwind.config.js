/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pulse: {
          bg: 'var(--color-bg)',
          surface: 'var(--color-surface)',
          'surface-light': 'var(--color-surface-light)',
          'surface-elevated': 'var(--color-surface-elevated)',
          border: 'var(--color-border)',
          'border-light': 'var(--color-border-light)',
        },
        'pulse-text': 'var(--color-text)',
        'pulse-text-secondary': 'var(--color-text-secondary)',
        'pulse-text-muted': 'var(--color-text-muted)',
        'pulse-text-faint': 'var(--color-text-faint)',
        'page-text': 'var(--color-page-text)',
        'page-text-muted': 'var(--color-page-text-muted)',
        core: {
          DEFAULT: '#F472B6',
          light: '#F9A8D4',
          dark: '#DB2777',
        },
        vision: {
          DEFAULT: '#22D3EE',
          light: '#67E8F9',
          dark: '#0891B2',
        },
        tribe: {
          DEFAULT: '#A78BFA',
          light: '#C4B5FD',
          dark: '#7C3AED',
        },
        flow: {
          DEFAULT: '#34D399',
          light: '#6EE7B7',
          dark: '#059669',
        },
        vault: {
          DEFAULT: '#FBBF24',
          light: '#FCD34D',
          dark: '#D97706',
        },
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        info: '#3B82F6',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'Inter', 'sans-serif'],
      },
      fontSize: {
        'score': ['72px', { lineHeight: '1', fontWeight: '700' }],
        'stat': ['48px', { lineHeight: '1', fontWeight: '700' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      },
      borderWidth: {
        '3': '3px',
      },
      ringWidth: {
        '3': '3px',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'float': 'float 4s ease-in-out infinite',
        'slide-up': 'slideUp 0.3s ease-out',
        'fade-in': 'fadeIn 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'shimmer': 'shimmer 2.5s linear infinite',
        'gradient': 'gradientShift 4s ease infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { 
            boxShadow: '0 0 20px rgba(244, 114, 182, 0.4)',
            transform: 'scale(1)',
          },
          '50%': { 
            boxShadow: '0 0 50px rgba(244, 114, 182, 0.6)',
            transform: 'scale(1.02)',
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(15px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        gradientShift: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-pulse': 'linear-gradient(135deg, #F472B6 0%, #A78BFA 50%, #22D3EE 100%)',
      },
      boxShadow: {
        'glow-core': '0 0 30px rgba(244, 114, 182, 0.4)',
        'glow-vision': '0 0 30px rgba(34, 211, 238, 0.4)',
        'glow-tribe': '0 0 30px rgba(167, 139, 250, 0.4)',
        'glow-flow': '0 0 30px rgba(52, 211, 153, 0.4)',
        'glow-vault': '0 0 30px rgba(251, 191, 36, 0.4)',
        'theme': 'var(--shadow-glow)',
        'card': 'var(--shadow-card)',
        'card-hover': 'var(--shadow-card-hover)',
      },
    },
  },
  plugins: [],
}
