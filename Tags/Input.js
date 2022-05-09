import { useState, useRef, useImperativeHandle, forwardRef } from 'react';
import { StyleSheet, TextInput } from 'react-native';

const Input = forwardRef( ({placeholder, onSubmit, style, ...props}, ref) => {
  const [value, setValue] = useState();
  const textInputRef = useRef(null);
  useImperativeHandle (ref, () => ({
    getValue: () => value
    , getNumber: () => Number(value)
    , focus: () => textInputRef.current?.focus()
  }));
return (<><TextInput style={{...styleInput, ...style}} {...props} value={value} placeholder={placeholder} onChangeText={setValue} returnKeyType={onSubmit ? 'next': 'done'} onSubmitEditing={onSubmit} ref={textInputRef} /></>)
})

export default Input;

const styleInput = StyleSheet.create({
height: 50
, minWidth: 200
, marginVertical: 6
, paddingHorizontal: 6
, backgroundColor: '#eeeeee'
});