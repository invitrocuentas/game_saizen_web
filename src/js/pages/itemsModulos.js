import { getTiendaProductos } from "../../services/tienda.service";
import { postAlmacen } from "../../services/almacen.service";
import { postUtilizarItem,postVerify } from "../../services/user.service";
import { URL } from "../../config/const/api.const";

const listarAlimentos = async () => {
    if(document.querySelector('#alimentosVer')){
        try {

            document.getElementById('loader').classList.remove('hidden');

            var ulElement = document.getElementById('alimentosList');
            let slug = 'alimentacion';
            const datosUser = JSON.parse(window.parent.objUsuario);

            var [ {productos}, {inventario} ] = await Promise.all([getTiendaProductos(slug), postAlmacen({id_usuario: datosUser.id})]);

            function crearElementoLi(id, nombre, imagenSrc, puntos, referencias) {
                const liElement = document.createElement('li');
                liElement.classList.add('splide__slide');

                const buttonElement = document.createElement("button");
                buttonElement.classList.add('flex', 'justify-center', 'items-center', 'h-[18vh]', 'w-[18vh]', 'bg-white', 'shadow-xl', 'rounded-[3vh]');
                buttonElement.setAttribute('data-id', id);
                // if(inventario == null || !(id in inventario["Alimentación"])){
                //     buttonElement.classList.add('bloqued');
                // }

                const imgElement = document.createElement('img');
                    imgElement.classList.add('h-[12vh]', 'hover:scale-105', 'duration-150', 'ease-in-out');
                    imgElement.src = '../../../assets/vistas/alimentacion/'+imagenSrc+'.png';
                    imgElement.alt = '';
    
                buttonElement.appendChild(imgElement);

                // if(inventario != null && (id in inventario["Alimentación"])){
                //     buttonElement.onclick = function () {

                //         var { mensaje } = JSON.parse(referencias);

                //         console.log(nombre);
                //         document.querySelector('.mensajeVerProducto').textContent = mensaje.replace('<<nombre_del_avatar>>', datosUser.avatar);
                //         const mostrarPuntos = document.querySelectorAll('.puntosVerAccion');
    
                //         mostrarPuntos.forEach(mostrar => {
                //             mostrar.textContent = puntos;
                //         });

                //         window.objItemSelect = {
                //             id_usuario: datosUser.id,
                //             id_producto: buttonElement.getAttribute('data-id')
                //         }

                //         window.parent.productoNombreSelect = nombre;

                //         window.slug = slug;
    
                //         document.querySelector('#accionPersonaje').classList.remove('hidden');
                //     };
                // }

                liElement.appendChild(buttonElement);
                return liElement;
            }
            
            productos.forEach((datos, index) => {
                const liElement = crearElementoLi(datos.id, datos.nombre_producto, datos.imagen, datos.puntos_obtenidos, datos.referencias);
                ulElement.appendChild(liElement);
            });
        } catch (error) {
            console.log(error);
        } finally{
            setTimeout(() => {
                document.getElementById('loader').classList.add('hidden');
            }, 1000);
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

const utilizarItem = () => {
    if(document.querySelector('#interactuarItem')){
        const buttonInteractuar = document.querySelector('#interactuarItem');

        buttonInteractuar.addEventListener('click', async () => {
            try {
                const rsp = await postUtilizarItem(window.slug, window.objItemSelect);
                
                try {

                    const data = await postVerify({id_user: window.parent.identificador});
                    window.parent.objUsuario = JSON.stringify(data.data[0]);

                    const datosUser = JSON.parse(window.parent.objUsuario);

                    document.getElementById('monedasUsuario').textContent = datosUser.puntos;
                    document.getElementById('nivelUsuario').textContent = datosUser.nivel == null || datosUser.nivel == 'null' ? 1 : datosUser.nivel;

                    window.location.href = URL+'vistas/'+window.slug+'/activado.html';

                } catch (err) {
                    throw err
                }

            } catch (error) {
                console.log(error)
            }
        })
    }
}

export {
    listarAlimentos,
    listarDescanso,
    listarSalud,
    utilizarItem
}