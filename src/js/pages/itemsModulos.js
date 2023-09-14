import { getTiendaProductos } from "../../services/tienda.service";
import { postAlmacen,getAllProductosModulo } from "../../services/almacen.service";
import { postUtilizarItem,postVerify } from "../../services/user.service";
import { URL } from "../../config/const/api.const";

const listarItems = async () => {
    if(document.querySelector('#itemsVer')){
        try {

            document.getElementById('loader').classList.remove('hidden');

            var ulElement = document.getElementById('itemsList');
            let slug = ulElement.getAttribute('data-slug');
            const datosUser = JSON.parse(window.parent.objUsuario);

            var {productos} = await getAllProductosModulo(slug, {id_usuario: datosUser.id});

            function crearElementoLi(id, nombre, imagenSrc, puntos, referencias, mostrarProducto) {
                const liElement = document.createElement('li');
                liElement.classList.add('splide__slide');

                const buttonElement = document.createElement("button");
                buttonElement.classList.add('flex', 'justify-center', 'items-center', 'h-[18vh]', 'w-[18vh]', 'bg-white', 'shadow-xl', 'rounded-[3vh]');
                buttonElement.setAttribute('data-id', id);
                buttonElement.setAttribute('data-nombre', imagenSrc);

                if(mostrarProducto == 0){
                    buttonElement.classList.add('bloqued');
                }

                const imgElement = document.createElement('img');
                    imgElement.classList.add('h-[12vh]', 'hover:scale-105', 'duration-150', 'ease-in-out');
                    imgElement.src = '../../../assets/vistas/'+slug+'/'+imagenSrc+'.png';
                    imgElement.alt = '';
    
                buttonElement.appendChild(imgElement);

                if(mostrarProducto == 1){
                    buttonElement.onclick = function () {

                        var { mensaje } = JSON.parse(referencias);

                        window.parent.nombreProducto = imagenSrc;

                        document.querySelector('.mensajeVerProducto').textContent = mensaje.replace('<<nombre_del_avatar>>', datosUser.avatar);
                        const mostrarPuntos = document.querySelectorAll('.puntosVerAccion');
    
                        mostrarPuntos.forEach(mostrar => {
                            mostrar.textContent = puntos;
                        });

                        window.objItemSelect = {
                            id_usuario: datosUser.id,
                            id_producto: buttonElement.getAttribute('data-id')
                        }

                        window.parent.productoNombreSelect = nombre;

                        window.parent.slug = slug;
    
                        document.querySelector('.cantidadVerProducto').classList.remove('hidden');
                        document.querySelector('#accionPersonaje').classList.remove('hidden');
                    };
                }

                liElement.appendChild(buttonElement);
                return liElement;
            }
            
            productos.forEach((datos, index) => {
                const liElement = crearElementoLi(datos.id, datos.nombre_producto, datos.imagen, datos.puntos_obtenidos, datos.referencias, datos.mostrar);
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

const utilizarItem = () => {
    if(document.querySelector('#interactuarItem')){
        const buttonInteractuar = document.querySelector('#interactuarItem');

        buttonInteractuar.addEventListener('click', async () => {
            try {
                await postUtilizarItem(window.parent.slug, window.objItemSelect);
                try {

                    const data = await postVerify({id_user: window.parent.identificador});
                    window.parent.objUsuario = JSON.stringify(data.data[0]);

                    const datosUser = JSON.parse(window.parent.objUsuario);

                    document.getElementById('monedasUsuario').textContent = datosUser.puntos;
                    document.getElementById('nivelUsuario').textContent = datosUser.nivel == null || datosUser.nivel == 'null' ? 1 : datosUser.nivel;

                    window.location.href = URL+'vistas/'+window.parent.slug+'/activado.html';

                } catch (err) {
                    throw err
                }
            } catch (error) {
                console.log(error);
                document.querySelector('.cantidadVerProducto').classList.add('hidden');
                document.querySelector('.mensajeVerProducto').innerHTML = `
                                                                        <div class="z-30 flex flex-col justify-center items-center gap-[4vh] px-[8vh] text-center">
                                                                            <span id="nombre_producto_ver" class="text-[#015989] font-boldenvan text-[5vh]">UPS!!!</span>
                                                                            <span id="descripcion_producto_ver" class="text-[#7B90A1] text-[4vh] font-boogaloo_regular text-justify">${error.message}</span>
                                                                        </div>
                                                                            `;
            }
        })
    }
}

const interaccionrespuesta = () => {
    if(document.getElementById('gifDinamico')){
        const gifElement = document.getElementById('gifDinamico');

        const datosUser = JSON.parse(window.parent.objUsuario);

        gifElement.src = `../../../assets/avatares/${(datosUser.personaje).toLowerCase()}/gif/${window.parent.slug}/${((window.parent.nombreProducto).toLowerCase()).replace(' ', '_')}.gif`;
        // gifElement.src = '../../../assets/avatares/zen/gif/alimentacion/golosinas.gif';
    }
}

export {
    listarItems,
    utilizarItem,
    interaccionrespuesta
}