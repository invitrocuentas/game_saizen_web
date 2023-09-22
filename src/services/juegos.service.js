import { API_URL_MEMORIA_GET,API_URL_MEMORIA_UP,API_URL_OBSTACULO_GET,API_URL_OBSTACULO_UP } from "../config/const/api.const";
import { clienteAxios } from "../config/axios/axiosInterceptor"

const getMemoria = async (data, config = {}) => {
    return await clienteAxios.post(API_URL_MEMORIA_GET, data, config)
}

const upMemoria = async (data, config = {}) => {
    return await clienteAxios.post(API_URL_MEMORIA_UP, data, config)
}

const getObstaculo = async (datos, config = {}) => {
    return await clienteAxios.post(API_URL_OBSTACULO_GET, datos, config)
}

const upObstaculo = async (datos, config = {}) => {
    return await clienteAxios.post(API_URL_OBSTACULO_UP, datos, config)
}

export {
    getMemoria,
    upMemoria,
    getObstaculo,
    upObstaculo
}