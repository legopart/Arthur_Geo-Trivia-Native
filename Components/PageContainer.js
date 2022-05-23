import { Text as NativeText, KeyboardAvoidingView} from 'react-native';
import { Platform, StatusBar as StatusBarAndroid, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { PageContainerStyle } from './Theme';


export default function PageContainer({children, index}) {
return(<>
<SafeAreaView style={PageContainerStyle.preContainer}><KeyboardAvoidingView style={index ? PageContainerStyle.containerIndex :  PageContainerStyle.containerRegular}>

{children}

</KeyboardAvoidingView></SafeAreaView>
</>);
}


