
import React, { useState, useRef,  useEffect } from 'react';
import { StatusBar, useWindowDimensions, Image as NativeImage,StyleSheet, ImageBackground, KeyboardAvoidingView, TouchableOpacity  as NativeButton, TouchableHighlight as NativeButton2, View, Dimensions, Animated} from 'react-native';
import {ScrollView, AspectRatio , Heading, Text, Flex,Center, Box, Spacer , Button, Icon, Image, NativeBaseProvider, Container,} from "native-base";
import { AntDesign, Ionicons, Zocial, FontAwesome, MaterialIcons, Entypo } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';


import { MainPageContainer, PageContainer, Input, Carousel, MovieCard } from '../../../../../Components';
import {useGoBack, useGoTo, useNavigation} from '../../../../../Hooks';
import { useAuthDispatch, useSelectorAuth, useSelectorMovies, useMovieDispatch } from '../../../../../reducers';
import { Axios } from '../../../../../Api';


//const WINDOW_HEIGHT = Dimensions.get("window").height;

export default function MyHome({ navigation }){
    const WINDOW_HEIGHT = useWindowDimensions().height;
    const auth = useSelectorAuth();
    const { AddRemoveFavorite } = useMovieDispatch();
    const moviesSelector = useSelectorMovies();
    const [selectedMovie, setSelectedMovie] = useState({id:null, title: null, image: null, type: null, year: null});
    const [topMovies, setTopMovies] = useState([]);
    const [newMovies, setNewMovies] = useState([]);

    const isFocused = useIsFocused();

    useEffect(()=>{
      try{
        handleSetNewMovies();
        handleSetTopMovies();
      }catch(e){ alert('Sorry, No server Result'); }
    }, []);


const render = () => (<>
<PageContainer> 
  <ScrollView style={{ minHeight: WINDOW_HEIGHT*0.825}}>
    <StatusBar style="auto" backgroundColor={isFocused ? '#010101' : null} />
    <Box style={{  flex: 1, display: 'flex', flexDirection: 'column', minHeight: WINDOW_HEIGHT*0.825}}> 

      <Box style={{  flex: 2.1, paddingTop: 15, minHeight: 180 }}>
        <Text lineHeight={'xs'} >Recommended Movies</Text>
        <Carousel data={topMovies} onPress={(movie) => { handleSetSelectedMovie(movie) }} additionalBox={ (movie) => (<NativeButton2 onPress={() => {  handleStarPress(movie) }}><Center style={{backgroundColor: '#2D2D2D', minHeight: 26,borderTopWidth: 1, borderColor: '#2F2F2F', borderBottomRightRadius: 2, borderBottomLeftRadius: 2}}><Icon as={Entypo} name="star" size={6} color={ moviesSelector.favorites.find(x => x.id === movie.id)? '#E40412' : '#f1f1f1' } /></Center></NativeButton2>) }/>
      </Box>

      <Box style={{ flex: 4, paddingTop: 10, paddingBottom:10, minHeight: 250}}>
              <Text lineHeight={'sm'}>Movie Description</Text>
              <MovieCard movie={selectedMovie}/>
      </Box>

      <Box style={{  flex: 1.8, paddingTop: 5, minHeight: 180 }}>
        <Text>New Movies</Text>
        <Carousel data={newMovies} onPress={(movie) => { handleSetSelectedMovie(movie) }} />
      </Box>

    </Box>
  </ScrollView>
</PageContainer>
</>)

async function handleSetNewMovies(){
  const result = await Axios('GET', '/api/movie/new', {}, {});
  setNewMovies(result);
}

async function handleSetTopMovies(){
  const result = await Axios('GET', '/api/movie/top', {}, {});
  if(result[0]) setSelectedMovie(result[0]);
  setTopMovies(result);
}

function handleSetSelectedMovie(movie){ setSelectedMovie(movie); }

function handleStarPress(movie){ AddRemoveFavorite(movie); }



return render();}
