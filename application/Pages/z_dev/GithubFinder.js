import React, { useState, useRef,  useEffect } from 'react';
import { Platform, StatusBarasStatusBarAndroid, SafeAreaView, StyleSheet, ViewPagerAndroidBase, View, Dimensions } from 'react-native';
import { AntDesign, Zocial, FontAwesome, MaterialIcons, Entypo, Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { ScrollView, Heading, Text, Flex, Center, Box, Spacer , Button, Icon, Image, NativeBaseProvider, Container,} from "native-base";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { PageContainer, Input } from '../Components'
import { useGoTo, useLocalStorage } from '../Hooks'
import { debounce } from '../Api'
import AsyncStorage from '@react-native-async-storage/async-storage';
import LocalStorageUsers from './GithubFinderLocalStorage';

const Tab = createMaterialTopTabNavigator();

const GITHUB_API = 'https://api.github.com/users';
const DATABASE = 'https://w3arthurdb-default-rtdb.firebaseio.com/users.json';


export default function GithubAppTabs() {
const render = () => (<>
<Tab.Navigator style={{  }}>
  <Tab.Screen component={ GithubApp } name='GitHubSearch' options={{ title: () => ( <Text>Git Hub Search</Text> ), }} />
  <Tab.Screen component={ LocalStorageUsers } name='LocalStorage' options={{ title: () => ( <Text>Local Storage</Text> ), }} />
</Tab.Navigator>
</>);
return render();}


function GithubApp() {
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
  <Box p={2} style={{borderRadius: 10}} bg={gradientBackground}>
    <Box style={{padding: 6, paddingLeft: 14, paddingRight: 14, backgroundColor: 'white', borderWidth: 1, borderColor: 'gray', borderRadius: 10}}>
      <Box style={{flexDirection: 'row',backgroundColor: 'azure', borderRadius: 10, alignItems: 'center', alignContent: 'center'}}>
        { !user?.login ? <AntDesign name="user" size={90} color='#06B6D4' />
        : <Image size="lg" alt={user?.login || 'user profile image'} style={[image.container]} source={{uri: user?.avatar_url}} />
        }
      <Box style={{flex: 1, alignContent: 'center', alignContent: 'center'}}>
          <Heading style={{ fontSize: 21, textAlign: 'center' }} size="lg"> {user?.login || 'GitHub Finder'}</Heading>
           <Button ml={4} mr={4} variant="outline" leftIcon={<Icon as={AntDesign} name="forward" size="lg" />} onPress={ handleMoreData }>More Data </Button>
      </Box>
      </Box>
    </Box>
  
    <Box mt={2} style={{backgroundColor: 'white', borderRadius: 10}}>
      <Input onChangeText={ handleGithubSearchDelay } style={{borderColor: 'red', borderWidth: 0, borderRadius:3 }} label='Github User Name' placeholder='Github Username' ref={userNameRef}
          rightButton={ <Button size="md" style={{paddingLeft: 20, paddingRight: 20}} leftIcon={<Icon as={MaterialIcons} name="person-search" size="lg" />} onPress={() => handleGithubSearch() }>{""}</Button> }
      ></Input>
    </Box>
</Box>

<Spacer  />

{ user ? (<>
  <Box m={1} style={{flexDirection: 'row'}}>
    <Button style={{flex: 1, borderWidth: 1, borderColor: '#ddd'}} m={1} variant="subtle" leftIcon={<Icon as={Ionicons} name="cloud-upload-outline" size="lg" />} onPress={ handleSave }>Save to Database </Button>      
    <Button style={{flex: 1}} m={1} variant="outline" leftIcon={<Icon as={FontAwesome} name="save" size="lg" />} onPress={ handleLocalStorageStoreUser }>Save to Local </Button> 
  </Box>
  <Spacer />
  </>) : null
}
<Spacer  />
<Center rounded="xs" shadow={1}>
  <Heading>Latest From Database:</Heading>
  { userArr.slice(0).reverse().map( (x, i) => (<Text key={x.key || i}>{x.login}</Text>) ) }
</Center>
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



