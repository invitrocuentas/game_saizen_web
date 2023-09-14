import { API_URL_TIENDA_LIST, API_URL_PRODUCTOS_LIST, API_URL_PRODUCTOS_BUY } from "../config/const/api.const";
import { clienteAxios } from "../config/axios/axiosInterceptor"

const getTiendaOpciones = async (config = {}) => {
    const data = await clienteAxios.get(API_URL_TIENDA_LIST, config)
    return data
}
const getTiendaProductos = async (slug, config = {}) => {
    const data = await clienteAxios.get(API_URL_PRODUCTOS_LIST, {
        params: {slug: slug}, 
        ...config
    })
    return data
}

const postComprarProductos = async (datos, config = {}) => {
    const data = await clienteAxios.post(API_URL_PRODUCTOS_BUY, datos, config)
    return data
}
export {
    getTiendaOpciones,
    getTiendaProductos,
    postComprarProductos
}