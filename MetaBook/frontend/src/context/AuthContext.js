import { createContext, useReducer } from "react";
import AuthReducer from "../redux/reducers/AuthReducer";

const INITIAL_STATE = {
    user: null,
    isFetching: false,
    error: false
}

export const AuthContext = createContext(INITIAL_STATE);
export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer,AuthContext.INITIAL_STATE);

    return (
        <AuthContext.Provider
            value={{
                user: state.user,
                isFetching: state.isFetching,
                error: state.error
            }}
        >

            {children}

        </AuthContext.Provider>
    );
}