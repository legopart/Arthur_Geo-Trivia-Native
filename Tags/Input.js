import { useState, useRef, useImperativeHandle, forwardRef } from 'react';
import { StyleSheet, TextInput } from 'react-native';

const Input = forwardRef( ({placeholder, onSubmit, style, children, ...props}, ref) => {
  const [value, setValue] = useState(children);
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
minHeight: 50
, minWidth: '20%'
, marginVertical: 6
, paddingHorizontal: 6
, backgroundColor: '#eeeeee'
});