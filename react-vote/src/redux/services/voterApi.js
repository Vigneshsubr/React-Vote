import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const voterApi = createApi({
    reducerPath: "VoterApi",
    baseQuery: fetchBaseQuery({
        baseUrl:"http://localhost:8080/api/v1/",
        prepareHeaders: (headers)=>{
            const token =localStorage.getItem('Token');
            if(token){
                headers.set('Authorization',`Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes:['Voter'],

    endpoints:(build) =>({
        postUsers:build.mutation({
            query:(createUser) =>({
                url:"users",
                method:"POST",
                body:createUser,
            }),
            invalidatesTags:['Voter']
        }),

        getSingleUsers:build.query({
            query:(id) =>({
                url:`users/${id}`,
                method:"GET",
               
            }),
            invalidatesTags:['Voter']
        }),

        getUsers:build.query({
            query:(getUsers)=>({
                url:`users`,
                method:"GET",
                body:getUsers,
            }),
            invalidatesTags:['Voter']
        }),

        updateUsers: build.mutation({
            query: (updateUserData, id) => ({
                url: `users/${id}`, // Ensure the id is defined and valid
                method: 'PUT',
                body: updateUserData,
            }),
            invalidatesTags: ['Voter'],
        })
        

        
    })
})

export const {usePostUsersMutation, useGetUsersQuery,useGetSingleUsersQuery,useUpdateUsersMutation} = voterApi;