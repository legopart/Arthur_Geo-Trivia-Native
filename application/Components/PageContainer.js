import React, { useState, useRef,  useEffect } from 'react';
import { View ,Text as NativeText, KeyboardAvoidingView, Image} from 'react-native';
import { Platform, StatusBar as StatusBarAndroid, SafeAreaView,  StyleSheet, Dimensions } from 'react-native';
import {  StatusBar, NativeBaseProvider, extendTheme, Heading, ScrollView  } from "native-base";
import { PageContainerStyle } from './Theme';

const WINDOW_HEIGHT = Dimensions.get("window").height;

export default function PageContainer({children, index, statusBar, topCorners, title}) {
return(<>
<SafeAreaView style={PageContainerStyle.preContainer}>

    
    <KeyboardAvoidingView 
style={[index ? PageContainerStyle.containerIndex :  PageContainerStyle.containerRegular, topCorners? PageContainerStyle.containerTopRadius : null]}>
   <ScrollView style={{}} contentContainerStyle={{flex: 1, height: WINDOW_HEIGHT, minHeight: 600}}>
    <View style={{zIndex: 5, backgroundColor: '#ffffff', borderRadius: 12}}>
      <Image alt="area" source={require('../assets/logo.png')} style={{ borderRadius: 6, borderTopLeftRadius: 12,borderTopRightRadius: 12, width: '100%', height: 230, }}/>
      {title ? <Heading size={'xl'} >{title}</Heading> : null}
    </View>

    <View style={{flex: 1, padding: 4}}>
    {statusBar? <StatusBar style="auto" backgroundColor={'#6C059C'} />: null}
    {children}
  </View>
  </ScrollView>
</KeyboardAvoidingView></SafeAreaView>
</>);
}


