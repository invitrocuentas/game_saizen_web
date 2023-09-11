import { politicas_privacidad, cambioPanel, cambioEstado } from "./inicio";

import { homeInicio } from "./home";

import { tiendaOpciones,tiendaProductos,productosVer } from "./tienda";

import { flip } from "./memoria";

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
};

export default init;