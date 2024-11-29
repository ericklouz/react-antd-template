interface ColorShades {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  950: string;
}

interface Colors {
  primary: ColorShades;
  secondary: ColorShades;
  grey: ColorShades;
  dark: ColorShades;
  [key: string]: ColorShades | undefined; // To allow additional colors dynamically
}

const COLORS: Colors = {
  primary: {
    50: '#e8f2ff',
    100: '#d4e2ff',
    200: '#aeccff',
    300: '#6e9eff',
    400: '#1d5eff',
    500: '#001a70',
    600: '#001162',
    700: '#021259',
    800: '#020f4a',
    900: '#020d3d',
    950: '#000927'
  },
  secondary: {
    50: '#fffdea',
    100: '#fff6c5',
    200: '#ffed85',
    300: '#ffdd46',
    400: '#ffcb1b',
    500: '#f2a000',
    600: '#e27f00',
    700: '#bb5802',
    800: '#984408',
    900: '#7c380b',
    950: '#481b00'
  },
  grey: {
    50: '#f8f8f8',
    100: '#f0f0f0',
    200: '#dcdcdc',
    300: '#bdbdbd',
    400: '#989898',
    500: '#7c7c7c',
    600: '#656565',
    700: '#525252',
    800: '#464646',
    900: '#3d3d3d',
    950: '#292929'
  },
  dark: {
    50: '#eff0f1',
    100: '#d7d8d9',
    200: '#b5b6b6',
    300: '#808484',
    400: '#484949',
    500: '#2d2e2e',
    600: '#262727',
    700: '#212121',
    800: '#1c1c1d',
    900: '#191919',
    950: '#131313'
  }
};

export default COLORS;
