import { API_URL_USER_VERIFY, API_URL_USER_REGISTER, API_URL_USER_UTILIZAR, API_URL_VERIFY_DORMIR, API_URL_DESPERTAR, API_URL_MENSAJE, API_URL_MENSAJE_MODULO } from "../config/const/api.const";
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

const postDormirVerify = async (data, config = {}) => {
    return await clienteAxios.post(API_URL_VERIFY_DORMIR, data, config)
}

const postDespertar = async (data, config = {}) => {
    return await clienteAxios.post(API_URL_DESPERTAR, data, config)
}

const getAllMensajesModulo = async (data, config = {}) => {
    return await clienteAxios.post(API_URL_MENSAJE, data, config)
}

const getMensajeModulo = async (slug, data, config = {}) => {
    return await clienteAxios.post(API_URL_MENSAJE_MODULO, data, {
        params: {modulo: slug},
        ...config
    })
}
export {
    postVerify,
    postInicio,
    postUtilizarItem,
    postDormirVerify,
    postDespertar,
    getAllMensajesModulo,
    getMensajeModulo
}