import { API_URL_ALMACEN } from "../config/const/api.const";
import { clienteAxios } from "../config/axios/axiosInterceptor"

const postAlmacen = async (data, config = {}) => {
    return await clienteAxios.post(API_URL_ALMACEN, data, config)
}
export {
    postAlmacen
}