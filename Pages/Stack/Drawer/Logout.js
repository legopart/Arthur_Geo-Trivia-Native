
import React, { useState, useRef,  useEffect } from 'react';
import {ImageBackground, KeyboardAvoidingView, Button as NativeButton} from 'react-native';
import { ScrollView, Heading, Text, Flex,Center, Box, Spacer , Button, Icon, Image, NativeBaseProvider, Container,} from "native-base";
import { AntDesign, Ionicons, Zocial, FontAwesome, MaterialIcons, Entypo } from '@expo/vector-icons';
import 'react-native-gesture-handler';

import { MainPageContainer, PageContainer, Input } from '../../../Components';
import {useGoBack, useGoTo, useNavigation} from '../../../Hooks';
import {useAuthDispatch} from '../../../reducers'


import Login from '../Login'
export default function Logout(){
    const authDispatch = useAuthDispatch();
    useEffect(()=>{
        authDispatch.ResetAuth();
    }, [])
return (<>



</>);
}