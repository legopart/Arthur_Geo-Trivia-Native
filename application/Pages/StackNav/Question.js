

import React, { useState, useRef,  useEffect, Component } from 'react';
import { StyleSheet, useWindowDimensions, ImageBackground, KeyboardAvoidingView, Button as NativeButton3, TouchableOpacity  as NativeButton, TouchableHighlight as NativeButton2} from 'react-native';

import {  Circle, StatusBar, ScrollView, Heading, Text, Flex,Center, Box, Spacer , Button, Icon, Image, NativeBaseProvider, Container, View} from "native-base";
import { AntDesign, Ionicons, Zocial, FontAwesome, MaterialIcons, Entypo } from '@expo/vector-icons';

import { MainPageContainer, PageContainer, Input, MovieCard } from '../../Components';
import {useGoBack, useGoTo, useNavigation} from '../../Hooks';
import { useAuthDispatch, useSelectorAuth, useSelectorMovies, useMovieDispatch, } from '../../reducers';






export default function Question () {
  
const render = () => {return (

<>
<PageContainer topCorners statusBar title='Haifa known as religion center for'> 


<Answer value={1} onPress={() => alert()}>KALTIT</Answer>
<Answer value={2} onPress={() => alert()}>Droze</Answer>
<Answer value={3} onPress={() => alert()}>Saintology</Answer>
<Answer value={4} onPress={() => alert()}>Habahaim</Answer>
   
</PageContainer> 
</>);}

return render()}


function Answer ({value, children, onPress, ...props}) {return (
<NativeButton2  onPress={onPress} style={{margin: 5, marginTop: 20, borderRadius: 20}}>
  <Box onPress={()=>alert()} width="100%" style={{borderRadius: 20}} bg="white" p="4" shadow={2} 
    _text={{ fontSize: "md", fontWeight: "bold", color: "black"}}>
    <Circle size="41px" shadow={3}  bg="white" style={{position: 'absolute' ,top: -20, left: 10, borderWidth: 3, borderColor: '#FFA500' }}>
      {value}
    </Circle>
    <Center>{children}</Center>    
  </Box>
</NativeButton2>
 );}




