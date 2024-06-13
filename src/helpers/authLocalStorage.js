const USERDATA = "USERDATA" 
const TOKEN = "TOKEN"
const PERMISSIONSUSER = "PERMISSIONSUSER"

export const setUserData = (dataUser) =>{
    localStorage.setItem(USERDATA, JSON.stringify(dataUser))
}

export const getUserData = ()=>{
    return JSON.parse(localStorage.getItem(USERDATA)) || null
}

export const removeUserData = ()=>{
    return localStorage.removeItem(USERDATA)
}

export const setToken = (token) =>{
    localStorage.setItem(TOKEN, JSON.stringify(token))
}

export const getToken = ()=>{
    return JSON.parse(localStorage.getItem(TOKEN)) || null
}

export const removeToken = ()=>{
    return localStorage.removeItem(TOKEN)
}

export const setPermissionsUser = (permissions)=>{
    localStorage.setItem(PERMISSIONSUSER,JSON.stringify(permissions))
}

export const getPermissionsUser = ()=>{
    const roles = []
    if(localStorage.getItem(PERMISSIONSUSER))
        JSON.parse(localStorage.getItem(PERMISSIONSUSER)).forEach(element => {
            roles.push(element)
        });
    return roles
}

export const removePermissionsUser = ()=>{
    return localStorage.removeItem(PERMISSIONSUSER)
}

export const cleanData = ()=>{
    localStorage.clear()
}
