import { Text as NativeText, KeyboardAvoidingView} from 'react-native';
import { Platform, StatusBar as StatusBarAndroid, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import {  StatusBar, NativeBaseProvider, extendTheme  } from "native-base";
import { PageContainerStyle } from './Theme';


export default function PageContainer({children, index, statusbarColor}) {
return(<>
<SafeAreaView style={PageContainerStyle.preContainer}><KeyboardAvoidingView style={index ? PageContainerStyle.containerIndex :  PageContainerStyle.containerRegular}>
<StatusBar style="auto" backgroundColor={statusbarColor? statusbarColor : '#E40412'} />
    {children}
</KeyboardAvoidingView></SafeAreaView>
</>);
}


