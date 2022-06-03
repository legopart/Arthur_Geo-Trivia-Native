
import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAuthDispatch ,useSelectorAuth, useMovieDispatch} from '../../reducers'
import { Axios } from '../../Api';
export default function Logout(){
    const { ResetAuth } = useAuthDispatch();
    const { ResetFavMovies } = useMovieDispatch();
    const {auth} = useSelectorAuth();
    useEffect(()=>{ 
        (async()=>{
        try{ await Axios('DELETE', '/api/login/?token=', {}, {'authorization':  auth.refreshToken});  }catch(e){}
        try{ await  AsyncStorage.removeItem('@token'); }catch(e){}
        await ResetAuth();
        await ResetFavMovies();
        })()
    }, [])
return (<></>);
}