import React, { useState, useRef,  useEffect } from 'react';
import { Platform, StatusBar as StatusBarAndroid, SafeAreaView, StyleSheet, ViewPagerAndroidBase, View } from 'react-native';
import { ScrollView, Heading, Text, Flex,Center, Box, Spacer , Button, Icon, Image, NativeBaseProvider, Container,} from "native-base";
import { PageContainer, Input } from '../Components'
import { useRoute } from '../Hooks';

export default function GithubUserData() {
  useEffect(() => {
  }, []);
  const route = useRoute();
  const user = route.params;
const render = () => (<PageContainer>
<ScrollView>
  <Box p={2} style={{borderRadius: 10}} bg={gradientBackground}>
    <Box style={{padding: 6, paddingLeft: 14, paddingRight: 14, backgroundColor: 'white', borderWidth: 1, borderColor: 'gray', borderRadius: 10}}>
      <Box style={{flexDirection: 'row',backgroundColor: 'azure', borderRadius: 10, alignItems: 'center', alignContent: 'center'}}>
        <Image size="lg" alt={user?.login} style={[image.container]} source={{uri: user?.avatar_url}} />
      <Box p={4} style={{flex: 1, alignContent: 'center', alignContent: 'center'}}>
          <Heading style={{ fontSize: 21, textAlign: 'center' }} size="lg"> {user?.login || 'GitHub Finder'}</Heading>
          <Box>Biography: {user.bio}</Box>
      </Box>
      </Box>
    </Box>
    <Box mt={2} style={{backgroundColor: 'white', borderRadius: 10}}>
    </Box>
</Box>
<Spacer  />
</ScrollView>
</PageContainer>);


return render();}


const image = StyleSheet.create({
  container: { marginTop: 4,borderWidth: 1,  borderColor: '#85D6FF', backgroundColor: '#85D6FF', borderRadius: 10 }
  , image: { width: 100, height: 100 }
});

const gradientBackground = {
  linearGradient: {
    colors: ["#85D6FF", "#43C8FF"],
    start: [1, 0],
    end: [1, 1]
  }
}
