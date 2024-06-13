import axios from "axios";
import { API_BASE } from "./settings";

export const axiosToken = axios.create({
    baseURL:API_BASE,
    headers:{
        "Content-Type": "multipart/form-data"
    }
})

export const uploadImage = async (body)=>{
    try {
        const response = await axiosToken.post('/uploadImage/firebase', body)
        const data = response.data

        return {
            code:data.code,
            description:data.message,
            data:{
                ...data.data,
                extra:data.extra
            }
        }
    } catch (error) {
        console.log(error)
        let description = "Ocurrió un error en el servidor, Intente mas tarde"
        return {
            code:500,
            data:null,
            description
        }
    }
}