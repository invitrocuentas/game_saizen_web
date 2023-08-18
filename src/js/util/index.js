import { marcharAtras, modalesAcciones, vibracionBtn } from "./botones";
import { cambiarVolumen } from "./inputrange";

const init = () => {
    marcharAtras();
    modalesAcciones();
    vibracionBtn();
    cambiarVolumen();
};

export default init;