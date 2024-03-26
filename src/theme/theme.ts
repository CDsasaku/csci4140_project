// theme.ts

interface Theme {
  colors: {
    primary: string;
    secondary: string;
    error: string;
    white: string;
    grey: string;
    greyGreen: string;
    lightGrey: string;
    secondaryGrey: string;
    blue: string;
  };
}

const g_THEME: Theme = {
  colors: {
    primary: 'rgba(116, 116, 116, 1)',
    secondary: 'rgba(217, 217, 217, 1)',
    error: 'rgba(249, 58, 58, 0.67)',
    white: 'rgba(255, 255, 255, 1)',
    grey: 'rgba(196, 197, 196, 1)',
    greyGreen: 'rgba(103, 122, 106, 0.8)',  
    lightGrey: 'rgba(250, 250, 250, 1)',
    secondaryGrey: 'rgba(237, 237, 237, 1)',
    blue: 'rgba(12, 26, 48, 1)',
  },
};

export default g_THEME;