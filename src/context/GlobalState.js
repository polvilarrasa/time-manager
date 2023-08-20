import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';

// Initial state
const initialState = {
    user: null
}

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    // Actions
    function login(user) {
        dispatch({
            type: 'USER_LOGIN',
            payload: user
        });
    }

    function logout() {
        dispatch({
            type: 'USER_LOGOUT'
        });
    }

    return (<GlobalContext.Provider value={{
        user: state.user,
        userActions: {
            login,
            logout
        }
    }}>
        {children}
    </GlobalContext.Provider>);
}