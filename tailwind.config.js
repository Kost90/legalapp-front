import defaultTheme from 'tailwindcss/defaultTheme';

const config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      keyframes: {
        glow: {
          '0%, 100%': {
            transform: 'scale(1) rotate(0deg)',
            opacity: '0.4',
          },
          '50%': {
            transform: 'scale(1.1) rotate(5deg)',
            opacity: '0.5',
          },
        },
      },
      animation: {
        glow: 'glow 15s ease-in-out infinite',
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        white: '#FFFFFF',
        black: '#000000',
        'bg-primary': '#f6f5f3',
        accent: '#FFDD00',
        redbtn: '#ff5a5f',
        headerfooterwhite: '#fff',
        'main-black': '#333',
        'muted-text': '#6B8091',
        'link-btn-text': '#087dc1',
        'btn-border-color': '#dbe5ea',
        'crimson-bg': '#ff5a5f',
        'base-btn-hover-bg': '#ecf4ff',
        'btn-hover-border': '#dbe5ea',
        'color-yellow-bg': '#ffe27b',
        'color-secondary': '#f5f7fa',
        'color-red-bg': '#ff9498',
        'color-footer-link-yellow-brt': '#fff200',
        'color-footer-link-blue-brt': '#00c5ff',
        'color-footer-link-pink-brt': '#e579ff',
        'color-footer-link-purple-brt': '#b97fff',
        'color-footer-link-red-brt': '#fa5801',
        'color-footer-link-ligth-green': '#70e3d3',
        'color-footer-link-green': '#46d75a',
        // New colors:
        blue: '#72A9FB',
        yellow: '#FDBF32',
        orange: '#FD801C',
        text: {
          // new text colors will only
          mainBlack: '#061121',
          greyMuted: 'rgba(6, 17, 33, 0.6)',
          // This color on card with extra light grey bg
          grey: '#999B9D',
          // this color text footer on card with blue bg
          blueExtraLigth: '#C7DDFD',
          // this color text footer on yellow bg
          blueDark: '#44556C',
          // this color text footer on blue bg
          blueDarkFooter: '#39495F',
          // ---------
          DEFAULT: '#1A1A1A',
          muted: '#6B7280',
        },
        background: {
          'bg-body-main': '#f6f5f3',
          DEFAULT: '#FFFFFF',
          mutedcard: '#F5F9FF',
          muted: '#FFF9DC',
          redBtn: '#ff5a5f',
          customGray: '#494846d9',
          // New colors:
          greyExtraLigth: '#F7F9FB',
          yellowLigthter: '#FED773',
          blueLighter: '#72A9FB',
          mainBody: '#F7F9FB',
        },
        border: {
          DEFAULT: '#E5E7EB',
          //new color
          borderGrey: '#E9E9E9',
        },
      },
      fontSize: {
        base: ['16px', { lineHeight: '24px' }],
        lg: ['18px', { lineHeight: '28px' }],
        xl: ['20px', { lineHeight: '28px' }],
        '2xl': ['24px', { lineHeight: '32px' }],
        '3xl': ['30px', { lineHeight: '36px' }],
        '4xl': ['36px', { lineHeight: '40px' }],
      },
      borderRadius: {
        none: '0',
        sm: '4px',
        DEFAULT: '8px',
        lg: '12px',
        full: '9999px',
      },
      spacing: {
        px: '1px',
        0: '0px',
        1: '4px',
        2: '8px',
        3: '12px',
        4: '16px',
        5: '20px',
        6: '24px',
        8: '32px',
        10: '40px',
        12: '48px',
        16: '64px',
        20: '80px',
        24: '96px',
        32: '128px',
        40: '160px',
        48: '192px',
        56: '224px',
        64: '256px',
      },
      boxShadow: {
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        'custom-inset': 'inset 15px 20px 20px 0px #0C2A531A',
        'custom-soft': '-1px 2px 34px -10px rgba(82,75,75,0.75)',
      },
    },
  },
  plugins: [],
};

export default config;
