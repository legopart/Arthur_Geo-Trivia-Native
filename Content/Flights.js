import React, { useState, useRef,  useEffect } from 'react';
import { Platform, StatusBarasStatusBarAndroid, SafeAreaView, StyleSheet, ViewPagerAndroidBase, View, Dimensions } from 'react-native';
import { AntDesign, Zocial, FontAwesome, MaterialIcons, Entypo, Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { ScrollView, Heading, Text, Flex,Center, Box, Spacer , Button, Icon, Image, NativeBaseProvider, Container,} from "native-base";
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { PageContainer, Input } from '../Components'
import { useGoTo, useLocalStorage } from '../Hooks'
import { debounce } from '../Api'
import AsyncStorage from '@react-native-async-storage/async-storage';
import LocalStorageUsers from './GithubFinderLocalStorage';

// const Tab = createMaterialTopTabNavigator();
// function FlightTabs() {
// const render = () => (<>
// <Tab.Navigator style={{  }}>
//   <Tab.Screen component={ Flights } name='GitHubSearch' options={{ title: () => ( <Text>Git Hub Search</Text> ), }} />
//   <Tab.Screen component={ LocalStorageUsers } name='LocalStorage' options={{ title: () => ( <Text>Local Storage</Text> ), }} />
// </Tab.Navigator>
// </>);
// return render();}

export default function Flights() {
  const goTo = useGoTo();
  const [user, setUser]=useState();
  const [userArr, setUserArr]=useState([ ]);
  const userNameRef = useRef();
  useEffect(() => {
    //if(userMoreData) setUser(userMoreData);
    handleGithubSearch('w3arthur');  //delete
    handleGetAllSearches();
    userNameRef.current?.focus();
    
  }, []);

  


const render = () => (<PageContainer>
<ScrollView>
    <Heading size='xl'>Flight</Heading>
<Box>dsdsdfsf
</Box>
</ScrollView>
</PageContainer>);


function handleMoreData(){
  if(!user) return;
  const data = user;
  goTo('GithubUserMoreData', data);
}

function handleSave(){ errorHandler(async() =>{
    const data = user;
    const response = await axios.post(DATABASE, data);
    handleGetAllSearches();
} ); }

function handleGetAllSearches(){ errorHandler(async() =>{
    const response = await axios.get(DATABASE);
    const array = [];
    for (const [key, value] of Object.entries(response.data)) {
      const val = {key: key,...value};
      array.push(val);
    }
    setUserArr(array);
} ); }


const handleGithubSearchDelay = debounce( () => {
        handleGithubSearch();
    }, 2200);

function handleGithubSearch(firstSetUser = undefined){ errorHandler(async() =>{
  try{
    const userName = firstSetUser || userNameRef.current.getValue();
    if(userName === '') throw new Error();
    const response = await axios.get(GITHUB_API + '/' + userName );
    setUser();
    setUser(response.data); 
  }catch(e){ 
    setUser();
    userNameRef.current?.focus();
    throw new Error();
  }
} ); }

async function errorHandler(callback){
    try{ await callback();
  }catch(e){
  }
}


async function handleLocalStorageStoreUser(){
  try{
    if(!user) return;
    const value = await AsyncStorage.getItem('@users');
    let valueJson;
    if(value) {
      valueJson = JSON.parse(value);
      valueJson.push(user);
    }else{ valueJson = [user] }
    await AsyncStorage.setItem('@users', JSON.stringify(valueJson));
    const renderData = Math.random();
    goTo('LocalStorage', renderData );
  }catch(e){}
}

return render();}


const image = StyleSheet.create({
  container: { marginTop: 4,borderWidth: 1,  borderColor: '#85D6FF', backgroundColor: '#85D6FF', borderRadius: 10 }
  , image: { width: 100, height: 100 }
});

const gradientBackground = {
  linearGradient: {
    colors: ["#85D6FF", "#43C8FF"],
    start: [1, 0],
    end: [1, 1]
  }
}



