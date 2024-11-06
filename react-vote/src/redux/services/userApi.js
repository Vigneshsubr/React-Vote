import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
    reducerPath: "UserApi",
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
    tagTypes:['User'],

    endpoints:(build) =>({
        addSignUpUsers:build.mutation({
            query:(createUserSignUp) =>({
                url:"auth/sign-up",
                method:"POST",
                body:createUserSignUp,
            }),
            invalidatesTags:['User']
        }),

        addLogin:build.mutation({
            query:(login) =>({
                url:"auth/sign-in",
                method:"POST",
                body:login
            }),
            invalidatesTags:['User']
        }),

        addSignOutUser: build.mutation({
            query:(logout)=>({
                url:"auth/signout",
                method:"POST",
                body:logout

            }),
            invalidatesTags:['User']
        }),

    })
})

export const {useAddSignUpUsersMutation,useAddLoginMutation,useAddSignOutUserMutation} = userApi;