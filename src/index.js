import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App";
import storage from "./utils/storage";
import { setAuthorizationHeader } from "./api/client";
import { AuthContextProvider } from "./pages/auth/context";

import configureStore from "./store";
const store = configureStore();

const accessToken = storage.get("auth");
if (accessToken) {
    setAuthorizationHeader(accessToken);
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <BrowserRouter>
        <React.StrictMode>
            <AuthContextProvider initiallyLogged={!!accessToken}>
                <App />
            </AuthContextProvider>
        </React.StrictMode>
    </BrowserRouter>
);
