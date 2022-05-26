
import React, { useState, useRef,  useEffect } from 'react';
import { useWindowDimensions, ImageBackground, KeyboardAvoidingView, Button as NativeButton} from 'react-native';
import { ScrollView, Heading, Text, Flex,Center, Box, Spacer , Button, Icon, Image, NativeBaseProvider, Container,} from "native-base";
import { AntDesign, Ionicons, Zocial, FontAwesome, MaterialIcons, Entypo } from '@expo/vector-icons';
import { MainPageContainer, PageContainer, Input } from '../../Components';
import {useGoBack, useGoTo, useNavigation} from '../../Hooks';
import backgroundImage  from '../../assets/background.png'
import { useAuthDispatch, useSelectorAuth } from '../../reducers';
import {useRoute} from '@react-navigation/native';
import { Axios } from '../../Api';

export default function Login(){

  const route = useRoute(); //route.params
  const authDispatch = useAuthDispatch();
  const auth = useSelectorAuth();
  const goTo = useGoTo();
  const nameRef = useRef();
  const passwordRef = useRef();
  const buttonRef = useRef();
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(()=>{
    if(route.params){
      const {name, password} = route.params;
      (async() =>{
        await nameRef.current.setValue(name);
        await passwordRef.current.setValue(password);
      })()
    }
    else nameRef.current?.focus();
  }, []);


const render = () => (<PageContainer index statusBar><ImageBackground source={backgroundImage} resizeMode="cover" style={{justifyContent: "space-around", flex: 1, padding: 20}} imageStyle={{ borderRadius: 12}}>
    <ScrollView>
      <Heading style={{marginVertical: 30}} size={'3xl'}>Menora Flix</Heading>
      <Text style={{marginVertical: 7}} fontSize='3xl'>Login</Text>
      <Input ref={nameRef} label="username" />
      <Input ref={passwordRef} label="password" />
      <Button ref={buttonRef} onPress={ handlePressLogin } style={{marginTop: 35}}>Login</Button>
      <Button onPress={ handlePressMyHome }>MyHome</Button>
      <Button onPress={ handlePressRegister }>move to Register</Button>
      <Box><Text>{errorMessage}</Text></Box>
  </ScrollView>
</ImageBackground></PageContainer>)


async function handlePressMyHome(){
  authDispatch.SetAuth({name: 'arthur'});
}

async function handlePressLogin(){
  const name = nameRef.current.getValue();
  const password = passwordRef.current.getValue();
  async function nameError(val){nameRef.current?.setError(val);}
  async function passwordError(val){passwordRef.current?.setError(val);}
  
  setErrorMessage('');
  await nameError('');
  await passwordError('');

  /* *
  const patternName = /^[A-Za-z]{8,}$/;
  const patternPassword = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;
  if(name === ''){await nameError('no username set');return;}
  if(name.length <= 8){await nameError('must contain at least 8 chars');return;}
  if(!patternName.test(name)){await nameError('must contain only letters');return;}
  if(password === ''){await passwordError('no password set');return;}
  if(password.length <= 6){await passwordError('must contain at least 6 chars');return;}
  if(!patternPassword.test(password)){await passwordError('must contain 1 special char, 1number');return;}
  /* */

  try{
      const data = {name: name, password: password};
      const result = await Axios('POST', '/api/login/', data, {});
      if(!result) throw 'Login fail!';
      authDispatch.SetAuth(result);
  }catch(e){ setErrorMessage(e); }
}




async function checkAccessToken(){

  try{
      const result = await Axios('PATCH', '/api/login/', data, {});
      if(!result) throw 'Login fail!';
      authDispatch.SetAuth(result);
  }catch(e){  }


  new DatabaseRequest( () => tokenRenewApi() )
    .GoodResult( (result) => {
      if(!result._id || !result.accessToken) return;
      setAuth( result ); goFrom();
      } )
    .Build(setAxiosLoading);
}


function handlePressRegister(){
  goTo('Register');
}


return render();}
