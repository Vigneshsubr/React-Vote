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
                url:"auth/sign-up/user",
                method:"POST",
                body:createUserSignUp,
            }),
            invalidatesTags:['User']
        }),

        addSignUpAdmins:build.mutation({
            query:(createAdminSignUp) =>({
                url:"auth/sign-up/admin",
                method:"POST",
                body:createAdminSignUp,
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
    })
})

export const {useAddSignUpUsersMutation,useAddSignUpAdminsMutation,useAddLoginMutation} = userApi;