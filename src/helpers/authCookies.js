import Cookies from "universal-cookie";

const USERDATA = "USERDATA" 
const REFRESH_TOKEN = "REFRESH_TOKEN"
const TOKEN = "TOKEN"

const cookies = new Cookies();

export const setRefreshTokenCookie = token => cookies.set(REFRESH_TOKEN,token)

export const getRefreshTokenCookie = () => cookies.get(REFRESH_TOKEN) || null

export const removeRefreshTokenCookie = () => cookies.remove(REFRESH_TOKEN)

export const setTokenCookie = token => cookies.set(TOKEN,token)

export const getTokenCookie = () => cookies.get(TOKEN) || null

export const removeTokenCookie = () => cookies.remove(TOKEN)

export const setUserDataCookie = (dataUser) =>cookies.set(USERDATA,dataUser)

export const getUserDataCookie = ()=> cookies.get(USERDATA) || null

export const removeUserDataCookie = ()=>cookies.remove(USERDATA)