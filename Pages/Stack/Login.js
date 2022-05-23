
import React, { useState, useRef,  useEffect } from 'react';
import {ImageBackground, KeyboardAvoidingView, Button as NativeButton} from 'react-native';
import { ScrollView, Heading, Text, Flex,Center, Box, Spacer , Button, Icon, Image, NativeBaseProvider, Container,} from "native-base";
import { AntDesign, Ionicons, Zocial, FontAwesome, MaterialIcons, Entypo } from '@expo/vector-icons';
import 'react-native-gesture-handler';

import { MainPageContainer, PageContainer, Input } from '../../Components';
import {useGoBack, useGoTo, useNavigation} from '../../Hooks';
import { ReduxProvider } from '../../reducers';
import backgroundImage  from '../../assets/background.png'


export default function Login(){
return (<PageContainer index><ImageBackground source={backgroundImage} resizeMode="cover" style={{justifyContent: "space-around", flex: 1, padding: 20}} imageStyle={{ borderRadius: 12}}>
    <ScrollView>
      <Heading style={{marginVertical: 30}} size={'3xl'}>Menora Flix</Heading>
      <Text style={{marginVertical: 7}} fontSize='3xl'>Login</Text>
      <Input selectionColor={'white'} label="username" />
      <Input label="password" />
      <Button style={{marginTop: 35}}>Login</Button>
  </ScrollView>
</ImageBackground></PageContainer>)
}
