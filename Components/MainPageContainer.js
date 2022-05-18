import { StatusBar } from 'expo-status-bar';
import { Platform, StatusBar as StatusBarAndroid, SafeAreaView, StyleSheet } from 'react-native';
import { Text as NativeText, View as NativeView,  KeyboardAvoidingView, Button as NativeButton} from 'react-native';
import {  NativeBaseProvider, } from "native-base";
import {LinearGradient} from 'expo-linear-gradient';


export default function MainPageContainer({children}) {
return(<>

<SafeAreaView style={styles.globalContainer}><StatusBar style="auto" /><KeyboardAvoidingView style={styles.preContainer}><NativeView style={styles.container}>
{/*<NativeText>© Arthur Zarankin</NativeText>*/}
<NativeBaseProvider config={globalStyleConfig} >

{children}

</NativeBaseProvider>
{/*<NativeText style={styles.right}>© Arthur Zarankin</NativeText>*/}
</NativeView></KeyboardAvoidingView></SafeAreaView>
</>);
}

const styles = StyleSheet.create({
  black: {backgroundColor: '#000'}
  , right: {textAlign: 'right', marginRight: 3}
  , globalContainer: {
    flex: 1, backgroundColor: 'azure' 
    , paddingTop: Platform.OS == "android" ? StatusBarAndroid.currentHeight : 0
  }
  , preContainer: {
    flex: 1, backgroundColor: 'lightblue'
  }
  , container: { 
    flex: 1 ,  backgroundColor: 'white' ,borderRadius: 13 
    , padding: 7

    , justifyContent: 'center', //alignItems: 'center'

  }
  , scrollView: { }
});

const globalStyleConfig = {
  dependencies: {
    "linear-gradient": LinearGradient
  }
};