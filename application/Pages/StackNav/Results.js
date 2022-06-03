

import React, { useState, useRef,  useEffect, Component } from 'react';
import { StyleSheet, useWindowDimensions, ImageBackground, KeyboardAvoidingView, Button as NativeButton} from 'react-native';
import {  StatusBar, ScrollView, Heading, Text, Flex,Center, Box, Spacer , Button, Icon, Image, NativeBaseProvider, Container, View} from "native-base";
import { AntDesign, Ionicons, Zocial, FontAwesome, MaterialIcons, Entypo } from '@expo/vector-icons';


import { MainPageContainer, PageContainer, Input, MovieCard } from '../../Components';
import {useGoBack, useGoTo, useNavigation} from '../../Hooks';
import { useAuthDispatch, useSelectorAuth, useSelectorMovies, useMovieDispatch, } from '../../reducers';






export default function Answer () {
  
const render = () => {return (<PageContainer topCorners statusBar title='Results'> 


<Box style={{flexDirection: 'row', padding: 10}}>

    <Box style={{flex: 2}}>

        <Image alt='Profile' rounded={'full'} source={require('../../assets/person.png')} style={{height: 70, width: 70, }}/>


    </Box>



    <Box style={{flex: 5,}}>
        <Center>
<Text color={'#6C059C'} bold >legopart@gmail.com</Text>
<Text color={'#6C059C'} bold >Score: 1pt</Text>
<Text color={'#6C059C'} bold >Right Answers 1/5 Questions</Text>
</Center>

    </Box>




</Box>

</PageContainer> );}

return render()}






