import axios from 'axios';
//import {server} from '../Config';
const axiosBaseUrl = 'http://10.0.2.2:3500'


const axiosFunction = axios.create({
    baseURL: axiosBaseUrl
    , headers: {'Content-Type': 'application/json',}
    , withCredentials: true
    //, timeout: 1000
});

export default async function Axios(method, additionUrl, data, additionHeader){
    try{
        let response = await axiosFunction({
            method: method
            , url: additionUrl
            , data: JSON.stringify(data)
            , headers: additionHeader
        });
        console.log(':: axios success');

        return response.data;
    }catch(error){
        console.log(':: axios error');
        if(!error.response?.data) throw (()=>'no server connection')() ;
        throw error.response?.data;
    }
}



  