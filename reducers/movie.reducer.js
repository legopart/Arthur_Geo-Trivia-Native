import { createSlice } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";

const initialState = { favorites: [] }

// Reducer
export const movieReducer = createSlice({
    name: 'movieReducer'
    , initialState: initialState
    , reducers: {
        AddRemoveFavorite: (state, action) => {
            if(state.favorites.find(x => x.id === action.payload.id)) state.favorites = state.favorites.filter(x => x.id !== action.payload.id);
            else state.favorites = [{...action.payload, stared: true}, ...state.favorites];
        }
        , SetFavorites: (state, action) => {
           // state.favorites = [...action.payload];
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
    const {AddRemoveFavorite, SetFavorites, ResetFavMovies, ClearStarsFavMovies} = movieReducer.actions;
    return ({
        AddRemoveFavorite: (movie) => _dispatch(AddRemoveFavorite(movie))
        , SetFavorites: (movies) =>  _dispatch(SetFavorites(movies))
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