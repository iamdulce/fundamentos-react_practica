import axios from "axios";

const client = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
});

client.interceptors.response.use(response => response.data);

export const setAuthorizationHeader = token =>
    (client.defaults.headers.common["Authorization"] = `Bearer ${token}`);
//almaceno en config de axios, así cada petición posterior es recordada

export const removeAuthorizationHeader = () => {
    delete client.defaults.headers.common["Authorization"];
};

export default client;
