import React, { useState, useRef,  useEffect } from 'react';
import { Platform, StatusBarasStatusBarAndroid, SafeAreaView, StyleSheet, ViewPagerAndroidBase, View } from 'react-native';
import { AntDesign, Zocial, FontAwesome, MaterialIcons, Entypo, Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { Input as BaseInput,ScrollView, Heading, Text, Flex,Center, Box, Spacer , Button, Icon, Image, NativeBaseProvider, Container,} from "native-base";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { PageContainer, Input } from '../Components'
import { useGoTo, useLocalStorage } from '../Hooks'
import { debounce, createSQLite } from '../Api'

const sqlite = createSQLite('persons.db');

export default function ManagePersons() {
    const nameRef = useRef();
    const ageRef = useRef();
    const addressRef = useRef();
    const insertRef = useRef();
    const searchRef = useRef();
    const [persons, setPersons] = useState();

    useEffect(()=>{
        console.log('Sql init')
        init();
        handleSelectAll();
        //nameRef.current.focus();
    }, []);


const render = () => (<PageContainer>
<ScrollView>
    <Box style={{flexDirection: 'row'}}>
        <Box style={{flex: 2}}><Input  label='Name' ref={nameRef} onSubmit={() => {ageRef.current.focus();}} ></Input></Box>
        <Box style={{flex: 1}}><Input label='Age' ref={ageRef} onSubmit={() => {addressRef.current.focus();}} keyboardType='numeric'></Input></Box>
    </Box>
    <Box><Input label='Address' ref={addressRef} onSubmit={() => {insertRef.current.focus();}}></Input></Box>
<Button mt={4} onPress={ handleInsert } ref={insertRef}>Insert</Button>



<Box m={2} mt={5} style={{}}>
    {persons?.map((x, i) => (<Box key={i} style={{flexDirection: 'row'}}>
        <Box style={{flex: 1}}>{x.name}</Box>
        <Box style={{flex: 1}}>{x.age}</Box>
        <Box style={{flex: 2}}>{x.address}</Box>
    </Box>) )}
</Box>

<Box><Input label='Search Name' ref={searchRef}  onChangeText={ handleSearchDelay } rightButton={ <Button size="md" style={{paddingLeft: 20, paddingRight: 20}} leftIcon={<Icon as={MaterialIcons} name="person-search" size="lg" />} onPress={ handleSearch } >{""}</Button> } ></Input></Box>
{persons && persons[0]? <Button mt={12} onPress={ handleDropTable } >Drop All Data</Button> : null}
</ScrollView>
</PageContainer>);

function handleDropTable(){
    dropAll();
    init();
    handleSelectAll();
}

async function handleSelectAll(){
    searchRef.current.empty()
    handleSearch();
}

const handleSearchDelay = debounce( () => {
        handleSearch();
    }, 1100);

const handleSearch = async() => {
    const name = searchRef.current.getValue();
    const result = await selectByName(name);
    console.log(result);
    setPersons(result);
};





function handleInsert(){
        const name = nameRef.current.getValue();
    const age = ageRef.current.getValue();
    const address = addressRef.current.getValue();
    if( (name?.trim() || '') === '' || (age?.trim() || '') === '' || Number(age) <= 0 || (address?.trim() || '') === '' ) {return;}
    addNewItem(name, age, address).then((result)=>{
        handleSelectAll();
        nameRef.current.empty();
        ageRef.current.empty();
        addressRef.current.empty();
    }).catch(()=>{});
}

return render();}

const selectByName = async(name) => { return await errorHandler(async() => {
    const result = await sqlite( `select * from Persons where name like ?`, [ '%'+name+'%' ] );
    return result.rows._array;
});}


function init(){ errorHandler(async() => {
await sqlite( 
    `CREATE TABLE IF NOT EXISTS
        PERSONS(
            ID INTEGER PRIMARY KEY NOT NULL
            , name TEXT NOT NULL
            , age INTEGER NOT NULL
            , address TEXT NOT NULL
            )`
);
});}
  
async function addNewItem(name, age, address){ return await errorHandler(async() => {
    const result = await sqlite(
        `INSERT INTO 
        Persons(Name,Age,Address)
        VALUES(?,?,?)`
        , [name, age, address]
    );
    return result;
});}


function dropAll(){ errorHandler(async() => {

        return await sqlite( `DROP TABLE IF EXISTS PERSONS`);
     
});}

// basic async sqlite functions

const errorHandler = async(callback) => {
    try{
        return await callback();
    }catch(e){
        console.error('sqlite internal error');
        console.error(JSON.stringify(e));
    }
}

