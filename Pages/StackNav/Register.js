
import React, { useState, useRef,  useEffect } from 'react';
import { useWindowDimensions, ImageBackground, KeyboardAvoidingView, Button as NativeButton} from 'react-native';
import { ScrollView, Heading, Text, Flex,Center, Box, Spacer , Button, Icon, Image, NativeBaseProvider, Container,} from "native-base";
import { AntDesign, Ionicons, Zocial, FontAwesome, MaterialIcons, Entypo } from '@expo/vector-icons';
import { MainPageContainer, PageContainer, Input } from '../../Components';
import {useGoBack, useGoTo, useNavigation} from '../../Hooks';
import backgroundImage  from '../../assets/background.png'
import { useAuthDispatch, useSelectorAuth } from '../../reducers';
import { Axios } from '../../Api'

export default function Register(){
  const authDispatch = useAuthDispatch();
  const auth = useSelectorAuth();
  const goTo = useGoTo();
  const nameRef = useRef();
  const passwordRef = useRef();
  const password2Ref = useRef();
  const buttonRef = useRef();

  useEffect(() => {
    nameRef.current?.focus();
  }, [])
const render = () => (<PageContainer index statusBar><ImageBackground source={backgroundImage} resizeMode="cover" style={{justifyContent: "space-around", flex: 1, padding: 20}} imageStyle={{ borderRadius: 12}}>
    <ScrollView>
      <Heading style={{marginVertical: 30}} size={'3xl'}>Menora Flix</Heading>
      <Text style={{marginVertical: 7}} fontSize='3xl'>Register</Text>
      <Input ref={nameRef} label="username" onSubmit={() => passwordRef.current?.focus()} />
      <Input ref={passwordRef} label="password" onSubmit={() => password2Ref.current?.focus()} />
      <Input ref={password2Ref} label="password approve" onSubmit={() => buttonRef.current?.focus()} />
      <Button ref={buttonRef} onPress={ handlePressRegister } style={{marginTop: 35}}>Register</Button>
      <Button onPress={ handlePressLogin }>move to Login</Button>
  </ScrollView>
</ImageBackground></PageContainer>)

async function handlePressRegister(){
  const name = nameRef.current.getValue();
  const password = passwordRef.current.getValue();
  const password2 = password2Ref.current.getValue();
  if(password.trim() !== password2.trim()){return;}

  const data = {name: name, password: password}
  try{


  }catch(e){  }
  await Axios('POST', '/api/login/register', data, {});
  // const data = {name: 'arthur'};
  // authDispatch.SetAuth(data, ()=> goTo('Login'));
  //goTo('Login');
}


function handlePressLogin(){
  // const data = {name: 'arthur'};
  // authDispatch.SetAuth(data, ()=> goTo('Login'));
  goTo('Login');
}


return render();}
