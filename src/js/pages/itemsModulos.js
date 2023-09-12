import { getTiendaProductos } from "../../services/tienda.service";

const listarAlimentos = async () => {
    if(document.querySelector('#alimentosVer')){
        var li = `<button data-modal="accionPersonaje" class="open-modal-button flex justify-center items-center h-[18vh] w-[18vh] bg-white shadow-xl rounded-[3vh] bloqued">
                    <img class="h-[12vh] hover:scale-105 duration-150 ease-in-out" src="../../../assets/vistas/alimentacion/frutas.png" alt="">
                </button>`;

        try {
            var objProductos = window.parent.productosList;
            var ulElement = document.getElementById('alimentosList');
            var slug = 'alimentacion';

            const rsp = await getTiendaProductos(slug);


            const datosUser = JSON.parse(window.parent.objUsuario);
            function crearElementoLi(id, nombre, imagenSrc, puntos, referenciaProducto, index) {
                const liElement = document.createElement('li');
                liElement.classList.add('splide__slide');
                var informacionDatos = JSON.parse(referenciaProducto);
                var descripcion = informacionDatos.descripcion;
                var referencia = informacionDatos.referencia;
                const divElement = document.createElement("div");
                divElement.classList.add("flex", "justify-center", "items-center", "w-full", "h-[90%]", "relative");
                // Crea el contenido interno del elemento div
                var innerHTML = '';
                innerHTML += `
                    <div class="w-[52vh] h-[80%] flex flex-col justify-center items-center gap-[2vh]">
                        <span class="text-[4vh] text-[#015989] font-boldenvan w-full text-center px-[3vh]">${nombre}</span>
                        <p class="text-[#7B90A1] font-boogaloo_regular text-[2.5vh] text-center paddingx-1">${descripcion.replace('<<nombre_del_avatar>>', datosUser.avatar)}</p>
                        <div class="relative flex justify-center items-center gap-[1vh]">
                `;
                if(puntos > 0){
                    innerHTML += `
                    <div class="flex justify-center items-center bg_valor bg-center bg-contain bg-no-repeat h-[10vh] w-[10vh]">               
                        <img class="h-[4vh]" src="../../assets/tienda/productos/star.png" alt="">
                        <span class="text-[3vh] font-boldenvan text-[#B35B3D]">x${puntos}</span>
                    </div>
                    <button id="comprarProducto" data-id="${id}" data-nombre="${nombre}" class="bg-center boton_obtener bg-[length:100%_100%] bg-no-repeat h-[5vh] w-[15vh] text-[2.3vh] text-center text-[#B35B3D] font-boldenvan hover:scale-105 duration-500 ease-in-out"></button>`;
                }else{
                    innerHTML += `<a href="${URL}vistas/${window.parent.slugProduct}/home.html" class="flex justify-center items-center bg-center boton_ir_usuario bg-[length:100%_100%] bg-no-repeat h-[5vh] w-[20vh] text-[2.3vh] text-center text-[#B35B3D] font-boldenvan hover:scale-105 duration-500 ease-in-out">Ir a usuario</a>`;
                }
                innerHTML += `
                        </div>`;
                
                if(referencia != ''){
                    innerHTML += `<p class="text-[#7B90A1] font-boogaloo_regular text-[2.1vh] text-center paddingx-1">${referencia}</p>`;
                }
                innerHTML +=`
                    </div>
                    <img class="w-[25vh]" src="../../assets/tienda/productos/${imagenSrc}.png" alt="">
                `;
                // Establece el contenido interno del elemento div
                divElement.innerHTML = innerHTML;
                liElement.appendChild(divElement);
                return liElement;
            }
            objProductos.forEach((datos, index) => {
                const liElement = crearElementoLi(datos.id, datos.nombre_producto, datos.imagen, datos.puntos_requeridos, datos.referencias, index);
                ulElement.appendChild(liElement);
            });
        } catch (error) {
            console.log(error);
        }
    }
}

const listarDescanso = () => {
    if(document.querySelector('#descansoVer')){
        var li = `<button data-modal="accionPersonaje" class="open-modal-button flex justify-center items-center h-[18vh] w-[18vh] bg-white shadow-xl rounded-[3vh] bloqued">
                    <img class="h-[12vh] hover:scale-105 duration-150 ease-in-out" src="../../../assets/vistas/alimentacion/frutas.png" alt="">
                </button>`;
    }
}

const listarSalud = () => {
    if(document.querySelector('#saludVer')){
        var li = `<button data-modal="accionPersonaje" class="open-modal-button flex justify-center items-center h-[18vh] w-[18vh] bg-white shadow-xl rounded-[3vh] bloqued">
                    <img class="h-[12vh] hover:scale-105 duration-150 ease-in-out" src="../../../assets/vistas/alimentacion/frutas.png" alt="">
                </button>`;
    }
}

export {
    listarAlimentos,
    listarDescanso,
    listarSalud
}