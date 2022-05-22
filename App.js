import React, { useState, useRef,  useEffect } from 'react';
import { Platform, StatusBar as StatusBarAndroid, SafeAreaView, StyleSheet, ViewPagerAndroidBase } from 'react-native';
import { Text as NativeText, View as NativeView,  KeyboardAvoidingView, Button as NativeButton} from 'react-native';
import { AntDesign, Ionicons, Zocial, FontAwesome, MaterialIcons, Entypo } from '@expo/vector-icons';
import { ScrollView, Heading, Text, Flex,Center, Box, Spacer , Button, Icon, Image, NativeBaseProvider, Container,} from "native-base";

import { NavigationContainer }  from '@react-navigation/native';
import { MainPageContainer, PageContainer } from './Components';
import { Flights, GithubFinder, GithubUserData ,ArrayApp, ManagePersons } from './Pages';
import {useGoBack, useGoTo, useNavigation} from './Hooks';
import 'react-native-gesture-handler';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

import {FlightsProvider, useFlights} from './Context'
export default function App() {

return (<MainPageContainer>

    <NavigationContainer>

      <Drawer.Navigator initialRouteName="Home" >
        <Drawer.Screen name="Home" options={{ title: 'Home - Arthur Zarankin ' }}  component={IndexScreenStacks} />
          <Drawer.Screen name='Flights' options={{ title: 'Flights' }}  component={Flights}/>
        <Drawer.Screen name="MangePersons" options={{ title: 'Mange Persons' }}  component={ManagePersons} />
        <Drawer.Screen name="ArrayApp" options={{ title: 'Array App' }} component={ArrayApp} />
        <Drawer.Screen name="GithubFinder" options={{ title: 'Github Finder' }} component={GithubFinder} />

      <Drawer.Screen name='GithubUserMoreData' options={ { title: 'Github  data'} } component={ GithubUserData }/>

      </Drawer.Navigator>

    </NavigationContainer>
    
</MainPageContainer>);
}



function IndexScreenStacks() {
const render = () => (<Stack.Navigator screenOptions={{ ...headerGlobalStyle }}>
  <Stack.Screen name='Flights' options={{ title: 'Flights', ...headerStyle }}  component={Flights}/>

  <Stack.Screen name='IndexScreen' options={{ title: 'Arthur Zarankin, React Native', ...headerStyle }}  component={IndexScreen}/>
  <Stack.Screen name='MangePersons' options={{ title: 'Mange Persons', ...headerStyle }}  component={ManagePersons}/>

  <Stack.Screen name='GithubUserMoreData' options={ ({ route }) => ({ title: 'Github ' + route.params?.login + ' data', ...headerStyle}) } component={ GithubUserData }/>
  <Stack.Screen name='GithubFinder' options={{ title: 'Github Finder', ...headerStyle }} component={ GithubFinder }/>
  <Stack.Screen name='ArrayApp' options={{ title: 'Array App', ...headerStyle }} component={ArrayApp}/>
</Stack.Navigator>);


const headerGlobalStyle = {
  headerStyle: { backgroundColor: '#85D6FF'}
  , headerTintColor: '#fff'
  , headerTitleStyle: { fontWeight: 'bold' }
  , headerRight: () => (<Button onPress={() => alert('Created by Arthur Zarankin!')}>Info</Button>)
  , headerShown: true
}
const headerStyle = { }

return render();}


function IndexScreen() {
  const goTo = useGoTo();
  return (
  <>
  <PageContainer>

  <Box style={{flex: 1}}>
    <Box style={{flex: 1}} pt={2}>
      <Button m={2} leftIcon={<Icon as={MaterialIcons} name="directions-walk" size="lg" />} onPress={()=>{goTo('MangePersons');}}>Manage Persons</Button>
      <Button m={2} leftIcon={<Icon as={MaterialIcons} name="person-search" size="lg" />} onPress={()=>{goTo('GithubFinder');}}>Github Finder App</Button>
      <Button m={2} leftIcon={<Icon as={AntDesign} name="bars" size="lg" />} onPress={()=>{goTo('ArrayApp');}}>Array App</Button>
    </Box>
  </Box>
  </PageContainer>
  </>);
}






