import { createContext, useContext, useState, useMemo } from "react";

// Contexto de isLogged
const AuthContext = createContext(false);
// Contexto para el handler
const AuthContextHandlers = createContext(undefined);

// Custom hook para isLogged
export const useIsLogged = () => {
    const isLogged = useContext(AuthContext);
    return isLogged;
};

// Custom hook para el handler
export const useAuthHandlers = () => {
    const auth = useContext(AuthContextHandlers);
    return auth;
};

//Se crea el Provider para simplificar la forma en que App.js distribuye los props necesarios
export const AuthContextProvider = ({ initiallyLogged, children }) => {
    const [isLogged, setIsLogged] = useState(initiallyLogged);

    //Memoización del los objetos handlers
    const authHandlers = useMemo(
        () => ({
            onLogin: () => setIsLogged(true),
            onLogout: () => setIsLogged(false),
        }),
        []
    );

    return (
        <AuthContextHandlers.Provider value={authHandlers}>
            <AuthContext.Provider value={isLogged}>
                {children}
            </AuthContext.Provider>
        </AuthContextHandlers.Provider>
    );
};
