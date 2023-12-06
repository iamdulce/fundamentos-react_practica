import client, {
    setAuthorizationHeader,
    removeAuthorizationHeader,
} from "../../api/client";

export const signup = async credentials => {
    await client.post("/api/auth/signup", credentials);
};

export const login = async credentials => {
    const { accessToken } = await client.post("auth/login", credentials);
    setAuthorizationHeader(accessToken); //guardo el token de acceso
};

export const logout = async () => {
    await Promise.resolve();
    removeAuthorizationHeader();
};
