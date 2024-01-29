import { combineReducers } from "redux";
import {
    AUTH_LOGIN,
    AUTH_LOGOUT,
    ADVERTS_LOADED,
    ADVERTS_CREATED,
} from "./types";

const defaultState = {
    auth: false,
    adverts: [],
};

export function auth(state = defaultState.auth, action) {
    switch (action.type) {
        case AUTH_LOGIN:
            return true; //genero un nuevo estado
        case AUTH_LOGOUT:
            return false;
        default:
            return state;
    }
}

export function adverts(state = defaultState.adverts, action) {
    switch (action.type) {
        case ADVERTS_LOADED:
            return action.payload;
        case ADVERTS_CREATED:
        default:
            return state;
    }
}

//Refactor: se pasa de un reducer grande a partes más pequeñas que se combinan con combineReducers
