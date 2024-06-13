import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import { apiSlice } from "../services/apiSlice";
import postsSlice from "./slices/postsSlice";
export const reducer =  combineReducers({
    auth:authSlice,
    posts:postsSlice,
    [apiSlice.reducerPath]:apiSlice.reducer
})

