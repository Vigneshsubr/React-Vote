
import {configureStore} from "@reduxjs/toolkit";
import { userApi } from "./services/userApi";
import { voterApi } from "./services/voterApi";
import { electionApi } from "./services/electionApi"; 
import { pollApi } from "./services/pollApi";
import { candidateApi } from "./services/candidateApi";
import { votecastApi } from "./services/votecastApi";
import { resultApi } from "./services/resultApi";




export const Store =configureStore({
    reducer:{
        [userApi.reducerPath]:userApi.reducer,
        [voterApi.reducerPath]:voterApi.reducer,
        [electionApi.reducerPath]:electionApi.reducer,
        [pollApi.reducerPath]:pollApi.reducer,
        [candidateApi.reducerPath]: candidateApi.reducer,
        [votecastApi.reducerPath]: votecastApi.reducer,
        [resultApi.reducerPath]: resultApi.reducer
    
    },
    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware({}).concat([userApi.middleware,voterApi.middleware,electionApi.middleware,pollApi.middleware,candidateApi.middleware,votecastApi.middleware,resultApi.middleware])
})