import { politicas_privacidad, cambioPanel, cambioEstado } from "./inicio";

import { homeInicio } from "./home";

import { tiendaProductos } from "./tienda";

import { flip } from "./memoria";

const init = () => {
    politicas_privacidad();
    cambioPanel();
    cambioEstado();
    homeInicio();
    tiendaProductos();
    flip();
};

export default init;