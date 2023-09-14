import { API_URL_ALMACEN,API_URL_PROD_MODULO } from "../config/const/api.const";
import { clienteAxios } from "../config/axios/axiosInterceptor"

const postAlmacen = async (data, config = {}) => {
    return await clienteAxios.post(API_URL_ALMACEN, data, config)
}

const getAllProductosModulo = async (slug, datos, config = {}) => {
    return await clienteAxios.post(API_URL_PROD_MODULO, datos, {
        params: {modulo: slug},
        ...config
    })
}
export {
    postAlmacen,
    getAllProductosModulo
}