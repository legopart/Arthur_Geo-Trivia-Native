
import React, { useState, useRef,  useEffect } from 'react';
import {ImageBackground, KeyboardAvoidingView, Button as NativeButton} from 'react-native';
import { StatusBar, ScrollView, Heading, Text, Flex,Center, Box, Spacer , Button, Icon, Image, NativeBaseProvider, Container,} from "native-base";
import { AntDesign, Ionicons, Zocial, FontAwesome, MaterialIcons, Entypo } from '@expo/vector-icons';


import { MainPageContainer, PageContainer, Input } from '../../../../Components';
import {useGoBack, useGoTo, useNavigation} from '../../../../Hooks';
import { useAuthDispatch, useSelectorAuth, useSelectorMovies, useMovieDispatch } from '../../../../reducers';


import { useIsFocused, useFocusEffect } from '@react-navigation/native';

export default function Favorites(){
    const isFocused = useIsFocused();
    const movies = useSelectorMovies()
const render = () => (<>
<PageContainer>
    <ScrollView>
        <StatusBar style="auto" backgroundColor={isFocused ? '#E40412': null} />
            <Box>Favorites</Box>
            <Box>{JSON.stringify(movies)}</Box>
    </ScrollView>
</PageContainer>
</>)
return render();}