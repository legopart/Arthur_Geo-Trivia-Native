import React, { useState, useRef,  useEffect } from 'react';
import { Platform, StatusBar as StatusBarAndroid, SafeAreaView, StyleSheet, ViewPagerAndroidBase } from 'react-native';
import { AntDesign, Zocial, FontAwesome, MaterialIcons, Entypo, Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { ScrollView, Heading, Text, Flex,Center, Box, Spacer , Button, Icon, Image, NativeBaseProvider, Container,} from "native-base";
import { PageContainer, Input } from '../Components'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

const FirstRoute = () => <Center flex={1} my="4">This is Tab 1</Center>;
const SecondRoute = () => <Center flex={1} my="4">This is Tab 2</Center>;

const GITHUB_API = 'https://api.github.com/users';
const DATABASE = 'https://w3arthurdb-default-rtdb.firebaseio.com/users.json';




export default function GithubAppTabs() {return (<>



    <Tab.Navigator style={{  }}>
      <Tab.Screen component={GithubApp} name='Git Hub Search' options={{ title: () => ( <Text>Git Hub Search</Text> ), }} />
      
      <Tab.Screen component={SecondRoute} name='Local Storage' options={{ title: () => ( <Text>Local Storage</Text> ), }} />
    </Tab.Navigator>

</>);


}


 function GithubApp() {
  const [user, setUser]=useState();
  const [userArr, setUserArr]=useState([ ]);
  const userNameRef = useRef();

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


const render = () => (<PageContainer>
<ScrollView>
  <Box p={2} style={{borderRadius: 10}} bg={gradientBackground}>
    <Center style={{backgroundColor: 'white', backfaceVisibility: '99%',justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'gray', borderRadius: 10}}>
      { !user?.login ? <AntDesign name="user" size={90} color='#06B6D4' style={{width: 90, height: 90,}} />
        : <Image size="lg" alt={user?.login || 'user profile image'} style={[image.container]} source={{uri: user?.avatar_url}} />
      }
      <Heading size="md"> {user?.login || 'GitHub Finder'}</Heading>
    </Center>
  
  <Box mt={2} mb={0} style={{backgroundColor: 'white', borderRadius: 10}}>
    
  
    <Input onChange={(e) => {/*handleGithubSearch(e.target.value);*/}} style={{borderColor: 'red', borderWidth: 0, borderRadius:3 }} label='Github User Name' placeholder='Github Username' ref={userNameRef}
        rightButton={ <Button size="md" style={{paddingLeft: 20, paddingRight: 20}} leftIcon={<Icon as={MaterialIcons} name="person-search" size="lg" />} onPress={() => handleGithubSearch() }>{""}</Button> }
    ></Input></Box>


</Box>

  <Spacer  />

  <Center rounded="xs" shadow={1}>
    <Heading>Latest From Database:</Heading>
  {
    userArr.slice(0).reverse().map( (x, i) => (<Text key={x.key || i}>{x.login}</Text>) )
  }
  </Center>

  <Spacer  />
  { user ? (<>
      <Flex direction="row" m={1} style={{width:'100%',}}>
        <Button m={1} variant="subtle" leftIcon={<Icon as={Ionicons} name="cloud-upload-outline" size="lg" />} onPress={() => { handleSave(); } }>Save to Database </Button>      
        <Button m={1} variant="outline" leftIcon={<Icon as={FontAwesome} name="save" size="lg" />} onPress={() => {  } }>Save to Local </Button> 
        <Button m={1} variant="outline" leftIcon={<Icon as={AntDesign} name="forward" size="lg" />} onPress={() => {  } }>More Data </Button> 
      </Flex>
      <Spacer />
      </>) : null
  }
</ScrollView>
</PageContainer>);


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

function handleGithubSearch(firstSetUser = undefined){ errorHandler(async() =>{
  try{
    const userName = firstSetUser || userNameRef.current.getValue();
    if(userName === '') throw new Error();
    const response = await axios.get(GITHUB_API + '/' + userName );
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



