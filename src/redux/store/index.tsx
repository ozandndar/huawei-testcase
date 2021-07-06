import { configureStore } from "@reduxjs/toolkit";
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {combineReducers} from "redux";
import thunk from "redux-thunk";

import AuthReducer from "./auth";

const reducers = combineReducers({
    auth : AuthReducer
   });

const persistConfig = {
    key: 'root',
    storage
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
    reducer : persistedReducer,
    devTools : true,
    middleware : [thunk]
})

export type RootState = ReturnType<typeof store.getState>

export default store;