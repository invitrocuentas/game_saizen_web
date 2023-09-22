const API_URL = "https://linksiv.com/revision/regional/api/";
// TIENDA OPCIONES
const API_URL_TIENDA_LIST = "tienda/index";
const API_URL_PRODUCTOS_LIST = "modulos/index";
const API_URL_PRODUCTOS_BUY = "tienda/compras";

// AUTENTIFICACION
const API_URL_USER_REGISTER = "auth/inicio";
const API_URL_USER_VERIFY = "auth/verify";
const API_URL_USER_UTILIZAR = "utilizar/use"
const API_URL_VERIFY_DORMIR = "usuario/getDormir";
const API_URL_DESPERTAR = "usuario/dormir";
const API_URL_MENSAJE = "usuario/getMessage";
const API_URL_MENSAJE_MODULO = "usuario/getMessageByModulo";

// ALMACEN
const API_URL_ALMACEN = "tienda/inventario";
const API_URL_PROD_MODULO = "utilizar";

// JUEGOS
const API_URL_MEMORIA_GET = "memoria/getLevel";
const API_URL_MEMORIA_UP = "memoria/upLevel";
const API_URL_MEMORIA_BUY = "";
const API_URL_OBSTACULO_GET = "obstaculo/getLevel";
const API_URL_OBSTACULO_UP = "obstaculo/upLevel";
const API_URL_OBSTACULO_BUY = "";

// URL PRINCIPAL DEL JUEGO
// const URL = "https://linksiv.com/revision/GrowinTest/game-folder/";
// const URL_ASSETS = "https://linksiv.com/revision/GrowinTest/assets/";
const URL = "http://127.0.0.1:5500/game-folder/";
const URL_ASSETS = "http://127.0.0.1:5500/assets/";

export {
    API_URL,
    API_URL_TIENDA_LIST,
    API_URL_USER_REGISTER,
    API_URL_USER_VERIFY,
    URL,
    API_URL_ALMACEN,
    API_URL_PRODUCTOS_LIST,
    API_URL_PRODUCTOS_BUY,
    API_URL_USER_UTILIZAR,
    URL_ASSETS,
    API_URL_PROD_MODULO,
    API_URL_VERIFY_DORMIR,
    API_URL_DESPERTAR,
    API_URL_MENSAJE,
    API_URL_MENSAJE_MODULO,
    API_URL_MEMORIA_GET,
    API_URL_MEMORIA_UP,
    API_URL_OBSTACULO_GET,
    API_URL_OBSTACULO_UP
}