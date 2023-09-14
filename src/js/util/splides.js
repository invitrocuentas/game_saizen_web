import { Splide } from "@splidejs/splide";
// Default theme
import '@splidejs/splide/css';

// or other themes
import '@splidejs/splide/css/skyblue';
import '@splidejs/splide/css/sea-green';

// or only core styles
import '@splidejs/splide/css/core';

const splidesListado = () => {
    
    if(document.querySelector('#productos')){
        const splide = new Splide( '#productos', {
            perPage: 4,
            type   : 'loop',
            pagination: false
        } );
        
        splide.mount();
    }

    if(document.querySelector('#productosVer')){
        const splide = new Splide( '#productosVer', {
            perPage: 1,
            type  : 'fade',
            rewind: true,
            pagination: false,
            drag: false,
        } );
        
        splide.mount();
        splide.go(window.parent.producto);
    }

    if(document.querySelector('#itemsVer')){
        const splide = new Splide( '#itemsVer', {
            direction: 'ttb',
            perPage: 3,
            height: '100%',
            type   : 'loop',
            clones : false,
            drag: false,
            pagination: false
        } );
        
        setTimeout(() => {
            splide.mount();
        }, 1000);
    }
};

export {
    splidesListado
};