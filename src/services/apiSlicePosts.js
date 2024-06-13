import { apiSlice } from "./apiSlice";
import moment from "moment";
import "moment/locale/es";
import { validateRegexURL } from "../utilsFuntions/utilsForm";

moment.locale("es")

const LIMIT = 10

export const postApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPostsUser: builder.query({
      query: (idUser) => ({
        url:`/posts/timeLine/${idUser}`
      }),
      // keepUnusedDataFor:20,

      transformResponse: (response, meta, args) => {
        const list = response.data;
        try {
          if (Array.isArray(list)) {
            const data = list.map((value) => {
              const createdAt = moment(list.createdAt).format("LLL");
              const image = validateRegexURL(value.image) === true ? value.image : ""
              return {
                ...value,
                createdAt,
                image
              };
            });

            response.data = data;
          }
        } catch (error) {
          console.log(error);
          response.data = [];
        }

        return response;
      },
      providesTags: (result) => {
        return result && Array.isArray(result?.data) ? [

          ...result.data.map(({ _id }) => ({ type: 'PostsUser', id:_id })),
          { type: 'PostsUser', id: 'LIST_USER' },
        ]
        :
        [{ type: 'PostsUser', id: 'LIST_USER' }]
      }
    }),

    getPosts: builder.query({
      query: ({page=1, id})=>({
        url:`/posts/postPagination?page=${page}&limit=${LIMIT}`
      }),
      transformResponse: (response, meta, args) => {
        const list = response.data.docs
        try {
          if (Array.isArray(list)) {
            const data = list.map((value) => {
              const createdAt = moment(list.createdAt).format("LLL");
              const image = validateRegexURL(value.image) === true ? value.image : ""
              return {
                ...value,
                createdAt,
                image
              };
            });

            response.data.docs = data;
            
          }
        } catch (error) {
          console.log(error)
          response.data.docs = []
        }

        return response;
      },
      providesTags: (result) => {
        const page = result.data.page
        return [{ type: 'Posts', id: page}]
      }
    }),

    uploadPost: builder.mutation({
      query: (data)=>({
        url:"/posts",
        method:"POST",
        body:data
      }),

      invalidatesTags:(_response, _error, {userId}) => [{ type: 'Posts', id:1}, {type:'UserCountPosts', id:userId}]
    }),

    getPost: builder.query({
      query: (id) => ({
        url:`/posts/${id}`
      }),
      providesTags: (_result, _error, {idPost}) => [{ type: 'PostsUser', id:idPost }],
    }),

    getPostU: builder.mutation({ //Metodo para obtener el post despues de darle like y obtener los likes actualizados
      query: ({postId, like}) =>({
        url:`/posts/${postId}`,
        method:'GET'
      }),
      async onQueryStarted({postId, like}, {dispatch, queryFulfilled}){
        try {
          const { data: updatedPost } = await queryFulfilled

          if(updatedPost.code === 200){

            const newPost = updatedPost.data
            
            const idUser = newPost.userId
            dispatch(
              apiSlice.util.updateQueryData('getPostsUser', idUser, (draftPosts) => {
                const posts = draftPosts?.data.map( post => {
                  if(post._id === postId) return newPost 
                  return post
                })

                if(Array.isArray(posts))
                  draftPosts.data = posts

                return draftPosts

              })
            )
          }
          apiSlice.endpoints.getPosts.useQuery({postId, like})

        } catch {
          console.log("error")
        }
      }
    }),

    likePost: builder.mutation({
      query: ({idPost, body})=>{
        return {
          url:`/posts/liked/${idPost}`,
          method:'PUT',
          body
        }
      }
    })

  }),
});

export const {
  useGetPostsUserQuery,
  useUploadPostMutation,
  useLikePostMutation,
  useGetPostQuery,
  useGetPostUMutation,
  useGetPostsQuery,
  useLazyGetPostsQuery
} = postApiSlice;