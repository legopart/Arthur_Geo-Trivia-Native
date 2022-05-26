
import React, { useEffect } from 'react';
import {useAuthDispatch ,useSelectorAuth, useMovieDispatch} from '../../../reducers'
import { Axios } from '../../../Api';
export default function Logout(){
    const { ResetAuth } = useAuthDispatch();
    const { ResetFavMovies } = useMovieDispatch();
    const {auth} = useSelectorAuth();
    useEffect(()=>{ 
        try{ (async()=>{ await Axios('DELETE', '/api/login/', auth, {}); })() }catch{}
        (async()=>{
            await (async()=>{ResetAuth(); })();
            await (async()=>{ResetFavMovies(); })();
        })()
    }, [])
return (<></>);
}