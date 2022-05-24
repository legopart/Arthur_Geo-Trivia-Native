
import React, { useState, useRef,  useEffect } from 'react';
import { Image as NativeImage,StyleSheet, ImageBackground, KeyboardAvoidingView, Button as NativeButton, View, Dimensions, Animated} from 'react-native';
import {ScrollView, AspectRatio , Heading, Text, Flex,Center, Box, Spacer , Button, Icon, Image, NativeBaseProvider, Container,} from "native-base";
import { AntDesign, Ionicons, Zocial, FontAwesome, MaterialIcons, Entypo } from '@expo/vector-icons';
import 'react-native-gesture-handler';

import { MainPageContainer, PageContainer, Input } from '../../../../Components';
import {useGoBack, useGoTo, useNavigation} from '../../../../Hooks';
import { useAuthDispatch, useSelectorAuth } from '../../../../reducers';

const WINDOW_HEIGHT = Dimensions.get("window").height;

export default function MyHome(){
    const auth = useSelectorAuth();
const render = () => (<>
<PageContainer statusbarColor={'#010101'}>
    <ScrollView style={{ minHeight: WINDOW_HEIGHT*0.825}}>

  <Box style={{  flex: 1, display: 'flex', flexDirection: 'column', minHeight: WINDOW_HEIGHT*0.825}}> 


    <Box style={{  flex: 2.1, paddingTop: 15, minHeight: 180 }}>
      <Text lineHeight={'xs'} >Recommended Movies</Text>
      <Carousel data={images} additionalBox={
          <Center style={{backgroundColor: '#2D2D2D', minHeight: 26,borderTopWidth: 1, borderColor: '#2F2F2F', borderBottomRightRadius: 2, borderBottomLeftRadius: 2}}>
            <Icon as={Entypo} name="star" size={6} color={'white'} />
          </Center>
      }/>
    </Box>

    <Box style={{ flex: 4, paddingTop: 5, minHeight: 250}}>
            <Text lineHeight={'sm'}>Movie Description</Text>
            <Box style={{flexDirection: 'row', height: '100%', maxHeight: '90%'}}>
              <Box style={{flex: 1, margin: 7,}}>
                <ImageBackground source={{ uri: images[0]?.image }} resizeMode="cover" style={{justifyContent: "space-around", flex: 1}} imageStyle={{ borderRadius: 7}}></ImageBackground>
              </Box>
              <Box style={{flex: 1, margin: 7, backgroundColor: '#272727', borderRadius: 7}}>
                <Center pt={4}><Text bold fontSize={'sm'} numberOfLines={2} ellipsizeMode={'tail'}>Superman Returns</Text></Center>
                <Box pb={5} style={{flex: 1, justifyContent: 'center'}}>
                  <Text numberOfLines={1} ellipsizeMode={'tail'}>Year: 2016</Text>
                  <Text numberOfLines={1} ellipsizeMode={'tail'}>imdbID: tt00348150</Text>
                  <Text numberOfLines={1} ellipsizeMode={'tail'}>Type: movie</Text>
                </Box>
              </Box>
            </Box>
    </Box>

    <Box style={{  flex: 1.8, paddingTop: 5, minHeight: 180 }}>
      <Text>New Movies</Text>
      <Carousel data={images} />
    </Box>


</Box>

    </ScrollView>
</PageContainer>
</>)
return render();}



const WINDOW_WIDTH = Dimensions.get("window").width > 450 ? 450 : Dimensions.get("window").width;

const CONTAINER_WIDTH = WINDOW_WIDTH /3.15;
const CORNER_DISTANCE = 15;//(width - CONTAINER_WIDTH) * 0.25;
const TOP_SPACE = 2;


function Carousel({additionalBox, data, ...props}) {
  const scrollX = useRef(new Animated.Value(0)).current;
  const imageSizes = {minWidth: 115, minHeight: 125}
  const styles = StyleSheet.create({posterImage: { ...imageSizes,  resizeMode: "cover", width: 'auto', height: 'auto', ...(additionalBox? {borderRadius : 2} : {borderTopRightRadius: 2, borderTopLeftRadius: 2} ) }, });
return (<Animated.FlatList
  data={data} keyExtractor={(item) => item.key} 
  showsHorizontalScrollIndicator={false} horizontal={true} snapToAlignment="start" contentContainerStyle={{  paddingHorizontal: CORNER_DISTANCE }} snapToInterval={CONTAINER_WIDTH} decelerationRate={0} scrollEventThrottle={16}
  onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: true })}
  renderItem={({ item, index }) => { 
    const inputRange = [ (index - 20) * CONTAINER_WIDTH, index * CONTAINER_WIDTH, (index + 20) * CONTAINER_WIDTH,]; const scrollY = scrollX.interpolate({ inputRange, outputRange: [20, 0, 20],});
    return (<Box style={{ width: CONTAINER_WIDTH }}>
        <Animated.View style={{ marginHorizontal: TOP_SPACE, padding: TOP_SPACE, alignItems: "center",transform: [{translateY: scrollY}]}}>
          <Box style={[{ ...imageSizes }, {width: 'auto', height: '100%', zIndex: 5}]} >
            <Image alt='aaa' {...props}  source={{ uri: item.image }} style={styles.posterImage} />
            {additionalBox}         
          </Box>
        </Animated.View>
      </Box>);
  }} />);
}





const images = [
  {
    key: 0
    , image: "https://images.unsplash.com/photo-1559494007-9f5847c49d94?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
    , text: 'T1'
  }
  ,{
    key: 1
    , image: "https://images.unsplash.com/photo-1506477331477-33d5d8b3dc85?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2425&q=80"
    , text: 'T2'
  }
  ,{
    key: 2
    , image: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=652&q=80"
    , text: 'T3'
  }
  ,{
    key: 3
    , image: "https://images.unsplash.com/photo-1506477331477-33d5d8b3dc85?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2425&q=80"
    , text: 'T4'
  }
  ,{
    key: 4
    , image: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=652&q=80"
    , text: 'T5'
  }
];

