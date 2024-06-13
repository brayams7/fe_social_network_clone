import { apiSlice } from "./apiSlice";

const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCountPostsUser: builder.query({
      query: (id) => ({
        url: `/user/countPosts/${id}`,
      }),
      providesTags: (_result, _error, id) => [{ type: 'UserCountPosts', id }],
      transformResponse:(res)=>{
        return res.response.data || 0
      }
    }),

    getUserDetail: builder.query({
      query: (id) => ({
        url: `/user/${id}`,
      }),
      providesTags: (_result, _error, id) => [{ type: 'UserDetail', id }],
      transformResponse:(res)=>{
        return res.response.data
      }
    }),
  }),
});


export const {
  useGetCountPostsUserQuery,
  useGetUserDetailQuery
} = userApiSlice
