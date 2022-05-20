import React, { useState, useRef,  useEffect } from 'react';
import { Platform, StatusBarasStatusBarAndroid, SafeAreaView, StyleSheet, ViewPagerAndroidBase, View, Dimensions } from 'react-native';
import { AntDesign, Zocial, FontAwesome, MaterialIcons, Entypo, Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { ScrollView, Heading, Text, Flex,Center, Box, Spacer , Button, Icon, Image, NativeBaseProvider, Container,} from "native-base";
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { PageContainer, Input } from '../Components'
import { useGoTo, useLocalStorage } from '../Hooks'
import { debounce, createSQLite } from '../Api'
import AsyncStorage from '@react-native-async-storage/async-storage';
import LocalStorageUsers from './GithubFinderLocalStorage';
import jsonFile from '../openSky.json';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import {FlightsProvider, useFlights} from '../Context'
import { render } from 'react-dom';

//import { NavigationContainer } from '@react-navigation/native';
//import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const homeName = "Home";
const detailsName = "Details";



const Tab = createMaterialBottomTabNavigator();

const sqlite = createSQLite('flights.db');

function SearchFlightsPage(){

    const {flights} = useFlights();
    const longitudeRef = useRef();
    const latitudeRef = useRef();
    const distanceRef = useRef();
    const [flightList, setFlightList] = useState();
const render = () => (<PageContainer><ScrollView><Heading>Flights Searching</Heading>
<Box style={{flexDirection: 'row'}}>
  <Box style={{flex:1}}><Input label='longitude' ref={longitudeRef} onSubmit={() => {latitudeRef?.current?.focus();}} value='8.2594' /></Box>
  <Box style={{flex:1}}><Input label='latitude' ref={latitudeRef} onSubmit={() => {distanceRef?.current?.focus();}} value='46.8309' /></Box>
</Box>
  <Box style={{flexDirection: 'row'}}>
  <Box style={{flex:1}}><Input label='distance' ref={distanceRef} onSubmit={() => {}} value='1.31' /></Box>
  <Box style={{flex:1,  padding: 8, flexDirection: 'column-reverse' }}>
    {flights ? null: <Button onPress={handleSearch} style={{paddingLeft: -5}} leftIcon={<Icon as={MaterialIcons} name="search" size="lg" />}>Search</Button>}</Box>
</Box>
<Box style={{backgroundColor: 'bluesky'}}>{flightList ? `Actual: ${flightList.length}` : null }</Box>
<Box>{flightList?.map(((x, i) => {return x.country?.trim() === '' ? null :  <Box key={i} style={{backgroundColor: i%2===0 ? 'skyblue' : 'azure'  }}>
  {x.country}
</Box>}
))}</Box>
</ScrollView></PageContainer>)


const handleSearch = () => {
  
  const long = longitudeRef.current.getValue();
  const lat = latitudeRef.current.getValue();
  const distance = distanceRef.current.getValue();



  selectFlightLatLong(long, lat, distance);
};


const selectFlightLatLong = async(long, lat, distance) => { return await errorHandler(async() => {
const dis = distance / 2;
const minLong = (long - dis) || 5.9962;
const maxLong = (long + dis) || 10.5226;
const minLat = (lat - dis) || 45.8389;
const maxLat = (lat + dis) || 47.8229;
const result = await sqlite( `
    select country from FLIGHTS
    WHERE (longitude BETWEEN ? AND ?) AND (latitude BETWEEN ? AND ?)
    GROUP BY country
    `, [minLong, maxLong, minLat, maxLat]); 

setFlightList(result.rows._array)
console.log(result.rows._array);
console.log('result999');
//setCountSQL(result.rows._array);
});};


return render();}

export default function MyTabs() {
return (<>
  <FlightsProvider>
    <Tab.Navigator initialRouteName={detailsName} activeColor="blue" inactiveColor="#3e2465" barStyle={{ backgroundColor: 'azure', paddingBottom: 20 }}>
      <Tab.Screen name={homeName} component={Flights} options={{ tabBarLabel: 'Home', tabBarIcon: ({ focused, color, size }) => (<Box><Ionicons name="list" color={color} size={24} /></Box>),}} />
      <Tab.Screen name={detailsName} component={SearchFlightsPage} options={{ tabBarLabel: 'Flight Searcg', tabBarIcon: ({ focused, color, size }) => (<Box><Ionicons name="search" color={color} size={24} /></Box>),}} />
    </Tab.Navigator>
  </FlightsProvider>
  </>);
}

// const Tab = createMaterialTopTabNavigator();
// function FlightTabs() {
// const render = () => (<>
// <Tab.Navigator style={{  }}>
//   <Tab.Screen component={ Flights } name='GitHubSearch' options={{ title: () => ( <Text>Git Hub Search</Text> ), }} />
//   <Tab.Screen component={ LocalStorageUsers } name='LocalStorage' options={{ title: () => ( <Text>Local Storage</Text> ), }} />
// </Tab.Navigator>
// </>);

// return render();}

const ALL_FLIGHTS_API = 'https://opensky-network.org/api/states/all';
const AREA_FLIGHTS_API = 'https://opensky-network.org/api/states/all?lamin=45.8389&lomin=5.9962&lamax=47.8229&lomax=10.5226';



function Flights() {
  const goTo = useGoTo();
  const [jsonData, setJsonData]=useState();
  const [countJS, setCountJS]=useState();
  const [countSQL, setCountSQL]=useState();

  const {setFlights} = useFlights();



  useEffect(() => {
      console.log('start');
      //countAllData_Javascript();
      // (async() =>{
      // const result = await sqlite( `select * from FLIGHTS limit 2`); 
      // console.log(result);})();
    (async() =>{
      //await init();
      await selectAllFlight();
      console.log('end init');
    })();
        
    setFlights(true);
     // selectFlightLatLong();

     
  }, []);



const render = () => (<PageContainer>
<ScrollView>
    <Heading size='xl'>Flights Top10</Heading>


  <Text>SQLite Version</Text>
  <Box>{!countSQL ? 'wait!' : countSQL?.map((x,i) => (<Box key={i} style={{flexDirection: 'row', backgroundColor: (i%2 == 0 ? 'skyblue' : 'azure') }}>
        <Box style={{flex: 1}}>{x.country}</Box>
        <Box style={{flex: 1}}>{x.counter}</Box>
    </Box>))}
  </Box>

  <Text>Javascript Version</Text>
  <Box>{!countJS? 'Will not use javascript':countJS?.map((x,i) => (<Box key={i} style={{flexDirection: 'row', backgroundColor: (i%2 == 0 ? 'skyblue' : 'azure') }}>
      <Box style={{flex: 1}}>{x[0]}</Box>
      <Box style={{flex: 1}}>{x[1]}</Box>
    </Box>))}
  </Box>

</ScrollView>
</PageContainer>);

const selectAllFlight = async() => { return await errorHandler(async() => {
    const result = await sqlite( `
        select COUNT(country) counter, country from FLIGHTS
        GROUP BY country
        ORDER BY counter DESC
        LIMIT 10`); 
    //setFlights(true);
    setCountSQL(result.rows._array);
});}

async function init(){ 
console.log('start init');
await sqlite( `DROP TABLE IF EXISTS FLIGHTS`);
await sqlite( `CREATE TABLE IF NOT EXISTS FLIGHTS( 
                        id INTEGER NOT NULL
                        , "country" TEXT NOT NULL
                        , "longitude" NUMERIC
                        , "latitude" NUMERIC
                        , PRIMARY KEY("id" AUTOINCREMENT) 
                        )`);
await sqlite( `CREATE INDEX "country" ON "FLIGHTS" ("country");`);
await sqlite( `CREATE INDEX "location" ON "FLIGHTS" ("longitude", "latitude");`);

await insertAllDataToSQLite();
}

async function insertAllDataToSQLite(){errorHandler( () => {
  const flights = {...jsonFile}
  flights.states?.map(async(flight) => {
    const country = flight[2];
    const longitude = flight[5];
    const latitude = flight[6];
    await addNewFlight(country, longitude, latitude);
  });
});}

async function addNewFlight(country, longitude, latitude){
  try{
    sqlite(
        `INSERT INTO FLIGHTS(country,longitude,latitude) VALUES(?,?,?)`
        , [country, longitude, latitude]
    );}
  catch(e){}
    
    //return result;
;}

function countAllData_Javascript(){
  const flights = {...jsonFile}
  const countries = {};
  flights.states?.map((flight) => {
    const country = flight[2];
    if(countries[country] === undefined ){countries[country] = 1;}
    else {countries[country]++}
  });
  const sortable = Object.entries(countries).sort(([,a],[,b]) => b-a).slice(0, 10) ;
  console.log('sortable');
  console.log(sortable);
  setCountJS(sortable);
 }


return render();}











const errorHandler = async(callback) => {
    try{
        return await callback();
    }catch(e){
        console.error('sqlite internal error');
        console.error(JSON.stringify(e));
    }
}