import React, { useState, useRef,  useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, KeyboardAvoidingView} from 'react-native';
import { Platform, StatusBar as StatusBarAndroid, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import {PageContainer, Input} from '../Components'

export default function ArrayApp() {

  const [editMode, setEditMode] = useState(undefined);
  const inputRef = useRef();
  const countRef = useRef(0);
  const [arr, setArr]=useState([ ]);

  
const render = () => (<PageContainer>
  <View style={{flex: 1}}>{/*Centralize The Item */}</View>

  <View style={addValue.container}>
    <Input ref={inputRef} placeholder="input" style={addValue.input}></Input>
    <View style={addValue.button}><Button onPress={editMode !== undefined? handleEditValue: handleAddValue} title={editMode !== undefined ? 'Edit Item': 'Add Item'}  /></View>
    <View style={addValue.button}><Button title='x' onPress={ handlePressX }  /></View>
  </View>

  <ScrollView style={buttonSet.scrollView}>
    {
      arr.map(({id, text, marked}, i) => (
        <View key={id} style={[buttonSet.border, marked ? buttonSet.marked: null]}>
          <View style={buttonSet.text}>
            <Text>{text}</Text>
          </View>
          <View style={buttonSet.container}>
            <View style={buttonSet.button}><Button title='Top' onPress={() => handleTop(id)} /></View>
            <View style={buttonSet.button}><Button title='Edit' onPress={() => handleEdit(id)} /></View>
            <View style={buttonSet.button}><Button title='Delete' onPress={() => handleDelete(id)} /></View>
            <View style={buttonSet.button}><Button title='Mark' onPress={() => handleMark(id)} /></View>
            <View style={buttonSet.button}><Button title='UnMark' onPress={() => handleUnMark(id)} /></View>
          </View>
        </View>  
      ) )
    }
  </ScrollView>
</PageContainer>);


const arrConstructor = (id, text, marked = false) => ({id, text, marked});

function handlePressX(){ setEditMode(undefined); inputRef.current?.empty(); inputRef.current?.focus();}

function handleAddValue(){
  const value = inputRef.current?.getValue();
  if(value?.trim() === '') return;
  const component = arrConstructor(countRef.current++, value)
  const arrayClone = JSON.parse(JSON.stringify( arr ));
  arrayClone.push( component );
  setArr( arrayClone );
  handlePressX();
}

function handleEditValue(){
  const value = inputRef.current?.getValue();
  const arrayClone = JSON.parse(JSON.stringify( arr ));
  const newArray = [];
  arrayClone.map( x => {
    if(x.id === editMode.id) {
      const xClone = JSON.parse(JSON.stringify( x ));
      xClone.text = value;
      newArray.push(xClone);
    }else newArray.push(x);
  } );
  setArr( newArray );
  handlePressX();
}

function handleTop(id){
  function arrayMove(arr, fromIndex, toIndex) {
    let element = arr[fromIndex];
    arr.splice(fromIndex, 1);
    arr.splice(toIndex, 0, element);
    return arr;
  }
  const arrayClone = JSON.parse(JSON.stringify( arr ));
  const index = arrayClone.findIndex(x => x.id === id);
  if(index === 0) return;
  const newArray = arrayMove(arrayClone, index, index - 1);
  setArr( newArray );
}

function handleEdit(id){
  const thisValue = arr.find(x => x.id === id);
  const thisValueClone = JSON.parse(JSON.stringify(thisValue));
  setEditMode( thisValueClone );
  inputRef.current?.setValue(thisValueClone.text)
}

function handleDelete(id){
  const arrayClone = JSON.parse(JSON.stringify( arr ));
  const newArray = arrayClone.filter( x => x.id !== id );
  setArr( newArray );
}

function handleMark(id, isMark = true){
  const arrayClone = JSON.parse(JSON.stringify( arr ));
  const newArray = [];
  arrayClone.map( x => {
    if(x.id === id) {
      const xClone = JSON.parse(JSON.stringify( x ));
      xClone.marked = isMark;
      newArray.push(xClone);
    }else newArray.push(x);
  } );
  setArr( newArray );
}

function handleUnMark(id){ handleMark(id, false); }


return render();}

const addValue = StyleSheet.create({
  scrollView: {  }
  , text: { alignItems: 'center' }
  , container: { padding: 3, flexDirection: 'row', justifyContent: 'center' , alignItems: 'center'}
  , input: {  margin: 2, width: '40%' }
  , button: {  margin: 2, marginLeft: 4, width: 'auto' }
});

const buttonSet = StyleSheet.create({
  scrollView: { }
  , border: { borderWidth: 1, borderColor: 'black', borderStyle: 'solid', borderRadius: 4, padding: 5, margin: 3}
  , marked: { borderWidth: 2, borderColor: 'red' }
  , text: { alignItems: 'center', padding: 3 }
  , container: { flexDirection: 'row', justifyContent: 'center' , alignItems: 'center'}
  , button: {  margin: 2 }
});


