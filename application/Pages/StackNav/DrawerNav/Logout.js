
import React, { useEffect } from 'react';
import {useAuthDispatch ,useSelectorAuth} from '../../../reducers'
import { Axios } from '../../../Api';
export default function Logout(){
    const { ResetAuth } = useAuthDispatch();
    const {auth} = useSelectorAuth();
    useEffect(()=>{ 
        try{ (async()=>{ await Axios('DELETE', '/api/login/', auth, {}); })() }catch{}
        ResetAuth(); 
    }, [])
return (<></>);
}