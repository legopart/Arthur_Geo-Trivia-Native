import { StatusBar } from 'expo-status-bar';
import React, { useState, useRef,  useEffect } from 'react';
import { Alert ,StyleSheet, Text, View, Button } from 'react-native';
import { Input } from './Tags'



export default function App() {
  const [border, setBorder] = useState(1);

  function handlePressExtendBorder(){setBorder(border+1)}

  function handleButtonResult(){
    const value1 = input1Ref.current?.getNumber();
    const value2 = input2Ref.current?.getNumber();
    const value3 = input3Ref.current?.getNumber();
    const result = value1 + value2 + value3;
    Alert.alert('Result', `${result}`)
  }
  const input1Ref = useRef();
  const input2Ref = useRef();
  const input3Ref = useRef();
  useEffect(() => {
    input1Ref?.current?.focus()
  }, [])
  return (
    <View style={styles.container}>

    <View>
      <Input keyboardType="number-pad" ref={input1Ref} onSubmit={() => input2Ref.current?.focus() } ></Input>
      <Text>+</Text>
      <Input keyboardType="number-pad" ref={input2Ref} onSubmit={() => input3Ref.current?.focus() }></Input>
      <Text>+</Text>
      <Input kReyboardType="number-pad" ref={input3Ref}></Input>
      <Button title='Result' onPress={handleButtonResult}></Button>
    </View>
    <View><Text>{" "}</Text></View>
      <View style={borderElementStyle(border)}>
        <Text>
          {border}{" "}Border extended By button click</Text></View>

      <Button title='Extend the border' onPress={handlePressExtendBorder}></Button>

    </View>
  );
}

const borderElementStyle = (x) => StyleSheet.create({
  borderWidth:  x
  , borderColor: '#555'
  , borderStyle: 'solid'
  , backgroundColor: '#f00'
});


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});








