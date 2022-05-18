import {useNavigation} from '@react-navigation/native';

export default function useGoTo(){
    const nav = useNavigation();
    return function goTo(to, params, ...additions){ nav.navigate( to, params, ...additions );  }
}