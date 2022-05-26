
import React, { useEffect } from 'react';
import {useAuthDispatch} from '../../../reducers'

export default function Logout(){
    const { ResetAuth } = useAuthDispatch();
    useEffect(()=>{ ResetAuth(); }, [])
return (<></>);
}