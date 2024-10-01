
import {configureStore} from "@reduxjs/toolkit";
import { userApi } from "./services/userApi";


export const Store =configureStore({
    reducer:{
        [userApi.reducerPath]:userApi.reducer
    },
    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware({}).concat([userApi.middleware])
})