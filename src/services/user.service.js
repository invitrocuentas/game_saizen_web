import { API_URL_USER_VERIFY, API_URL_USER_REGISTER, API_URL_USER_UTILIZAR } from "../config/const/api.const";
import { clienteAxios } from "../config/axios/axiosInterceptor"

const postVerify = async (data, config = {}) => {
    return await clienteAxios.post(API_URL_USER_VERIFY, data, config)
}

const postInicio = async (data, config = {}) => {
    return await clienteAxios.post(API_URL_USER_REGISTER, data, config)
}

const postUtilizarItem = async (slug, data, config = {}) => {
    return await clienteAxios.post(API_URL_USER_UTILIZAR, data, {
        params: {modulo: slug}, 
        ...config
    })
}
export {
    postVerify,
    postInicio,
    postUtilizarItem
}