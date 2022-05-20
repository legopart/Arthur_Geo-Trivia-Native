import React, {useState, createContext, useReducer, useContext, useEffect} from "react";

const FlightsContext = createContext({});

export const FlightsProvider = ({ children }) => {

/* *
    const auth = (state, type, payload ) => {
    }
    const [authState, authDispatch] = useReducer(authReducer, {});
/* */

    const [flights, setFlights] = useState();
    return ( <FlightsContext.Provider value={ {flights, setFlights} }>{children}</FlightsContext.Provider> );
}

const useFlights = () => useContext(FlightsContext);

export default useFlights;