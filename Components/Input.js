import { useState, useRef, useImperativeHandle, forwardRef } from 'react';
import { Input as NativeInput,StyleSheet, TextInput, View } from 'react-native';
import { Box, Input as BaseInput, FormControl } from "native-base";


const Input = forwardRef( ({ onChangeText, value : externalValue, leftIcon, rightButton , label, placeholder, onSubmit, style, children, ...props}, ref) => {
  const [value, setValue] = useState(children || externalValue);
  const textInputRef = useRef(null);
  useImperativeHandle (ref, () => ({
    getValue: () => value
    ,setValue: (val) => setValue(val || '')
    ,empty: () => setValue('')
    , getNumber: () => Number(value)
    , focus: () => textInputRef.current?.focus()
  }));
return (<>

<FormControl.Label style={styleInput.label}>{label}</FormControl.Label>
<Box ml={3} mr={4} mb={2}>
  <Box style={leftIcon || rightButton ? { flexDirection: 'row', alignItems: 'center' } : { minWidth: '50%',alignItems: 'center'}}>
{leftIcon ? <Box style={{marginRight: 2}}>{leftIcon}</Box> : null}
<Box style={leftIcon || rightButton ? {flex: 1} : {width: '100%', minHeight: 30}}>
  <BaseInput value={value} size='md' style={{...styleInput.input, ...style}} {...props}  placeholder={placeholder} onChangeText={async(e) => {await setValue(e); await onChangeText&&onChangeText()}} returnKeyType={onSubmit ?'next': 'done'} onSubmitEditing={onSubmit} ref={textInputRef} /></Box>
{rightButton ? <Box style={{marginLeft: 8,height: '100%'}}>{rightButton}</Box>: null}

</Box>
</Box>
</>)
})

export default Input;

const styleInput = StyleSheet.create({
label: { marginLeft: 7 }
, input:{ textAlign: 'center' }
});