import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const candidateApi = createApi({
  reducerPath: 'candidateApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080/api/v1/',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('Token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Candidate'],
  endpoints: (builder) => ({
    postCandidate: builder.mutation({
      query: (createCandidate) => ({
        url: 'candidates',
        method: 'POST',
        body: createCandidate,
      }),
      invalidatesTags: ['Candidate'],
    }),

    getAllCandidate: builder.query({
      query: (getAllCandidate) => ({
        url: `candidates`,
        method: 'GET',
        body: getAllCandidate,
      }),
      invalidatesTags: ['Candidate']
    }),

    deleteCandidate: builder.mutation({
      query: (id) => ({
        url: `candidates/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Candidate'],
    })
  }),
});


export const { usePostCandidateMutation, useGetAllCandidateQuery, useDeleteCandidateMutation } = candidateApi;
