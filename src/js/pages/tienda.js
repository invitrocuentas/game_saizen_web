import { Splide } from "@splidejs/splide";
// Default theme
import '@splidejs/splide/css';

// or other themes
import '@splidejs/splide/css/skyblue';
import '@splidejs/splide/css/sea-green';

// or only core styles
import '@splidejs/splide/css/core';

const tiendaProductos = () => {

    if(document.querySelector('#productos')){
        var splide = new Splide( '#productos', {
            perPage: 4,
        } );
        
        splide.mount();
    }

};

export {
    tiendaProductos
};