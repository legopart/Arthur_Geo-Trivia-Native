import axios from 'axios';
import { server } from '../Config';

const axiosBaseUrl = server.AXIOS_BASE_URL;

const axiosFunction = axios.create({
    baseURL: axiosBaseUrl
    , headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Credentials':true}
    // , withCredentials: true
    , timeout: 0
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
        if(!error.response?.data) throw 'no server connection' ;
        if(Number(error.response?.status) > 460)  throw error.response; //modified errors
        throw error.response?.data;
    }
}



  