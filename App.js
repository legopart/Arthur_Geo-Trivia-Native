import React, { useState, useRef,  useEffect } from 'react';
import { Platform, StatusBar as StatusBarAndroid, SafeAreaView, StyleSheet, ViewPagerAndroidBase } from 'react-native';
import { Text as NativeText, View as NativeView,  KeyboardAvoidingView, Button as NativeButton} from 'react-native';
import { AntDesign, Ionicons, Zocial, FontAwesome, MaterialIcons, Entypo } from '@expo/vector-icons';

import { NavigationContainer }  from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useNavigation } from '@react-navigation/native';
import { MainPageContainer } from './Components'
import {GithubFinder ,ArrayApp} from './Content'
const Stack = createNativeStackNavigator();

export default function App() {
return (<MainPageContainer>

    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Index Screen'  component={IndexScreen}/>
        
        <Stack.Screen name='Github Finder'  component={GithubFinder}/>
 
        <Stack.Screen name='Array App'  component={ArrayApp}/>
      </Stack.Navigator>
    </NavigationContainer>
</MainPageContainer>);
}




function IndexScreen({navigation}) {
  return (<>
  
  <NativeView>
      <NativeText>Index</NativeText>
      <NativeButton title="Github Finder App" onPress={()=>{navigation.navigate('Github Finder');}}></NativeButton>
      <NativeButton title="Array App" onPress={()=>{navigation.navigate('Array App');}}></NativeButton>
  </NativeView>



  </>);
}

function Screen2({navigation}) {
  const nav = useNavigation();
  return (<NativeView>
      <NativeText>Screen 2</NativeText>
      <NativeButton title="Goto Page3" onPress={()=>{nav.navigate('page3');}}></NativeButton>
      <NativeButton title="Back" onPress={()=>{nav.goBack();}}></NativeButton>

  </NativeView>);
}



