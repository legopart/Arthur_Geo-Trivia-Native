import { createSlice } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";

import {useSelectorAuth} from './auth.reducer';

import AsyncStorage from '@react-native-async-storage/async-storage';



const initialState = { favorites: [] }

// Reducer
export const movieReducer = createSlice({
    name: 'movieReducer'
    , initialState: initialState
    , reducers: {
        AddRemoveFavorite: (state, action) => {
            const { movie , auth } = action.payload;
            let movieList;
            if(state.favorites.find(x => x.id === movie.id)) movieList = state.favorites.filter(x => x.id !== movie.id);
            else movieList = [{...movie, stared: true}, ...state.favorites];

            try{(async() => { 
                const movieListClone = JSON.stringify(movieList);
                 await AsyncStorage.setItem('@'+auth.name, movieListClone);
            })(); }catch(e){};
            state.favorites = movieList;
        }
        , SetFavorites: (state, action) => {
           const { movies } = action.payload;
            state.favorites = movies;
        }
        , ResetFavMovies: (state, action) => {
            state.favorites =  initialState.favorites;
        }
        , ClearStarsFavMovies: (state, action) => {
            const withoutStars = [];
            state.favorites.map((x) => {
                x.stared = false;
                withoutStars.push(x)
            });
            state.favorites =  withoutStars;
        }
    }
});

export const useSelectorMovies = () => useSelector(s=>s.movieReducer);

export const useMovieDispatch = () => {
    const _dispatch = useDispatch();
    const {auth} = useSelectorAuth();
    const {AddRemoveFavorite, SetFavorites, ResetFavMovies, ClearStarsFavMovies} = movieReducer.actions;
    return ({
        AddRemoveFavorite: (movie) => _dispatch(AddRemoveFavorite({movie, auth}))
        , SetFavorites: (movies) =>  _dispatch(SetFavorites({movies}))
        , ResetFavMovies: () =>  _dispatch(ResetFavMovies())
        , ClearStarsFavMovies: () =>  _dispatch(ClearStarsFavMovies())
    })
};


export default movieReducer.reducer;












/*
export default function weatherReducer(state = {result: {}, history: []}, action){
    console.log(state);
    switch(action.type)
    {
        case "ADD_RESULT":  
            const arr = JSON.parse(JSON.stringify(state.history));
            return {
                result: {...action.payload}
                , history: [{...action.payload}, ...arr]
            };
        case "RESET": return {result: {}, history: []};
        default: return state;
    }
}*/