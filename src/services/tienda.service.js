import { API_URL_TIENDA_LIST, API_URL_PRODUCTOS_LIST } from "../config/const/api.const";
import { clienteAxios } from "../config/axios/axiosInterceptor"

const getTiendaOpciones = async (config = {}) => {
    const data = await clienteAxios.get(API_URL_TIENDA_LIST, config)
    return data
}
const getTiendaProductos = async (slug, config = {}) => {
    const data = await clienteAxios.get(API_URL_PRODUCTOS_LIST+'slug='+slug, config)
    return data
}
export {
    getTiendaOpciones,
    getTiendaProductos
}