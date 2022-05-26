
import React, { useState, useRef,  useEffect } from 'react';
import { useWindowDimensions, ImageBackground, KeyboardAvoidingView, Button as NativeButton} from 'react-native';
import { ScrollView, Heading, Text, Flex,Center, Box, Spacer , Button, Icon, Image, NativeBaseProvider, Container,} from "native-base";
import { AntDesign, Ionicons, Zocial, FontAwesome, MaterialIcons, Entypo } from '@expo/vector-icons';
import { MainPageContainer, PageContainer, Input } from '../../Components';
import {useGoBack, useGoTo, useNavigation} from '../../Hooks';
import backgroundImage  from '../../assets/background.png'
import { useAuthDispatch, useSelectorAuth } from '../../reducers';
import { Axios } from '../../Api';

export default function Register(){
  const authDispatch = useAuthDispatch();
  const auth = useSelectorAuth();
  const goTo = useGoTo();
  const nameRef = useRef();
  const passwordRef = useRef();
  const password2Ref = useRef();
  const buttonRef = useRef();
  const [errorMessage, setErrorMessage] = useState();
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
      <Box><Text>{errorMessage}</Text></Box>
  </ScrollView>
</ImageBackground></PageContainer>)

async function handlePressRegister(){
  const name = nameRef.current.getValue();
  const password = passwordRef.current.getValue();
  const password2 = password2Ref.current.getValue();
  async function nameError(val){nameRef.current?.setError(val);}
  async function passwordError(val){passwordRef.current?.setError(val);}
  async function password2Error(val){password2Ref.current?.setError(val);}

  setErrorMessage('');
  await nameError('');
  await passwordError('');
  await password2Error('');
  /* *
  const patternName = /^[A-Za-z]{8,}$/;
  const patternPassword = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;
  if(name === ''){await nameError('no username set');return;}
  if(name.length <= 8){await nameError('must contain at least 8 chars');return;}
  if(!patternName.test(name)){await nameError('must contain only letters');return;}
  if(password === ''){await passwordError('no password set');return;}
  if(password.length <= 6){await passwordError('must contain at least 6 chars');return;}
  if(!patternPassword.test(password)){await passwordError('must contain 1 special char, 1number');return;}
  if(password !== password2){password2Ref.current?.setError('passwords not match');return;}
  /* */

  
  try{
      const data = {name: name, password: password};
      const result = await Axios('POST', '/api/login/register', data, {});
      if(!result) throw 'Registration fail!';
    
      goTo('Login', data);
  }catch(e){ setErrorMessage(e); }
}


function handlePressLogin(){
  goTo('Login');
}


return render();}
