import { useState, useRef, useImperativeHandle, forwardRef } from 'react';
import { Input as NativeInput,StyleSheet, TextInput, View } from 'react-native';
import { Box, Input as BaseInput, FormControl } from "native-base";


const Input = forwardRef( ({ leftIcon, rightButton , label, placeholder, onSubmit, style, children, ...props}, ref) => {
  const [value, setValue] = useState(children);
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
  <View style={leftIcon || rightButton ? { flexDirection: 'row', alignItems: 'center' } : { minWidth: '50%',alignItems: 'center'}}>
{leftIcon ? <View style={{marginRight: 2}}>{leftIcon}</View> : null}
<View style={leftIcon || rightButton ? {flex: 1} : {width: '100%', minHeight: 30}}>
  <BaseInput value={value} size='lg' style={{...styleInput.input, ...style}} {...props}  placeholder={placeholder} onChangeText={setValue} returnKeyType={onSubmit ?'next': 'done'} onSubmitEditing={onSubmit} ref={textInputRef} /></View>
{rightButton ? <View style={{marginLeft: 8,height: '100%'}}>{rightButton}</View>: null}

</View>
</Box>
</>)
})

export default Input;

const styleInput = StyleSheet.create({
label: { marginLeft: 7 }
, input:{ textAlign: 'center' }
});