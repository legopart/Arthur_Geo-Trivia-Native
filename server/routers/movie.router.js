const { tokens } = require('../config')
const IMDBApi = tokens.IMDB_API;
const IMDBToken = tokens.IMDB_TOKEN;
const OMDBApi = tokens.OMDB_API;
const OMDBToken = tokens.OMDB_TOKEN;


const express = require("express");
const movieRouter = express.Router();

const { errorHandler } = require('../middlewares');
const { Success, ErrorHandler, MiddlewareError } = require('../classes');
const { response } = require('express');



movieRouter.route('/new') //  localhost:3500/api/movie/new
.get( async (req, res, next) => {
  console.log(':: movie router new get');
  errorHandler(req, res, next)( async () => {

    const result = await boxOffice10Movies();
    
    if(result.length === 0) throw new ErrorHandler(400, 'No movies')
    return new Success(200, result);
    });  //error handler 
})



movieRouter.route('/top') //  localhost:3500/api/movie/top
.get( async (req, res, next) => {
  console.log(':: movie router recommended get');
  errorHandler(req, res, next)( async () => {

    const result = await mostPopular10Movies();
    if(result.length === 0) throw new ErrorHandler(400, 'No movies')
    return new Success(200, result);
    });  //error handler 
})




module.exports = movieRouter;




const fetch = require('node-fetch');

async function getMovieDataById(imdbId){
    console.log('getMovieDataById')
    try{
        const api = `${OMDBApi}/?i=${imdbId}&apikey=${OMDBToken}`;
        const result = await fetch(api, { method: "GET" });
        const resultJson = await result.json();
        if(resultJson.response === 'False') throw new Error();
        const { Title, Year, Type, Poster, imdbID } = resultJson;
        if(Title.trim() === '' || Year.trim() === '' || Type.trim() ==='' || Poster.trim() === '' || imdbID.trim() === '') throw new Error();
        const data = { id: imdbID, title: Title, year: Year, type: Type, image: Poster};
        return data;
    }catch(e){return undefined};
}

async function mostPopular10Movies(){
    console.log('boxOffice10Movies')
    const api = `${IMDBApi}/MostPopularMovies/${IMDBToken}`;
    const result = await fetch(api, { method: "GET" });
    const resultJson = await result.json();
 
    const {items} =  resultJson;
    const list = [];
    items.map((x)=> { list.push(x.id); })
    //get random 10 out of 100
    const shuffled = list.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 10);

    const moviesData = [];
    for (const id of selected) {
        const movieResult = await getMovieDataById(id);
        if(!movieResult) continue;
        moviesData.push(movieResult);
    }

    const data =  moviesData;

    return data;
}
async function boxOffice10Movies(){
    console.log('boxOffice10Movies')
    const api = `${IMDBApi}/BoxOffice/${IMDBToken}`;
    const result = await fetch(api, { method: "GET" });
    const resultJson = await result.json();

    const {items} =  resultJson;

    const idList = [];
    items.map((x)=> { idList.push(x.id); })

    const moviesData = [];
    for (const id of idList) {
        const movieResult = await getMovieDataById(id);
        if(!movieResult) continue;
        moviesData.push(movieResult);
    }

    const data = moviesData;

    return data;
}
