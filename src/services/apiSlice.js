import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE } from "./settings";
import { setUser, setToken } from "../redux/slices/authSlice";
import { Mutex } from 'async-mutex'
import { getRefreshTokenCookie, getTokenCookie, removeRefreshTokenCookie, removeTokenCookie, removeUserDataCookie, setTokenCookie } from "../helpers/authCookies";

const mutex = new Mutex()

const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE,
  // credentials:'include',
  prepareHeaders: (headers, { _getState }) => {
    const user = getTokenCookie()
    if (user) {
      const token = user.jwt;
      headers.set("Authorization", `Bearer ${token}`);
      
    }
    return headers;
  },
  // validateStatus: (_response, result) => {
  //   if (result.code !== 500 || result.code !== 401) return true;
  //   else {
  //     cleanData();
  //     return false;
  //   }
  // },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  await mutex.waitForUnlock()
  let result = await baseQuery(args, api, extraOptions)
  
  if ((result.error && result.error.status === 401) || result.data.code === 401) {
    // checking whether the mutex is locked
    if (!mutex.isLocked()) {

      const release = await mutex.acquire()

      try {
        const getToken = getRefreshTokenCookie()
        const refreshResult = await baseQuery(
          {
            url:'/user/refreshToken',
            method:'GET',
            headers:{
              refreshToken:`Bearer ${getToken.refreshToken}`
            }
          },
          api,
          extraOptions
        )

        if (refreshResult.data?.code === 200) {
          setTokenCookie(refreshResult.data?.data)
          api.dispatch(setToken(refreshResult.data?.data))
          
          result = await baseQuery(args, api, extraOptions)

        } else {
          removeUserDataCookie()
          removeTokenCookie()
          removeRefreshTokenCookie()
          api.dispatch(setUser({}))
          api.dispatch(setToken({}))
        }
      } finally {
        // release must be called once the mutex should be released again.
        release()
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock()
      result = await baseQuery(args, api, extraOptions)
    }
  }
  return result
}

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes:["Posts","User"],
  endpoints: _builder =>({})
});


