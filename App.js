import React, { useState, useRef,  useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Platform, StatusBar as StatusBarAndroid, SafeAreaView, StyleSheet, ViewPagerAndroidBase } from 'react-native';
import { Text as NativeText, View as NativeView,  KeyboardAvoidingView} from 'react-native';
import { Input } from './Tags'
import {AntDesign, Ionicons, Zocial, FontAwesome, MaterialIcons, Entypo  } from '@expo/vector-icons';
import axios from 'axios';

import { ScrollView, Heading, Text, Flex,Center, Box, Spacer , Button, Icon, Image, NativeBaseProvider
, Container,

} from "native-base";

import { NavigationContainer } from '@react-navigation/native';


import {LinearGradient} from 'expo-linear-gradient';

const GITHUB_API = 'https://api.github.com/users';
const DATABASE = 'https://w3arthurdb-default-rtdb.firebaseio.com/users.json';

// const initialLayout = {
//   width: Dimensions?.get("window")?.width
// };

// const renderScene = SceneMap({ first: FirstRoute, second: SecondRoute });

export default function App() {
  const [user, setUser]=useState();
  const [userArr, setUserArr]=useState([ ]);
  const userNameRef = useRef();
  //all functions:
  const allVars = {user, setUser, userArr, setUserArr, userNameRef};
  const {handleSave, handleGetAllSearches, handleGithubSearch} = globalFunctions(allVars);

  useEffect(() => {
    handleGithubSearch('w3arthur');
    handleGetAllSearches();
    userNameRef.current?.focus();
  }, []);

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "first", title: "Tab 1" }
    , { key: "second", title: "Tab 2" }
  ]);

return (
<SafeAreaView style={styles.globalContainer}><StatusBar style="auto" /><KeyboardAvoidingView style={styles.preContainer}><NativeView style={styles.container}>
<NativeText>© Arthur Zarankin</NativeText>
<NativeBaseProvider config={globalStyleConfig}><ScrollView>

<Box p={2} style={{borderRadius: 3}} bg={gradientBackground}>
  <Center>
    <AntDesign name="user" size={40} color='#06B6D4' />
    <Heading size="md"> GitHub Finder</Heading>
  </Center>
</Box>

<Box><Input  style={{borderColor: 'red', borderWidth: 0, borderRadius:3 }} label='Github User Name' placeholder='Github Username' ref={userNameRef} ></Input></Box>

<Box><Button size='lg' colorScheme="primary" leftIcon={<Icon as={MaterialIcons} name="person-search" size="lg" />} onPress={() => { handleGithubSearch(); } }>Search UserName</Button></Box>

<Spacer />

<Center m={2}>
  <NativeView><Image size="lg" alt={user?.login || 'user profile image'} style={[image.container]} source={{uri: user?.avatar_url}} /></NativeView>
  <Heading size="md">{user?.login || '*no user found'}</Heading>
</Center>

<Spacer  />

<Center rounded="xs" shadow={1}>
  <Heading>Latest From Database:</Heading>
{
  userArr.slice(0).reverse().map( (x, i) => (<Text key={x.key || i}>{x.login}</Text>) )
}
</Center>


<NavigationContainer>

  
</NavigationContainer>




<Spacer  />

{ user ? (<>
    <Flex direction="row" m={1} style={{width:'100%',}}>
      <Button m={1} variant="subtle" leftIcon={<Icon as={Ionicons} name="cloud-upload-outline" size="lg" />} onPress={() => { handleSave(); } }>Save to Database </Button>      
      <Button m={1} variant="outline" leftIcon={<Icon as={FontAwesome} name="save" size="lg" />} onPress={() => {  } }>Save to Local </Button> 
    </Flex>
    <Spacer />
    </>) : null
}

</ScrollView></NativeBaseProvider>
<NativeText style={styles.right}>© Arthur Zarankin</NativeText>
</NativeView></KeyboardAvoidingView></SafeAreaView>);
}



const FirstRoute = () => <Center flex={1} my="4">
    This is Tab 1
  </Center>;

const SecondRoute = () => <Center flex={1} my="4">
    This is Tab 2
  </Center>;



function globalFunctions(allVars){
  const {user, setUser, userArr, setUserArr, userNameRef} = allVars;

  function handleSave(){ errorHandler(async() =>{
      const data = user;
      const response = await axios.post(DATABASE, data);
      handleGetAllSearches(allVars);
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

  function handleGithubSearch(firstSetUser = undefined){ errorHandler(async() =>{
    try{
      const userName = firstSetUser || userNameRef.current.getValue();
      if(userName === '') throw new Error();
      const response = await axios.get(GITHUB_API + '/' + userName );
      setUser(response.data); 
      userNameRef.current?.empty();
    }catch(e){ 
      setUser();
      userNameRef.current?.focus();
      throw new Error();
    }
  } ); }

  return ({handleSave, handleGetAllSearches, handleGithubSearch});
}


async function errorHandler(callback){
    try{ await callback();
  }catch(e){
  }
}

const image = StyleSheet.create({
  container: { borderWidth: 3,  borderColor: '#000', backgroundColor: '#000', borderRadius: 10 }
  , image: { width: 100, height: 100 }
});


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

const gradientBackground = {
  linearGradient: {
    colors: ["lightBlue.600", "violet.400"],
    start: [0, 1],
    end: [1, 0]
  }
}



