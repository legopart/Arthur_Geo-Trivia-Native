import { Platform, StatusBar as StatusBarAndroid, StyleSheet } from 'react-native';
import { extendTheme } from "native-base";
import {LinearGradient} from 'expo-linear-gradient';


const globalTheme = extendTheme({
colors: {
    red: { 600: '#F40000' }
}
,components: {
    Button: {
        baseStyle: {
        rounded: "full" //3xl
        , margin: 1
        , fontWeight: 'xl'
        }
        , defaultProps: {
        colorScheme: "red" //#F40000
        , _text:{color: '#ffffff'}
        }
    }
    , Text: {
        defaultProps: { color: '#ffffff' }
        , baseStyle: {  marginLeft: 1, marginRight: 1 }
    }
    , Input: {
        defaultProps: { color: '#ffffff' }
        , baseStyle: { }
    }
    , Heading: {
        defaultProps: { color: '#E40412' }
        , baseStyle: { marginLeft: 'auto', marginRight: 'auto' }
    }
}
, fonts: {
  heading: 'Roboto',
  body: 'Roboto',
  mono: 'Roboto',
}
, letterSpacings: {
  xs: "-0.04em",
  sm: "-0.02em",
  md: '0.051em',
  lg: "0.129em",
  xl: "0.15em",
  "2xl": "0.12em",
}
, fontWeights: {
  hairline: 100,
  thin: 200,
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  black: 900,
  extrablack: 950,
}
, lineHeights: {
  "2xs": "1.1em",
  xs: "1.21em",
  sm: "1.355em",
  md: "1.45em",
  lg: "1.65em",
  xl: "1.9em",
  "2xl": "2.4em",
  "3xl": "2.9em",
  "4xl": "3.8em",
  "5xl": "4.8em",
}
, fontSizes: {
  "2xs": 12,
  xs: 15,
  sm: 17,
  md: 19,
  lg: 21,
  xl: 25,
  "2xl": 27,
  "3xl": 29,
  "4xl": 37,
  "5xl": 48,
  "6xl": 52,
  "7xl": 64,
  "8xl": 89,
  "9xl": 128,
}
});


const globalStyles = StyleSheet.create({
  globalContainer: {
    flex: 1, backgroundColor: '#E40412' 
    , paddingTop: Platform.OS == "android" ? StatusBarAndroid.currentHeight : 0
    , maxWidth: 560 //pc fix
  }
  , preContainer: { flex: 1 }
  , container: { flex: 1 }
  , scrollView: { }
});


const PageContainerStyle = StyleSheet.create({
  preContainer: {flex: 1 ,backgroundColor: '#E40412' }
  ,containerIndex: { 
    flex: 1 
    ,backgroundColor: '#010101'
   , justifyContent: 'center'
   , borderRadius: 12
   
  }
  ,containerRegular: { 
    flex: 1, borderBottomWidth: 2, borderLeftWidth: 2, borderRightWidth: 2,  borderColor: 'red'
    , backgroundColor: '#010101'
    , justifyContent: 'center'
    , padding: 20
    //, alignItems: 'center'
    , borderRadius: 12
  }
});

const globalStyleConfig = {
  dependencies: { "linear-gradient": LinearGradient }
};


export {globalTheme, globalStyles, globalStyleConfig, PageContainerStyle}