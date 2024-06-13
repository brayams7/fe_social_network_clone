import { axiosIntance } from "./settings";

export const loginService = async (body)=>{
    try {
        const data = await axiosIntance.post('/user/login', body)
        console.log(data)
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