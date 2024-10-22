import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const pollApi = createApi({
    reducerPath:"PollApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8080/api/v1/",
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('Token');
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['Poll'],


    endpoints:(build)=>({
        postPoll:build.mutation({
            query: (createPoll) => ({
                url: "polls",
                method: "POST",
                body: createPoll,
            }),
            invalidatesTags: ['Poll']
        }),
    }),


});

export const {usePostPollMutation}= pollApi;