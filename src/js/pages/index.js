import { politicas_privacidad, cambioPanel } from "./inicio";

import { homeInicio } from "./home";

import { tiendaProductos } from "./tienda";

const init = () => {
    politicas_privacidad();
    cambioPanel();
    homeInicio();
    tiendaProductos();
};

export default init;