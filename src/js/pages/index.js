import { politicas_privacidad, cambioPanel, cambioEstado } from "./inicio";

import { homeInicio } from "./home";

import { tiendaOpciones,tiendaProductos,productosVer,comprarProducto } from "./tienda";

import { flip } from "./memoria";

import { listarAlimentos,listarDescanso,listarSalud } from "./itemsModulos";

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
};

export default init;