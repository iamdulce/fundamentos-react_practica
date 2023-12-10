import client, {
    setAuthorizationHeader,
    removeAuthorizationHeader,
} from "../../api/client";
import storage from "../../utils/storage";

export const signup = async credentials => {
    await client.post("/api/auth/signup", credentials);
};

export const login = async (credentials, rememberUser) => {
    try {
        const { accessToken } = await client.post(
            "api/auth/login",
            credentials
        );
        setAuthorizationHeader(accessToken);

        if (rememberUser) {
            storage.set("auth", accessToken);
        }

        return accessToken;
    } catch (error) {
        throw error;
    }
};

export const logout = async () => {
    await Promise.resolve();
    removeAuthorizationHeader();
    storage.remove("auth");
};
