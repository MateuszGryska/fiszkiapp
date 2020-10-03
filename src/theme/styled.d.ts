// import original module declarations
import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    main: string;
    background: string;
    input: string;
    inputHover: string;
    hover: string;
    showButton: string;
    greyButton: string;
    fontColor: string;
    white: string;
    fontGrey: string;
    red: string;
    light: number;
    bold: number;
    fontSize: {
      xl: string;
      l: string;
      m: string;
      xs: string;
      s: string;
    };
  }
}
