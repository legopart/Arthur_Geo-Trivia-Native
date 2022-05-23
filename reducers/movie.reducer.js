import { createSlice } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";

const initialState = { favorites: [] }

// Reducer
export const movieReducer = createSlice({
    name: 'movieReducer'
    , initialState: initialState
    , reducers: {
        AddFavorite: (state, action) => {
            state.favorites = [{...action.payload}, ...state.favorites];
        }
        , ResetFavMovies: (state, action) => {
                // change only unStar each movie
            state.favorites =  initialState.favorites;
        }
    }
});

export const useSelectorMovies = () => useSelector(s=>s.movieReducer);

export const useMovieDispatch = () => {
    const _dispatch = useDispatch();
    const {AddFavorite, ResetFavMovies} = movieReducer.actions;
    return ({
        AddFavorite: (movie) => _dispatch(AddFavorite(movie))
        , ResetFavMovies: () =>  _dispatch(ResetFavMovies())
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