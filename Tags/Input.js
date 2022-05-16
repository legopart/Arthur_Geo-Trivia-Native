import { useState, useRef, useImperativeHandle, forwardRef } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { Box, Input as NativeInput, FormControl } from "native-base";


const Input = forwardRef( ({label, placeholder, onSubmit, style, children, ...props}, ref) => {
  const [value, setValue] = useState(children);
  const textInputRef = useRef(null);
  useImperativeHandle (ref, () => ({
    getValue: () => value
    ,setValue: (val) => setValue(val)
    ,empty: () => setValue('')
    , getNumber: () => Number(value)
    , focus: () => textInputRef.current?.focus()
  }));
return (<>

<FormControl.Label style={styleInput.label}>{label}</FormControl.Label>
<Box ml={5} mr={5} mb={2}>
<NativeInput value={value} size='lg' style={{...styleInput.input, ...style}} {...props}  placeholder={placeholder} onChangeText={setValue} returnKeyType={onSubmit ? 'next': 'done'} onSubmitEditing={onSubmit} ref={textInputRef} />
</Box>
</>)
})

export default Input;

const styleInput = StyleSheet.create({
label: { marginLeft: 7 }
, input:{
  minWidth: '20%'
  , textAlign: 'center'
}
});