import React, { useState, useRef,  useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';

import { Platform, StatusBar as StatusBarAndroid, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { Text, View,  KeyboardAvoidingView} from 'react-native';

import { Input } from './Tags'

import {AntDesign, Ionicons, Zocial, FontAwesome, MaterialIcons  } from '@expo/vector-icons';

import axios from 'axios';




import { 
  Heading, Flex,Center, NativeBaseProvider, Box, Spacer , Button, Icon
, Image
} 
from "native-base";

const GITHUB_API = 'https://api.github.com/users';
const DATABASE = 'https://w3arthurdb-default-rtdb.firebaseio.com/users.json';

export default function App() {
  
  const [user, setUser]=useState([ ]);
  const [userArr, setUserArr]=useState([ ]);
  const userNameRef = useRef()



  function handleGithubSearch(userName = userNameRef.current.getValue()){ errorHandler(async() =>{
        const response = await axios.get(GITHUB_API + '/' + userName);

        setUser(response.data); 


 

  } ); }

  function handleSave(){ errorHandler(async() =>{
      const data = user;
      const response = await axios.post(DATABASE, data);
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



  useEffect(() => {
    handleGithubSearch('w3arthur')
  }, []);




  const [imageDisplay, setImageDisplay] = useState(true);


return (
<SafeAreaView style={styles.globalContainer}>
<StatusBar style="auto" />
<KeyboardAvoidingView style={styles.preContainer}>
<View style={styles.container}>
  <Text>© Arthur Zarankin</Text>
<NativeBaseProvider><ScrollView>



<Center>
  <AntDesign name="user" size={40} color="black" />
  <Heading size="md"> GitHub Finder</Heading>
</Center>


<Flex direction="row" mb="2" style={{width:'100%',}}>
          
    <Button m={1} variant="subtle" leftIcon={<Icon as={Ionicons} name="cloud-upload-outline" size="lg" />} onPress={() => { handleSave(); } }>Save to Database </Button>      
    <Button m={1} variant="outline" leftIcon={<Icon as={Ionicons} name="cloud-upload-outline" size="lg" />} onPress={() => {  } }>Save to Local </Button> 

          </Flex>
<Spacer />



  
    <Box><Input placeholder='Please insert the user name' ref={userNameRef} ></Input></Box>
    <Box><Button size='lg' colorScheme="primary" leftIcon={<Icon as={MaterialIcons} name="person-search" size="lg" />} onPress={() => { handleGithubSearch(); } }>Search UserName</Button></Box>
<Spacer />

<Center m={2}>
  <View><Image size="xl" alt={user?.login} style={[image.container]} source={{uri: user?.avatar_url}} /></View>
  <Heading size="md">{user?.login}</Heading>
</Center>

  <Spacer />

<Center rounded="xs"  shadow={1}>
sds

</Center>
  {/*

      <Button title={imageDisplay ? 'hide': 'show'} onPress={() => { setImageDisplay(!imageDisplay) } } />
      {
      imageDisplay ?
        (<View><Image  style={[image.container, image.image]} source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Gull_portrait_ca_usa.jpg'}} /></View>)
        : (<></>)  
      }
      {imageDisplay.toString()}

  */}{/* source={require('')}*/}


</ScrollView></NativeBaseProvider>
  <Text style={{textAlign: 'right'}}>© Arthur Zarankin</Text>
</View></KeyboardAvoidingView>
</SafeAreaView>);
}



const image = StyleSheet.create({
  container: { borderWidth: 3,  borderColor: '#000', backgroundColor: '#000', borderRadius: 10 }
  , image: { width: 100, height: 100 }
});


const styles = StyleSheet.create({
  black: {backgroundColor: '#000'}
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


async function errorHandler(callback){
    try{ await callback()
  }catch(e){
    alert('server fail')
  }
}
