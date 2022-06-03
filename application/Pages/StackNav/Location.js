

import React, { useState, useRef,  useEffect, Component } from 'react';
import { StyleSheet, useWindowDimensions, ImageBackground, KeyboardAvoidingView, Button as NativeButton} from 'react-native';
import {  StatusBar, ScrollView, Heading, Text, Flex,Center, Box, Spacer , Button, Icon, Image, NativeBaseProvider, Container, View} from "native-base";
import { AntDesign, Ionicons, Zocial, FontAwesome, MaterialIcons, Entypo } from '@expo/vector-icons';


import { MainPageContainer, PageContainer, Input, MovieCard } from '../../Components';
import {useGoBack, useGoTo, useNavigation} from '../../Hooks';
import { useAuthDispatch, useSelectorAuth, useSelectorMovies, useMovieDispatch, } from '../../reducers';


 import MapboxGL, { MapView, Camera, MarkerView,} from '@rnmapbox/maps';

//import com.mapbox.rctmgl.RCTMGLPackage;
const accessToken = 'pk.eyJ1IjoibGVnb3BhcnQiLCJhIjoiY2wxeG55d3QwMDRqMTNjbHB6bTlraGo3cCJ9.-FqKk-KjHlpmJ54YSpN5Dg'
MapboxGL.setAccessToken(accessToken);
MapboxGL.setConnected(true);
MapboxGL.setTelemetryEnabled(false);



const coordinates = [
   [34.8516, 31.0461],
]

export default function Location () {
  
const render = () => {return (<PageContainer topCorners statusBar title='Choose Location'> 


  <View style={{flex: 1, width: '100%', maxHeight: 300}}><MapView ref={(c) => _map = c} style={{flex: 1}} zoomLevel={11} showUserLocation={true} /*userTrackingMode={1}*/ compassEnabled={false} zoomEnabled={true} centerCoordinate={[31.0461, 34.8516]}>
    <Camera centerCoordinate={[34.8516, 31.0461]} zoomLevel={4} defaultSettings={{ centerCoordinate: [34.8516, 31.0461], zoomLevel: 11 }} />

    <MarkerView coordinate={[34.8516, 31.0461]} anchor={{ x: 0.5, y: 0.5 }}>
      <View style={{flexDirection: 'row'}}>
        <View style={{  maxWidth: 40, maxHeight: 40, borderRadius: 10,}}><Image alt="area" source={require('../../assets/marker.png')} style={{  width: 40, height: 40, }}/></View>
      </View>
      {/* <MapboxGL.Callout title="Hello world!" style={{color: 'black'}} /> */}
    </MarkerView>

    {/* <MapboxGL.PointAnnotation id="annotation-hidden" coordinate={[34.8516, 31.0461]} style={{backgroundColor: 'white'}}>
          <MapboxGL.Callout title="A popup that is shown when you click on a marker" style={{color: 'white'}}/> 
    </MapboxGL.PointAnnotation> */}
</MapView></View>


</PageContainer> );}

return render()}







const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  container: {
    height: 300,
    width: 300,
    backgroundColor: 'tomato'
  },
  map: {
    flex: 1
  },
    dot: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
});