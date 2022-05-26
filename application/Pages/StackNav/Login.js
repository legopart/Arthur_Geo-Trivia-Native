
import React, { useState, useRef,  useEffect } from 'react';
import { useWindowDimensions, ImageBackground, KeyboardAvoidingView, Button as NativeButton} from 'react-native';
import { ScrollView, Heading, Text, Flex,Center, Box, Spacer , Button, Icon, Image, NativeBaseProvider, Container,} from "native-base";
import { AntDesign, Ionicons, Zocial, FontAwesome, MaterialIcons, Entypo } from '@expo/vector-icons';
import { MainPageContainer, PageContainer, Input } from '../../Components';
import {useGoBack, useGoTo, useNavigation} from '../../Hooks';
import backgroundImage  from '../../assets/background.png'
import { useAuthDispatch, useSelectorAuth } from '../../reducers';

export default function Login(){
  const authDispatch = useAuthDispatch();
  const auth = useSelectorAuth();
  const goTo = useGoTo();
  
const render = () => (<PageContainer index statusBar><ImageBackground source={backgroundImage} resizeMode="cover" style={{justifyContent: "space-around", flex: 1, padding: 20}} imageStyle={{ borderRadius: 12}}>
    <ScrollView>
      <Heading style={{marginVertical: 30}} size={'3xl'}>Menora Flix</Heading>
      <Text style={{marginVertical: 7}} fontSize='3xl'>Login</Text>
      <Input label="username" />
      <Input label="password" />
      <Button style={{marginTop: 35}}>Login</Button>
      <Button onPress={ handlePressMyHome }>MyHome</Button>
      
      <Box><Text>{auth.auth?.name}</Text></Box>
  </ScrollView>
</ImageBackground></PageContainer>)


function handlePressMyHome(){
  const data = {name: 'arthur'};
  authDispatch.SetAuth(data);
}

function handlePressRegister(){
  goTo('Register');
}


return render();}
