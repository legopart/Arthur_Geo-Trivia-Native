import React, { useState, useRef,  useEffect } from 'react';
import { Platform, StatusBar as StatusBarAndroid, SafeAreaView, StyleSheet, ViewPagerAndroidBase } from 'react-native';
import { Text as NativeText, View as NativeView,  KeyboardAvoidingView, Button as NativeButton} from 'react-native';
import { AntDesign, Ionicons, Zocial, FontAwesome, MaterialIcons, Entypo } from '@expo/vector-icons';
import { ScrollView, Heading, Text, Flex,Center, Box, Spacer , Button, Icon, Image, NativeBaseProvider, Container,} from "native-base";

import { NavigationContainer }  from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainPageContainer, PageContainer } from './Components'
import {GithubFinder, GithubUserData ,ArrayApp} from './Content'
import {useGoBack, useGoTo, useNavigation} from './Hooks'

const Stack = createNativeStackNavigator();

export default function App() {

return (<MainPageContainer>
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen name='GithubFinder' options={{ title: 'Github Finder' }} component={ GithubFinder }/>
        <Stack.Screen name='GithubUserMoreData' options={{ title: 'Github User More Data' }} component={ GithubUserData }/>

        <Stack.Screen name='IndexScreen' options={{ title: 'Arthur Zarankin, React Native' }}  component={IndexScreen}/>
        <Stack.Screen name='ArrayApp' options={{ title: 'Array App' }} component={ArrayApp}/>
      </Stack.Navigator>
    </NavigationContainer>
</MainPageContainer>);
}

function IndexScreen() {
  const goTo = useGoTo();
  return (<PageContainer>
  <Box style={{flex: 1}}>
    <Box style={{flex: 1}} pt={2}>
      <Button m={2} leftIcon={<Icon as={MaterialIcons} name="person-search" size="lg" />} onPress={()=>{goTo('GithubFinder');}}>Github Finder App</Button>
      <Button m={2} leftIcon={<Icon as={AntDesign} name="bars" size="lg" />} onPress={()=>{goTo('ArrayApp');}}>Array App</Button>
    </Box>
  </Box>
  </PageContainer>);
}

