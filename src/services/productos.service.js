import { API_URL_PRODUCTOS_LIST } from "../config/const/api.const";
import { clienteAxios } from "../config/axios/axiosInterceptor"

const getProducto = async (slug, config = {}) => {
    const data = await clienteAxios.get(API_URL_PRODUCTOS_LIST+'?slug='+slug, config)
    return data
}
export {
    getProducto
}