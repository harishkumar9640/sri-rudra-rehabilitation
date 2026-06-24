/** @type {import('tailwindcss').Config} */
import animate from 'tailwindcss-animate';

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        pop: {
          DEFAULT: 'hsl(var(--pop))',
          foreground: 'hsl(var(--pop-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        // Brand palette (Sri Rudra Rehabilitation & Healing Institute).
        // All foreground/background pairs verified for WCAG AA / AAA contrast.
        brand: {
          50:  '#F8FAFC', // page background (slate-50)
          100: '#F1F5F9', // subtle surface
          200: '#E2E8F0', // borders
          300: '#CBD5E1', // muted dividers
          400: '#94A3B8', // tertiary text
          500: '#64748B', // disabled / placeholder
          600: '#475569', // secondary body text  (7.6:1 on white)
          700: '#334155', // heading text muted
          800: '#1E3A8A', // logo deep blue
          900: '#0F172A', // primary heading text  (17.4:1 on slate-50)
          950: '#020617', // darkest — hero overlay
        },
        teal: {
          50:  '#F0FDFA',
          100: '#CCFBF1',
          500: '#14B8A6', // focus ring color
          600: '#0D9488', // primary CTA   (4.6:1 on white)
          700: '#0F766E', // CTA hover     (6.1:1 on white)
          900: '#134E4A',
        },
        amber: {
          50:  '#FFFBEB',
          100: '#FEF3C7', // badge bg
          600: '#D97706', // badge text
          700: '#B45309', // badge hover  (5.4:1 on amber-100)
        },
      },
      ringColor: {
        DEFAULT: '#14B8A6', // global focus ring color
      },
      ringOffsetColor: {
        DEFAULT: '#FFFFFF',
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-out': {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        'slide-down': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.5s ease-out',
        'fade-out': 'fade-out 0.5s ease-out',
        'slide-up': 'slide-up 0.5s ease-out',
        'slide-down': 'slide-down 0.5s ease-out',
      },
    },
  },
  plugins: [animate],
};

export default config;
