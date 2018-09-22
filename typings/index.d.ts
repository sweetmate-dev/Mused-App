// tslint:disable-next-line
declare const require: { (path: string): any; context: any };

type HashMap<T> = { [key: string]: T };

declare module 'expo' {
    // tslint:disable-next-line
  export const AppLoading: any;
  // tslint:disable-next-line
  export const Asset: any;
  // tslint:disable-next-line
  export const Font: any;
  // tslint:disable-next-line
  export const Facebook: any;
  // tslint:disable-next-line
  export const Constants: any;
  }

declare module '@expo/vector-icons' {
    // tslint:disable-next-line
  export const EvilIcons: any;
  // tslint:disable-next-line
  export const FontAwesome: any;
  // tslint:disable-next-line
  export const Ionicons: any;
  // tslint:disable-next-line
  export const Entypo: any;
  }

  

declare module 'react-native-material-ripple' {
     // tslint:disable-next-line
    const Ripple: any;
    export default Ripple;
}

declare module 'react-native-auto-height-image' {
  const AutoHeightImage: any;
  export default AutoHeightImage;
}

