import axios from "axios"
import { getToken, getUserData } from "../helpers/authLocalStorage"
import { removeTokenCookie, removeUserDataCookie } from "../helpers/authCookies"
export const apiKey = process.env.REACT_APP_API_KEY || ""

export const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:3001'

export const axiosIntance = axios.create({
    baseURL:API_BASE,
    headers:{
        "Content-Type":"application/json"
    }
})

/*
    Instancia para token
*/
export const axiosToken = axios.create({
    baseURL:API_BASE,
    headers:{
        "Content-Type":"application/json"
    }
})

//Interceptor

export const publicAxios = () => {
  axiosIntance.interceptors.response.use(
    function(response){
      return response.data
    },
    function(error){
      console.log("error interceptor", error)
      return error
    }
  )
}

export const initAxios = () => {
    
    axiosToken.defaults.baseURL = API_BASE
  
    axiosToken.interceptors.request.use( (configAxios) => {
        
        const token = getToken()
        const user = getUserData()
        console.log({
          headers:configAxios
        })
        if(token && user) {
            configAxios.headers = {
              'username': user.username,
              'Authorization': "Token "+ token,
              "Content-Type":"application/json",
              ...configAxios.headers
            }
        }
        
        return configAxios
    })
  
    axiosToken.interceptors.response.use(
      function (response) {
        return response.data
      },
      function (error) {
        if(typeof error.response != 'undefined' && typeof error.response.status != 'undefined' && error.response.status === 401) {
          console.log(error, 'response error 1')
          removeTokenCookie()
          removeUserDataCookie()
        }else {
          return error
        }
      }
    )
  }