import { marcharAtras, modalesAcciones, vibracionBtn, cambiarContenido } from "./botones";
import { cambiarVolumen } from "./inputrange";
import { tabsCambiar } from "./tabs";
import { splidesListado } from "./splides";

const init = () => {
    marcharAtras();
    modalesAcciones();
    vibracionBtn();
    cambiarContenido();
    cambiarVolumen();
    tabsCambiar();
    splidesListado();
};

export default init;