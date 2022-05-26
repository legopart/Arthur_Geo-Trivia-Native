import React, { useState, useRef,  useEffect } from 'react';
import { Platform, StatusBar as StatusBarAndroid, SafeAreaView, StyleSheet, ViewPagerAndroidBase, View } from 'react-native';
import { AntDesign, Zocial, FontAwesome, MaterialIcons, Entypo, Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { ScrollView, Heading, Text, Flex,Center, Box, Spacer , Button, Icon, Image, NativeBaseProvider, Container,} from "native-base";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { PageContainer, Input } from '../Components'
import { useRoute, useGoTo, useLocalStorage } from '../Hooks'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LocalStorageUsers() {
  const route = useRoute();
  const renderData = route.params;

  const [users, SetUsers] = useState([]);
  useEffect(() => {
    handleReceiveLocalStorageUsers();
  }, [renderData]); //add better refresh role!

  function reversedId(i){  return users.length -i - 1; }

const render = () => (<PageContainer>
<ScrollView>
  <Center>
    {users.slice(0).reverse().map((x, i) => (<Box key={reversedId(i)}>{x.login}</Box>))}
  </Center>
</ScrollView>
</PageContainer>);


async function handleReceiveLocalStorageUsers(){
  try{
    const value = await AsyncStorage.getItem('@users');
    if(!value){SetUsers([]);}
    const valueJson = JSON.parse(value);
    if(!valueJson[0]) throw new Error();
    SetUsers(valueJson);
  }catch(e){await AsyncStorage.removeItem('@users'); SetUsers([]);}
}


return render();}


