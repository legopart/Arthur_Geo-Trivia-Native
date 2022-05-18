import { Text as NativeText, KeyboardAvoidingView} from 'react-native';
import { Platform, StatusBar as StatusBarAndroid, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
export default function PageContainer({children}) {
return(<>
<SafeAreaView style={styles.preContainer}><KeyboardAvoidingView style={styles.container}>

{children}

</KeyboardAvoidingView></SafeAreaView>
</>);
}

const styles = StyleSheet.create({
  preContainer: {
    flex: 1 
  }
  ,container: { 
    flex: 1 , borderWidth: 2, borderColor: 'azure', backgroundColor: 'white'
   , justifyContent: 'center', paddingTop: 5
  }
});

