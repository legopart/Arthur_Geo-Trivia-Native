import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Image
  , TouchableWithoutFeedback as TWF
  , TouchableOpacity as TO 
  , TouchableHighlight as TH
  , TouchableNativeFeedback as TNF //android
  , Button
  , Alert
  , Platform
  , StatusBar as StatusBarAndroid
  , Dimensions
} from 'react-native';

export default function App() {
  console.log(Dimensions.get('screen'))
  return (
    <SafeAreaView style={styles.container}>
      <Text numberOfLines={2}>Hello Worl4545d fgh fgh fgh fgh fghgfhfghfg hf gh fg hfgh fg hfgh fg hfg hfg hfg hfgh fgh fgh fgh fg</Text>
      <TH onLongPress={()=>{alert()}} onPress={() => {console.log('aaaa')}}>
      <Image 
      blurRadius={1}
      source={{width:200, height:300,uri: "https://picsum.photos/200/300"}} 
      /></TH>
      <Button 
      color="orange"
      title='click me' onPress={

        () => {
          
        Alert.alert('t', "dsfdsfsd", [
          {text: "yes", onPress: () => {} }
          , {text: "no"}
        ]
         )
         /* ios
          Alert.prompt('t', 'hfghfghfg', () => {})
        */

      }} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
    , backgroundColor: 'azure'
    , justifyContent: 'center'
    , alignItems: 'center'
    , paddingTop: Platform.OS == "android" ? StatusBarAndroid.currentHeight : 0
  },
});
