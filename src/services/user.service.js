import { API_URL_USER_VERIFY, API_URL_USER_REGISTER } from "../config/const/api.const";
import { clienteAxios } from "../config/axios/axiosInterceptor"

const postVerify = async (data, config = {}) => {
    return await clienteAxios.post(API_URL_USER_VERIFY, data, config)
}

const postInicio = async (data, config = {}) => {

    return await clienteAxios.post(API_URL_USER_REGISTER, data, config)
}
export {
    postVerify,
    postInicio
}