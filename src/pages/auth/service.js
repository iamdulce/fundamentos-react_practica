import client, {
    setAuthorizationHeader,
    removeAuthorizationHeader,
} from "../../api/client";

export const login = credentials => {
    return client.post("auth/login", credentials).then(({ accessToken }) => {
        setAuthorizationHeader(accessToken); //guardo el token de acceso
    });
};

export const logout = () => {
    return Promise.resolve().then(() => {
        removeAuthorizationHeader();
    });
};
