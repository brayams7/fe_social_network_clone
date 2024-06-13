import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";
export const initialStatePosts = {
  posts: {
    docs: [],
    dataPage:{
        hasNextPage: false,
        hasPrevPage: false,
        limit: 5,
        nextPage: 2,
        page: 1,
        pagingCounter: 1,
        prevPage: null,
        totalDocs: null,
        totalPages: null,
    }
  },
  isError:false,
  postUser: [],
};

export const postsSlice = createSlice({
    name:'posts',
    initialState:initialStatePosts,
    reducers:{
        setListPosts:(state, action)=>{
            const newList = [...state.posts, ...action.payload]
            state.posts = newList
        },
        setDataPosts:(state, action)=>{
            const { docs, ...rest } = action.payload
            let list = []
            if(rest.page === 1) list = docs
            if(rest.page > 1) list = _.uniqBy([...state.posts.docs, ...docs],'_id')
            state.posts.docs = list
            state.posts.dataPage = rest
        },

        // setDataPostInit:(state, action)=>{
        //     const { docs, ...rest } = action.payload
        //     // const list = _.uniqBy([...state.posts.docs, ...docs],'_id')
        //     state.posts.docs = docs
        //     state.posts.dataPage = rest
        // },

        setError:(state, action)=>{
            state.isError = action.payload
        },
        setInitState:(state, action)=>{
            state.posts = initialStatePosts.posts
            state.isError = initialStatePosts.isError
        }
    }
})

export const { setListPosts, setDataPosts, setInitState} = postsSlice.actions

export default postsSlice.reducer
