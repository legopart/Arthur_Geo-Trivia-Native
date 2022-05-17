import React, { useState, useRef,  useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Platform, StatusBar as StatusBarAndroid, SafeAreaView, StyleSheet, ViewPagerAndroidBase } from 'react-native';
import { Text as NativeText, View as NativeView,  KeyboardAvoidingView, Button as NativeButton} from 'react-native';
import { Input } from './Tags'
import {AntDesign, Ionicons, Zocial, FontAwesome, MaterialIcons, Entypo  } from '@expo/vector-icons';
import axios from 'axios';
import { ScrollView, Heading, Text, Flex,Center, Box, Spacer , Button, Icon, Image, NativeBaseProvider, Container,} from "native-base";
import {LinearGradient} from 'expo-linear-gradient';

import {NavigationContainer}  from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';

const Stack = createNativeStackNavigator();

export default function App() {
return (<>

<SafeAreaView style={styles.globalContainer}><StatusBar style="auto" /><KeyboardAvoidingView style={styles.preContainer}><NativeView style={styles.container}>
<NativeText>© Arthur Zarankin</NativeText>
<NativeBaseProvider>


    <NavigationContainer>
      
      <Stack.Navigator style={styles.globalContainer}>
        <Stack.Screen name='page1'  component={Screen1}/>
        <Stack.Screen name='page2'  component={Screen2}/>
    
      </Stack.Navigator>
    </NavigationContainer>

<ScrollView></ScrollView>

</NativeBaseProvider>
<NativeText style={styles.right}>© Arthur Zarankin</NativeText>
</NativeView></KeyboardAvoidingView></SafeAreaView>
</>);
}



function Screen1({navigation}) {
  return (<NativeView>
      <NativeText>Screen 1</NativeText>
      <NativeButton title="Go To Screen2" onPress={()=>{navigation.navigate('page2');
      }}></NativeButton>

  </NativeView>);
}

function Screen2({navigation}) {
  const nav = useNavigation();
  return (<NativeView>
      <NativeText>Screen 2</NativeText>
      <NativeButton title="Goto Page3" onPress={()=>{nav.navigate('page3');}}></NativeButton>
      <NativeButton title="Back" onPress={()=>{nav.goBack();}}></NativeButton>

  </NativeView>);
}



const styles = StyleSheet.create({
  black: {backgroundColor: '#000'}
  , right: {textAlign: 'right'}
  , globalContainer: {
    flex: 1, backgroundColor: 'azure' 
    , paddingTop: Platform.OS == "android" ? StatusBarAndroid.currentHeight : 0
  }
  , preContainer: {
    flex: 1, backgroundColor: 'lightblue'
  }
  , container: { 
    flex: 1 ,  backgroundColor: 'white' ,borderRadius: 13 
    , padding: 2
    , justifyContent: 'center', //alignItems: 'center'
  }
  , scrollView: { }
});

const globalStyleConfig = {
  dependencies: {
    "linear-gradient": LinearGradient
  }
};