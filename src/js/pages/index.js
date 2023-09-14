import { politicas_privacidad, cambioPanel, cambioEstado } from "./inicio";

import { homeInicio } from "./home";

import { tiendaOpciones,tiendaProductos,productosVer,comprarProducto } from "./tienda";

import { flip } from "./memoria";

import { listarItems,utilizarItem,interaccionrespuesta } from "./itemsModulos";

import { obstaculosGame } from "./obstaculos";

const init = () => {
    politicas_privacidad();
    cambioPanel();
    cambioEstado();
    homeInicio();
    tiendaOpciones();
    flip();
    obstaculosGame();
    tiendaProductos();
    productosVer();
    comprarProducto();
    listarItems();
    utilizarItem();
    interaccionrespuesta();
};

export default init;