import { marcharAtras, modalesAcciones, vibracionBtn, cambiarContenido } from "./botones";
import { cambiarVolumen } from "./inputrange";

const init = () => {
    marcharAtras();
    modalesAcciones();
    vibracionBtn();
    cambiarContenido();
    cambiarVolumen();
};

export default init;