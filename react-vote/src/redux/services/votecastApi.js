import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const votecastApi = createApi({
    reducerPath: "VotecastApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8080/api/v1/",
        prepareHeaders: (headers) => {
            const token = sessionStorage.getItem('Token'); // Change to localStorage
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['Votecast'],

    endpoints: (build) => ({
        postVote: build.mutation({
            query: (voteData) => ({
                url: `votes/cast`,
                method: "POST",
                body: voteData,
            }),
            invalidatesTags: ['Votecast']
        }),
    })
});

export const { usePostVoteMutation } = votecastApi;
