import React, { useState, useRef,  useEffect } from 'react';
import {ImageBackground, KeyboardAvoidingView, Button as NativeButton} from 'react-native';
import { ScrollView, Heading, Text, Flex,Center, Box, Spacer , Button, Icon, Image, NativeBaseProvider, Container,} from "native-base";
import { AntDesign, Ionicons, Zocial, FontAwesome, MaterialIcons, Entypo } from '@expo/vector-icons';
import 'react-native-gesture-handler';
import { NavigationContainer }  from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { MainPageContainer, PageContainer, Input } from './Components';
import {useGoBack, useGoTo, useNavigation} from './Hooks';
import {Login, Logout, MyHome, Favorites} from './Pages';
import { ReduxProvider } from './reducers';


const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();


export default function App() {
return (<>
<ReduxProvider>
  <MainPageContainer>
    <NavigationContainer> 
      <Stack1 />
    </NavigationContainer>
  </MainPageContainer>
</ReduxProvider>
</>);}

function Stack1() {
const render = () => (<Stack.Navigator  screenOptions={{ headerShown: false }}>
  <Stack.Screen name='Login' options={{ }}  component={Login}/>
  <Stack.Screen name='Drawer1' options={{ }}  component={Drawer1}/>
</Stack.Navigator>);
return render();}


function  Drawer1() {
render = () => (<>
    <Drawer.Navigator screenOptions={{ }} initialRouteName="MyHome" swipeEnabled swipeEdgeWidth overlayColor={1} >
      <Drawer.Screen name="MyHome" options={{ drawerLabel: () => null, drawerIcon: () => null, title: 'MyHome', headerShown: false }}  component={MyHome} />
      <Drawer.Screen name="Logout" options={{ drawerLabel: () => (<Box>Logout</Box>),title: 'Logout', headerShown: false }}  component={Logout} />
    </Drawer.Navigator>
</>);
const headerGlobalStyle = {
  headerStyle: { backgroundColor: '#E40412'}
  , headerTintColor: '#E1E1E1'
  , headerTitleAlign: "center"
  , headerTitleStyle: { fontWeight: 'bold' }
  , headerRight: () => (<Button onPress={() => alert('Created by Arthur Zarankin!')}>Info</Button>)
  , headerShown: true
}
const headerStyle = { }

return render();}

