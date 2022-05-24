import React, { useState, useRef,  useEffect } from 'react';
import {StyleSheet, useWindowDimensions, View,ImageBackground, KeyboardAvoidingView, Button as NativeButton} from 'react-native';
import {   ScrollView, Heading, Text, Flex,Center, Box, Spacer , Button, Icon, Image, NativeBaseProvider, Container,} from "native-base";
import { Entypo, Fontisto, AntDesign, Ionicons, Zocial, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import 'react-native-gesture-handler';
import { NavigationContainer }  from '@react-navigation/native';
import { createDrawerNavigator,DrawerContentScrollView, DrawerItemList, DrawerItem, } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import { MainPageContainer, PageContainer, Input } from './Components';
import {useGoBack, useGoTo, useNavigation} from './Hooks';
import {Login, Logout, MyHome, Favorites} from './Pages';
import { ReduxProvider } from './reducers';
import { useSelectorAuth } from './reducers';




const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createMaterialBottomTabNavigator();

export default function App() {

return (<>
<ReduxProvider>
  <MainPageContainer>
    <NavigationContainer> 
      
      <IdentifyRedirect />

     
    </NavigationContainer>
  </MainPageContainer>
</ReduxProvider>
</>);}


function IdentifyRedirect(){
 const auth = useSelectorAuth();
return (<>
  { auth.auth?.name ? 
     <StackNav /> : <Login />
  }
  </>)
}




function StackNav() {
const render = () => (<>
<Stack.Navigator  screenOptions={{ headerShown: false }}>
  <Stack.Screen name='DrawerNav' options={{ }}  component={DrawerNav}/>
  <Stack.Screen name='Logout' options={{ }}  component={Logout}/>
  
</Stack.Navigator>

</>);
return render();}
  



function CustomDrawerContent(props) {
  const render = () => (
    <DrawerContentScrollView {...props}>
      <View style={styles.menuContainer}>
        <View style={[ styles.menuItemsCard, { backgroundColor: '#fff2df', width: width, height: width }, ]}>
          <> <View style={[styles.circleContainer, { backgroundColor: '#FFC56F' }]}>
              <Feather travel name="briefcase" size={25} color="#fbae41" />
              <DrawerItem label="Screen1" labelStyle={{ color: '#fbae41', fontSize: 10 }}
                onPress={() => { props.navigation.navigate('Screen1');}}
              />
          </View> </>
          <DrawerItem style={{ position: 'absolute', left: 0, width: width, height: width, }}
            label="Screen2" labelStyle={{ color: '#609806' }}
            onPress={() => { props.navigation.navigate('Screen1'); }}
          />
        </View>
        <View style={[ styles.menuItemsCard, { backgroundColor: '#EFFFD5', width: width, height: width }, ]}>
          <View style={[styles.circleContainer, { backgroundColor: '#b5ff39' }]}>
            <Feather Medical name="briefcase" size={25} color="#609806" />
          </View>
          <DrawerItem style={{ position: 'absolute', left: 0, width: width, height: width, }}
            label="Screen2" labelStyle={{ color: '#609806' }}
            onPress={() => { props.navigation.navigate('StackNav'); }}
          />
        </View>
      </View>
    </DrawerContentScrollView>
  );


  const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', },
    menuContainer: { flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', },
    menuItemsCard: {flexDirection: 'column',justifyContent: 'center', alignItems: 'center', borderRadius: 10,},
    circleContainer: {width: 50, height: 50, borderRadius: 25, padding: 10, },
  });

return render();}







function  DrawerNav() {
  const goTo = useGoTo();
  const height = useWindowDimensions().height;
const render = () => (<>
    <Drawer.Navigator drawerContent={(props) => <DrawerNavSideMenu />}  screenOptions={{  headerShown: true, drawerContentStyle: { backgroundColor: '#010101'} }} initialRouteName="MyHome" swipeEnabled swipeEdgeWidth overlayColor={1} >
      <Drawer.Screen name="TabNav" options={{ drawerLabel: () => null, drawerIcon: () => null, title: 'My Home (edit)'}}  component={TabNav} />
      <Drawer.Screen name="Logout" options={{ drawerLabel: () => (<Button >Logout</Button>),title: 'Logout'}}  component={Logout} />
    </Drawer.Navigator>
</>);


function StackNav2() {
return (<>
<Stack.Navigator  screenOptions={{ headerShown: false }}>
  <Stack.Screen name='Logout' options={{ }}  component={Logout}/>
</Stack.Navigator>
</>);}


function DrawerNavSideMenu({style ,...props}){
  return (<>
<DrawerContentScrollView {...props} style={{backgroundColor: 'black', padding: 4, flex: 1,  ...style}}>
<Box style={{minHeight: height*0.9,    flex: 1,}}>
    <Box style={{flex: 1}}></Box>
    <Box  ><Button onPress={()=>{goTo('Logout')}}>Logout</Button></Box>
</Box>
  </DrawerContentScrollView>
 
  </>

  
  );
}
const headerGlobalStyle = {
  headerStyle: { backgroundColor: '#E40412'}
  , headerTintColor: '#E1E1E1'
  , headerTitleAlign: "center"
  , headerTitleStyle: { fontWeight: 'bold' }
  , headerRight: () => (<Button onPress={() => alert('Created by Arthur Zarankin!')}>Info</Button>)
  , headerShown: true
}
const headerStyle = { }

return render();}




function TabNav() {
const render = () => (<><Tab.Navigator initialRouteName={"MyHome"} activeColor="#d1d1d1" inactiveColor="#ffffff" barStyle={{ backgroundColor: '#010101', padding: 4}}>
  <Tab.Screen name={"MyHome"} component={MyHome} options={{ 
    tabBarLabel: <Text fontSize='xs' lineHeight={'xl'}>My Home</Text>
  , tabBarIcon: ({ focused, color }) => (
    <Box style={{position: 'absolute', left: -5, top: -12}}>
      <Icon as={Entypo} name="home" size={10} color={color} />
    </Box>),
    }} />


  <Tab.Screen name={"Favorites"} component={Favorites} options={{ 
    tabBarLabel: <Text fontSize='xs' lineHeight={'xl'}>Favorites</Text>
    , tabBarIcon: ({ focused, color }) => (
      <Box style={{position: 'absolute', left: -5, top: -10}}>
        <Icon as={Fontisto} name="star" size={9} color={color} />
        <Badge value={5} />
      </Box>),
    }} />
</Tab.Navigator></>);

function Badge({value}){
  return (<Box  bg="#F53930" rounded="full" mt={-8} mr={-4} zIndex={1} variant="solid" alignSelf="flex-end" style={{ minWidth: 20, minHeight: 20}} >
              <Text fontSize={'xs'} lineHeight={'xs'} >{value}</Text>
          </Box>)}


return render();}

