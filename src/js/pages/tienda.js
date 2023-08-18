import { Splide } from "@splidejs/splide";
// Default theme
import '@splidejs/splide/css';

// or other themes
import '@splidejs/splide/css/skyblue';
import '@splidejs/splide/css/sea-green';

// or only core styles
import '@splidejs/splide/css/core';
import { Api } from "../Api";

const tiendaProductos = async () => {

    if(document.querySelector('#productos')){
        const splide = new Splide( '#productos', {
            perPage: 4,
        } );
        
        splide.mount();
    }

    if(document.querySelector("#modulos-tienda")){
        const api = new Api
        let box = document.querySelector("#modulos-tienda")
        const rsp = await api.getInfo('/tienda/index')
        rsp.tienda.forEach(modulo => {
            const {id, nombre, slug, imagen} = modulo
            const boxModule = document.createElement("A")
            boxModule.classList.add("flex", "flex-col", "justify-around", "items-center", "bg-white", "rounded-lg", "h-[35vh]", "w-[45vh]", "shadow-lg", "hover:cursor-pointer")
            boxModule.innerHTML = `
                <div class="h-[20vh] flex justify-center items-center">
                    <img class="hover:scale-110 duration-500 ease-in-out w-[14vh]" src="../../assets/tienda/${imagen}.png" alt="">
                </div>
                <span class="text-[4vh] font-boldenvan text-[#009DC8]">${nombre}</span>            
            `
            box.appendChild(boxModule)
        });
    }

};

export {
    tiendaProductos
};