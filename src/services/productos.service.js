import { API_URL_TIENDA_LIST } from "../config/const/api.const";
import { clienteAxios } from "../config/axios/axiosInterceptor"

const getTienda = async (config = {}) => {
    const data = await clienteAxios.get(API_URL_TIENDA_LIST, config)
    return data
}
export {
    getTienda
}