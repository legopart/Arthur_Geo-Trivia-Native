import React, { useState, useRef,  useEffect } from 'react';
import { Platform, StatusBarasStatusBarAndroid, SafeAreaView, StyleSheet, ViewPagerAndroidBase, View, Dimensions } from 'react-native';
import { AntDesign, Zocial, FontAwesome, MaterialIcons, Entypo, Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { ScrollView, Heading, Text, Flex,Center, Box, Spacer , Button, Icon, Image, NativeBaseProvider, Container,} from "native-base";
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { PageContainer, Input } from '../Components'
import { useGoTo, useLocalStorage } from '../Hooks'
import { debounce, useSQLite } from '../Api'
import AsyncStorage from '@react-native-async-storage/async-storage';
import LocalStorageUsers from './GithubFinderLocalStorage';
import jsonFile from '../openSky.json';

const sqlite = useSQLite('flights.db');

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






export default function Flights() {
  const goTo = useGoTo();
  const [jsonData, setJsonData]=useState();
  const [countJS, setCountJS]=useState([]);
  const [countSQL, setCountSQL]=useState();

function handleGetAllFlights(){ errorHandler(async() =>{
    //const response = await axios.get(ALL_FLIGHTS_API);
    const response = {...jsonFile};
    //console.log('data'); console.log(response.states);
    setJsonData(response.states);
    return response.states;
} ); }









async function init(){ 
sqlite( `DROP TABLE IF EXISTS FLIGHTS`)
sqlite( `CREATE TABLE IF NOT EXISTS FLIGHTS( 
                        , id INTEGER NOT NULL
                        , "country" TEXT PRIMARY KEY NOT NULL
                        , "counter" INTEGER NOT NULL DEFAULT 1
                        , PRIMARY KEY("id" AUTOINCREMENT) 
                        )`);
sqlite( `CREATE INDEX "" ON "flights" ("counter");`);
insertAllDataToSQLite();
}

function insertAllDataToSQLite(){errorHandler( () => {
  const flights = {...jsonFile}
  flights.states?.map((flight) => {
    const country = flight[2];
    addNewFlightOrUpdate(country);
  });
});}

const selectAllFlight = async() => { return await errorHandler(async() => {
    const result = await sqlite( `select * from FLIGHTS ORDER BY counter DESC LIMIT 10`);
    setCountSQL(result.rows._array);
});}



  useEffect(() => {
      countAllData_Javascript();
      init();
      selectAllFlight();
      
  }, []);




async function addNewFlightOrUpdate(country){
  try{
    sqlite(
        `INSERT INTO FLIGHTS(country) VALUES(?)
        ON CONFLICT(country) DO UPDATE SET counter=counter+1 `
        , [country]
    );}
  catch(e){}
    
    //return result;
;}



// async function addNewFlight(country){ return await errorHandler(async() => {
//     const result = await sqlite(
//         `INSERT INTO 
//         FLIGHTS(country)
//         VALUES(?)`
//         , [country]
//     );
//     return result;
// });}




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
<Box>{countJS?.map((x,i) => (<Box key={i} style={{flexDirection: 'row', backgroundColor: (i%2 == 0 ? 'skyblue' : 'azure') }}>
  <Box style={{flex: 1}}>{x[0]}</Box>
  <Box style={{flex: 1}}>{x[1]}</Box>
</Box>))}
</Box>

</ScrollView>
</PageContainer>);


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