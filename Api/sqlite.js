import * as SQLite from 'expo-sqlite';

const database = SQLite.openDatabase('persons.db');


const sqlite = async(queryString, paramsArray) => {
    return await asyncPromise((resolve,reject) => database.transaction( (conn) => { conn.executeSql( queryString, paramsArray||[], (_,result) => { resolve(result); }, (_,error) => { reject(error); } ); }))
}

const asyncPromise = async(callback) => {
    const promiseExtractor = async() => {
        return await new Promise((resolve,reject)=>{ callback(resolve,reject); });
    }
    return await promiseExtractor().catch( (err) => { throw err; } );
}


 export default sqlite;