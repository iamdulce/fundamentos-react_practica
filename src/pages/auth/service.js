import client, {
    setAuthorizationHeader,
    removeAuthorizationHeader,
} from "../../api/client";
import storage from "../../utils/storage";

export const signup = async credentials => {
    await client.post("/api/auth/signup", credentials);
};

export const login = async credentials => {
    const { accessToken } = await client.post("api/auth/login", credentials);
    setAuthorizationHeader(accessToken); //guardo el token de acceso
    storage.set("auth", accessToken);
};

export const logout = async () => {
    await Promise.resolve();
    removeAuthorizationHeader();
    storage.remove("auth");
};
