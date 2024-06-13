import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    auth:{
        user:{},
        token:{}
    },
    token:null,
    loading:false,
    isError:false
}

export const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        setUser:(state, action)=>{
            state.auth.user = action.payload
        },
        setToken:(state, action)=>{
            state.auth.token = action.payload
        },
        setLoading:(state, action)=>{
            state.loading = action.payload
        },
        setIsError:(state, action)=>{
            state.isError = action.payload
        },
    }
})

export const { setUser, setLoading, setIsError, setToken} = authSlice.actions

export default authSlice.reducer

