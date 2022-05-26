import { createSlice } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";

const initialState = { auth: {} }

// Reducer
export const authReducer = createSlice({
    name: 'authReducer'
    , initialState: initialState
    , reducers: {
        SetAuth: (state, action) => {
            state.auth = action.payload;
        }
        , ResetAuth: (state, action) => {
             state.auth =  initialState.auth;
        }
    }
});

export const useSelectorAuth = () => useSelector(s=>s.authReducer);

export const useAuthDispatch = () => {
    const _dispatch = useDispatch();
    const {SetAuth, ResetAuth} = authReducer.actions;
    return ({
        SetAuth: (auth) => _dispatch(SetAuth(auth))
        , ResetAuth: () =>  _dispatch(ResetAuth())
    })
};


export default authReducer.reducer;












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