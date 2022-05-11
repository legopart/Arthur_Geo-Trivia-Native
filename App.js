import { useState, useRef,  useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Button} from 'react-native';
import { Platform, StatusBar as StatusBarAndroid, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { Input } from './Tags'

export default function App() {

  const editModeRef = useRef(false);
  const inputRef = useRef();
  const [arr,setArr]=useState([]);

  const [txt,setTxt]=useState('');

function handlePressX(){
  editModeRef.current = false;
  inputRef.current.empty();
}

  return (
<SafeAreaView style={styles.preContainer}>
<StatusBar style="auto" />
<View style={styles.container}>
<Text>Top Text</Text>
  
  <View style={addValue.container}>
    <Input ref={inputRef} placeholder="input" style={addValue.input}>1212</Input>
    <View style={addValue.button}><Button title={editModeRef.current ? 'edit': 'Add'}  /></View>
    <View style={addValue.button}><Button title='x' onPress={handlePressX}  /></View>
  </View>


  <ScrollView style={buttonSet.scrollView}>
    <View style={[buttonSet.border/*, buttonSet.marked*/]}>
      <View style={buttonSet.text}>
        <Text>dfdf</Text>
      </View>
      <View style={buttonSet.container}>
        <View style={buttonSet.button}><Button title='Top'  /></View>
        <View style={buttonSet.button}><Button title='Edit'  /></View>
        <View style={buttonSet.button}><Button title='Delete'  /></View>
        <View style={buttonSet.button}><Button title='Mark'  /></View>
        <View style={buttonSet.button}><Button title='UnMark'  /></View>
      </View>
    </View>
  </ScrollView>
  <Text>Bottom Text</Text>
{/*End Container */}</View>
</SafeAreaView>);
}

const addValue = StyleSheet.create({
  scrollView: {  }
  , text: { alignItems: 'center' }
  , container: { padding: 3, flexDirection: 'row', justifyContent: 'center' , alignItems: 'center'}
  , input: {  margin: 2, width: '40%' }
  , button: {  margin: 2, marginLeft: 4, width: 'auto' }
});

const buttonSet = StyleSheet.create({
  scrollView: { }
  , border: { borderWidth: 1, borderColor: 'black', borderStyle: 'solid', borderRadius: 4, padding: 5}
  , marked: { borderWidth: 2, borderColor: 'red' }
  , text: { alignItems: 'center', padding: 3 }
  , container: { flexDirection: 'row', justifyContent: 'center' , alignItems: 'center'}
  , button: {  margin: 2 }
});

const styles = StyleSheet.create({
  preContainer: {
    flex: 1 , paddingTop: Platform.OS == "android" ? StatusBarAndroid.currentHeight : 0
    , backgroundColor: 'azure'
  }
  ,container: { 
    flex: 1 , margin: 2, backgroundColor: 'white'
    , alignItems: 'center', justifyContent: 'center'  //not works if another component using flex: 1
  }
});