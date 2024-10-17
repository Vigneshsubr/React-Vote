
import {configureStore} from "@reduxjs/toolkit";
import { userApi } from "./services/userApi";
import { voterApi } from "./services/voterApi";


export const Store =configureStore({
    reducer:{
        [userApi.reducerPath]:userApi.reducer,
        [voterApi.reducerPath]:voterApi.reducer
    },
    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware({}).concat([userApi.middleware,voterApi.middleware])
})