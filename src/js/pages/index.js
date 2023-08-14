import { politicas_privacidad } from "./inicio";
import { cambioPanel } from "./inicio";

import { homeInicio } from "./home";

const init = () => {
    politicas_privacidad();
    cambioPanel();
    homeInicio();
};

export default init;