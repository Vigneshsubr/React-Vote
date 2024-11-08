import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Assuming resultApi is already set up as shown in your code
export const resultApi = createApi({
    reducerPath: "ResultApi",
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
    tagTypes: ['result'],

    endpoints: (build) => ({
        postResult: build.mutation({
            query: (pollId) => ({
                url: `results/poll/${pollId}`,
                method: "POST",
            }),
            invalidatesTags: ['result']
        }),
        getResults: build.query({
            query: (pollId) => `results/poll/${pollId}`,
            providesTags: ['result'],
        }),
    })
});

export const { usePostResultMutation, useGetResultsQuery } = resultApi;
