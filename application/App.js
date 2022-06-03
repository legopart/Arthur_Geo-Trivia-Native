import React, { useState, useRef,  useEffect } from 'react';
import {StyleSheet, useWindowDimensions, View,ImageBackground, KeyboardAvoidingView, Button as NativeButton} from 'react-native';
import {   ScrollView, Heading, Text, Flex,Center, Box, Spacer , Button, Icon, Image, NativeBaseProvider, Container,} from "native-base";
import { Entypo, Fontisto, AntDesign, Ionicons, Zocial, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import 'react-native-gesture-handler';
import { NavigationContainer }  from '@react-navigation/native';
import { createDrawerNavigator,DrawerContentScrollView, DrawerItemList, DrawerItem, } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import { MainPageContainer, PageContainer, Input } from './Components';
import {useGoBack, useGoTo, useNavigation} from './Hooks';
import {Login, Register, Logout, MyHome, Location, Question, Results} from './Pages';
import { ReduxProvider, useSelectorAuth , useSelectorMovies } from './reducers';



const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createMaterialBottomTabNavigator();

export default function App() {

return (<>
<ReduxProvider>
  <MainPageContainer><NavigationContainer> 
      <StackNav />
    </NavigationContainer></MainPageContainer>
</ReduxProvider>
</>);}






function StackNav() {
  const { auth } = useSelectorAuth();
const render = () => (<>
  { auth?.name ? 
    <Stack.Navigator  screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Results' options={{ }}  component={Results}/>
      <Stack.Screen name='Question' options={{ }}  component={Question}/>
      <Stack.Screen name='Location' options={{ }}  component={Location}/>
      <Stack.Screen name='MyHome' options={{ }}  component={MyHome}/>
      <Stack.Screen name='Logout' options={{ }}  component={Logout}/>
    </Stack.Navigator> :
    <Stack.Navigator  screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Login' options={{ }}  component={Login}/>
      <Stack.Screen name='Register' options={{ }}  component={Register}/>
    </Stack.Navigator>
  }
</>);
return render();}
  
