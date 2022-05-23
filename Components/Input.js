import { useState, useRef, useImperativeHandle, forwardRef } from 'react';
import { Input as NativeInput,StyleSheet, TextInput, View } from 'react-native';
import { Text, Box, Input as BaseInput, FormControl } from "native-base";


const Input = forwardRef( ({ onChangeText, value : externalValue, leftIcon, rightButton , label, placeholder, onSubmit, style, children, ...props}, ref) => {
  const [value, setValue] = useState(children || externalValue);
  const textInputRef = useRef(null);
  useImperativeHandle (ref, () => ({
    getValue: () => value
    ,setValue: (val) => setValue(val || '')
    ,empty: () => setValue('')
    , getNumber: () => Number(value)
    , focus: () => handleFocus()
  }));
  function handleFocus(){ textInputRef.current?.focus(); }
return (<>
<Box style={styleInput.box}>
<FormControl.Label onPress={handleFocus} style={ styleInput.label }><Text onPress={ handleFocus } style={styleInput.labelText}>{label}</Text></FormControl.Label>
<Box ml={3} mr={4} mb={2}>
  <Box style={leftIcon || rightButton ? { flexDirection: 'row', alignItems: 'center' } : { minWidth: '50%',alignItems: 'center'}}>
{leftIcon ? <Box style={{marginRight: 2}}>{leftIcon}</Box> : null}
<Box style={leftIcon || rightButton ? {flex: 1} : {width: '100%', minHeight: 30}}>
  <BaseInput selectionColor='red' style={{ ...styleInput.input ,...(value ? {} : styleInput.placeholder) , ...style}} variant="unstyled" placeholderTextColor={'#a1a1a1'} value={value} size='2xl' {...props}  placeholder={placeholder} onChangeText={async(e) => {await setValue(e); await onChangeText&&onChangeText()}} returnKeyType={onSubmit ?'next': 'done'} onSubmitEditing={onSubmit} ref={textInputRef} /></Box>
{rightButton ? <Box style={{marginLeft: 8,height: '100px'}}>{rightButton}</Box>: null}

</Box>
</Box>
</Box>
</>)
})

export default Input;

const styleInput = StyleSheet.create({
box: {marginVertical: 12, backgroundColor: '#333333', height: 60}
, label: { marginLeft: 10, marginTop: -5, position: 'absolute', top: 5, left: 5, zIndex: 1}
, labelText: {color: '#737373'}
, input:{ textAlign: 'center', backgroundColor: '#333333', height: 60}
, placeholder: {textAlign: 'left'}
});