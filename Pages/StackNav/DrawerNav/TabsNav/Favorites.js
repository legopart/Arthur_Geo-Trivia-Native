
import React, { useState, useRef,  useEffect } from 'react';
import { useWindowDimensions, ImageBackground, KeyboardAvoidingView, Button as NativeButton} from 'react-native';
import { StatusBar, ScrollView, Heading, Text, Flex,Center, Box, Spacer , Button, Icon, Image, NativeBaseProvider, Container,} from "native-base";
import { AntDesign, Ionicons, Zocial, FontAwesome, MaterialIcons, Entypo } from '@expo/vector-icons';


import { MainPageContainer, PageContainer, Input, MovieCard } from '../../../../Components';
import {useGoBack, useGoTo, useNavigation} from '../../../../Hooks';
import { useAuthDispatch, useSelectorAuth, useSelectorMovies, useMovieDispatch, } from '../../../../reducers';


import { useIsFocused, useFocusEffect } from '@react-navigation/native';

export default function Favorites({navigation}){

    const isFocused = useIsFocused();
    const moviesSelector = useSelectorMovies()
    const { ClearStarsFavMovies } = useMovieDispatch();
    const WINDOW_HEIGHT = useWindowDimensions().height;

    useEffect(() => {
    return navigation.addListener('focus', () => {
        ClearStarsFavMovies();
    });
    }, [navigation]);


const render = () => (<>
<PageContainer topCorners>
    <Box><Text>Favorites</Text></Box>
    <ScrollView>
        <StatusBar style="auto" backgroundColor={isFocused ? '#E40412': null} />
            <Box>
             <Box style={{padding: 2}}>{
                 !moviesSelector ? 'Empty' :
                moviesSelector.favorites.map((movie) =>
                    <Box key={movie.id} style={{ height: (WINDOW_HEIGHT*0.84)/ 2.40  ,minHeight: 240, flex: 1}}>
                        <Box><Text numberOfLines={1}>{movie.title}</Text></Box>
                        <Box style={{flex: 1 ,maxHeight: '90%'}}><MovieCard movie={movie}/></Box>
                    </Box>
                )
            
            }
            </Box>
        </Box>
    </ScrollView>
</PageContainer>
</>)
return render();}