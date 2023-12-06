import { createContext, useContext, useState } from "react";

//Se crea el contexto
const AuthContext = createContext(false);

//Se crea un custom hook para no tener que llamar AuthContext en cada componente
export const useAuth = () => {
    const auth = useContext(AuthContext);
    return auth;
};

//Se crea el Provider para simplificar la forma en que App.js distribuye los props necesarios
export const AuthContextProvider = ({ initiallyLogged, children }) => {
    const [isLogged, setIsLogged] = useState(initiallyLogged);

    const handleLogin = () => setIsLogged(true);
    const handleLogout = () => setIsLogged(false);

    const authValue = {
        isLogged,
        onLogout: handleLogout,
        onLogin: handleLogin,
    };

    return (
        <AuthContext.Provider value={authValue}>
            {children}
        </AuthContext.Provider>
    );
};
