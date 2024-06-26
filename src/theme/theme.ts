// theme.ts

interface Theme {
  colors: {
    primary: string;
    secondary: string;
    error: string;
    white: string;
    grey: string;
    greyGreen: string;
    green: string;
    darkGrey: string;
    lightGrey: string;
    secondaryGrey: string;
    blue: string;
    transparentRed: string;
  };
}

const g_THEME: Theme = {
  colors: {
    primary: 'rgba(116, 116, 116, 1)',
    secondary: 'rgba(217, 217, 217, 1)',
    error: 'rgba(200, 58, 58, 1)',
    white: 'rgba(255, 255, 255, 1)',
    grey: 'rgba(196, 197, 196, 1)',
    greyGreen: 'rgba(103, 122, 106, 0.8)',  
    green: 'rgba(0, 128, 0, 1)',
    darkGrey: 'rgba(116, 116, 116, 1)',
    lightGrey: 'rgba(250, 250, 250, 1)',
    secondaryGrey: 'rgba(230, 230, 230, 1)',
    blue: 'rgba(12, 26, 48, 1)',
    transparentRed: 'rgba(255, 0, 0, 0.5)',
  },
};

export default g_THEME;