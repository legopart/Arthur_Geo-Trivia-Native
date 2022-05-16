import React, { useState, useRef,  useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, KeyboardAvoidingView} from 'react-native';
import { Platform, StatusBar as StatusBarAndroid, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { Input } from './Tags'
import { NativeBaseProvider, Box } from "native-base";


export default function App() {

  const [editMode, setEditMode] = useState(undefined);
  const inputRef = useRef();
  const countRef = useRef(0);
  const [arr, setArr]=useState([ ]);

  const allVars = {editMode, setEditMode, inputRef, countRef, arr, setArr};

return (
<SafeAreaView style={styles.preContainer}>
<StatusBar style="auto" />
<KeyboardAvoidingView style={styles.container}>
    
<Text>Top Text</Text>
  

  <ScrollView style={styles.scrollView}>
 
    <NativeBaseProvider>
      <Box>Hello world!</Box>
    </NativeBaseProvider>



  </ScrollView>


  <Text>Bottom Text</Text>

</KeyboardAvoidingView>
</SafeAreaView>);
}

const addValue = StyleSheet.create({
  scrollView: {  }
  , text: { alignItems: 'center' }
  , container: { padding: 3, flexDirection: 'row', justifyContent: 'center' , alignItems: 'center'}
  , input: {  margin: 2, width: '40%' }
  , button: {  margin: 2, marginLeft: 4, width: 'auto' }
});



const styles = StyleSheet.create({
  preContainer: {
    flex: 1 , paddingTop: Platform.OS == "android" ? StatusBarAndroid.currentHeight : 0
    , backgroundColor: 'azure'
  }
  , container: { 
    flex: 1 , margin: 2, backgroundColor: 'white'
    , alignItems: 'center', justifyContent: 'center'  //not works if another component using flex: 1
  }
  , scrollView: { }
});


