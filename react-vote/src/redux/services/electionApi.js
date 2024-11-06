import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react";

// Filename: electionApi.js

export const electionApi = createApi({
    reducerPath: "ElectionApi",
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
    tagTypes: ['Election'],

    endpoints: (build) => ({
        postElection: build.mutation({
            query: (createElection) => ({
                url: "elections",
                method: "POST",
                body: createElection,
            }),
            invalidatesTags: ['Election']
        }),

        getSingleElection: build.query({
            query: (id) => ({
                url: `elections/${id}`,
                method: "GET",
            }),
            invalidatesTags: ['Election']
        }),

        getElection: build.query({
            query: () => ({
                url: "elections",
                method: "GET",
            }),
            invalidatesTags: ['Election']
        }),

        fetchPollsByElectionId: build.query({
            query:(electionId)=>({
                url:`elections/${electionId}/polls`,
                method:"GET",
            }),
            invalidatesTags:['Election']
        }),

        deleteElection: build.mutation({
            query: (id) => ({
                url: `elections/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ['Election']
        })
    })
});

export const {
    usePostElectionMutation,
    useGetElectionQuery,
    useGetSingleElectionQuery,
    useDeleteElectionMutation,
    useFetchPollsByElectionIdQuery
} = electionApi;
