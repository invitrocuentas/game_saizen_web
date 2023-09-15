import { getAllProductosModulo } from "../../services/almacen.service";
import { postUtilizarItem,postVerify } from "../../services/user.service";
import { URL } from "../../config/const/api.const";

const listarItems = async () => {

    if(document.querySelector('.vistaModulo')){
        const vista= document.querySelector('.vistaModulo'); 
        window.parent.slug = vista.getAttribute('data-slug');
    }

    if(document.querySelector('#itemsVer')){
        try {

            document.getElementById('loader').classList.remove('hidden');

            var ulElement = document.getElementById('itemsList');
            const datosUser = JSON.parse(window.parent.objUsuario);

            var {productos} = await getAllProductosModulo(window.parent.slug, {id_usuario: datosUser.id});

            function crearElementoLi(id, nombre, imagenSrc, puntos, referencias, mostrarProducto) {
                const liElement = document.createElement('li');
                liElement.classList.add('splide__slide');

                const buttonElement = document.createElement("button");
                buttonElement.classList.add('flex', 'justify-center', 'items-center', 'h-[18vh]', 'w-[18vh]', 'bg-white', 'shadow-xl', 'rounded-[3vh]', 'relative');
                buttonElement.setAttribute('data-id', id);
                buttonElement.setAttribute('data-nombre', imagenSrc);

                if(mostrarProducto == 0 && puntos != 0){
                    buttonElement.classList.add('bloqued');
                }

                const imgElement = document.createElement('img');
                    imgElement.classList.add('h-[12vh]', 'hover:scale-105', 'duration-150', 'ease-in-out');
                    imgElement.src = '../../../assets/vistas/'+window.parent.slug+'/'+imagenSrc+'.png';
                    imgElement.alt = '';
    
                buttonElement.appendChild(imgElement);

                if(mostrarProducto == 1 || puntos == 0){
                // if(1){
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
    
                        document.querySelector('.cantidadVerProducto').classList.remove('hidden');
                        document.querySelector('#accionPersonaje').classList.remove('hidden');
                        document.querySelector('.quitarContenido').classList.remove('hidden');

                        if(imagenSrc == 'jabon' || imagenSrc == 'cepillarse' || imagenSrc == 'dormir'){
                            document.querySelector('.interactuarItem').setAttribute('data-item', imagenSrc);
                            document.querySelector('.interactuarItem').setAttribute('data-paso', 2);
                            document.querySelector('.interactuarItem').setAttribute('data-slug', window.parent.slug);
                        }

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
    if(document.querySelector('.interactuarItem')){

        const cambiosModal = document.querySelector('#accionPersonaje').querySelectorAll('.close');
        cambiosModal.forEach(btn3 => {
            btn3.addEventListener('click', () =>{
                const elementosConDataItem = document.querySelectorAll('[data-item]');

                elementosConDataItem.forEach(element => {
                    element.setAttribute('data-paso', 0);
                });

            })
        });

        const buttonInteractuar = document.querySelectorAll('.interactuarItem');
        const datosUser = JSON.parse(window.parent.objUsuario);

        buttonInteractuar.forEach(btn => {
            btn.addEventListener('click', async () => {
                if(btn.getAttribute('data-paso') == 0){
                    try {
                        const productosList = await getAllProductosModulo(btn.getAttribute('data-slug'), {id_usuario: datosUser.id});
                        const datoProducto = productosList.productos.find(producto => producto.imagen === btn.getAttribute('data-item'));

                        console.log(datoProducto);

                        if(datoProducto.mostrar == 1){
                        // if(1){
                            var { mensaje } = JSON.parse(datoProducto.referencias);

                            window.parent.nombreProducto = datoProducto.imagen;

                            document.querySelector('.mensajeVerProducto').textContent = mensaje.replace('<<nombre_del_avatar>>', datosUser.avatar);
                            const mostrarPuntos = document.querySelectorAll('.puntosVerAccion');
        
                            mostrarPuntos.forEach(mostrar => {
                                mostrar.textContent = datoProducto.puntos_obtenidos;
                            });

                            window.objItemSelect = {
                                id_usuario: datosUser.id,
                                id_producto: datoProducto.id
                            }

                            window.parent.productoNombreSelect = datoProducto.nombre_producto;
        
                            document.querySelector('.quitarContenido').classList.remove('hidden');
                            document.querySelector('.cantidadVerProducto').classList.remove('hidden');
                            document.querySelector('#accionPersonaje').classList.remove('hidden');

                            btn.setAttribute('data-paso', 1);
                        }else{
                            document.querySelector('#accionPersonaje').classList.remove('hidden');
                            document.querySelector('.cantidadVerProducto').classList.add('hidden');
                            document.querySelector('.quitarContenido').classList.add('hidden');
                            document.querySelector('.mensajeVerProducto').innerHTML = `
                                                                                    <div class="z-30 flex flex-col justify-center items-center gap-[4vh] px-[8vh] text-center">
                                                                                        <span id="nombre_producto_ver" class="text-[#015989] font-boldenvan text-[5vh]">UPS!!!</span>
                                                                                        <span id="descripcion_producto_ver" class="text-[#7B90A1] text-[4vh] font-boogaloo_regular text-justify">No se puede realizar esta acción ahora.</span>
                                                                                    </div>
                                                                                        `;
            
                            setTimeout(() => {
                                document.querySelector('#accionPersonaje').classList.add('hidden');
                            }, 2000);
                        }
                    } catch (error) {
                        console.log(error);
                    }
                }else{
                    if((window.parent.nombreProducto == 'jabon' || window.parent.nombreProducto == 'dormir' || window.parent.nombreProducto == 'cepillarse') && btn.getAttribute('data-paso') == 1){
                        window.location.href = `${URL}vistas/interaccion/${window.parent.nombreProducto}.html`;
                    }else{
                        try {
                            await postUtilizarItem(window.parent.slug, window.objItemSelect);
                            try {
            
                                const data = await postVerify({id_user: window.parent.identificador});
                                window.parent.objUsuario = JSON.stringify(data.data[0]);
                                document.getElementById('monedasUsuario').textContent = datosUser.puntos;
                                document.getElementById('nivelUsuario').textContent = datosUser.nivel == null || datosUser.nivel == 'null' ? 1 : datosUser.nivel;
            
                                window.location.href = URL+'vistas/'+window.parent.slug+'/activado.html';
            
                            } catch (err) {
                                throw err
                            }
                        } catch (error) {
                            console.log(error.message);
                            document.querySelector('.cantidadVerProducto').classList.add('hidden');
                            document.querySelector('.quitarContenido').classList.add('hidden');
                            document.querySelector('.mensajeVerProducto').innerHTML = `
                                                                                    <div class="z-30 flex flex-col justify-center items-center gap-[4vh] px-[8vh] text-center">
                                                                                        <span id="nombre_producto_ver" class="text-[#015989] font-boldenvan text-[5vh]">UPS!!!</span>
                                                                                        <span id="descripcion_producto_ver" class="text-[#7B90A1] text-[4vh] font-boogaloo_regular text-justify">No se puede realizar esta acción ahora.</span>
                                                                                    </div>
                                                                                        `;
                            setTimeout(() => {
                                document.querySelector('#accionPersonaje').classList.add('hidden');
                            }, 2000);
                        }
                    }
                }
            })
        });
    }
}

const interaccionrespuesta = () => {
    if(document.getElementById('gifDinamico')){
        const gifElement = document.getElementById('gifDinamico');

        const datosUser = JSON.parse(window.parent.objUsuario);

        let slugGif = window.parent.slug;
        let nombreImg = ((window.parent.nombreProducto).toLowerCase()).replace(' ', '_');

        if(nombreImg == 'cepillarse'){
            slugGif = 'descanso'
        }else if(nombreImg == 'jabon'){
            slugGif = 'salud'
        }

        gifElement.src = `../../../assets/avatares/${(datosUser.personaje).toLowerCase()}/gif/${slugGif}/${nombreImg}.gif`;
        // gifElement.src = '../../../assets/avatares/zen/gif/alimentacion/golosinas.gif';
    }

    if(document.querySelector('.avatarDormir')){
        const imgDormir = document.querySelector('.avatarDormir');
        // const datosUser = JSON.parse(window.parent.objUsuario);

        // imgDormir.src = `../../../assets/avatares/${(datosUser.personaje).toLowerCase()}/imagenes/dormir/dormir.png`;
        imgDormir.src = `../../../assets/avatares/zen/imagenes/dormir/dormir.png`;
    }

    if(document.getElementById('gifBanarse')){
        const gifElement = document.getElementById('gifBanarse');
        const datosUser = JSON.parse(window.parent.objUsuario);

        gifElement.src = `../../../assets/avatares/${(datosUser.personaje).toLowerCase()}/gif/jabon/jabon.gif`;

        const interaccionDucha = document.querySelectorAll('.itemJabon');

        interaccionDucha.forEach((btn,index) => {
            btn.addEventListener('click', async() => {
                btn.querySelector('img').classList.remove('activoButton');
                if(!btn.classList.contains('bloqued')){
                    btn.classList.add('bloqued');
                    if(interaccionDucha.length > (index+1)){
                        interaccionDucha[index+1].querySelector('img').classList.add('activoButton');
                        interaccionDucha[index+1].classList.remove('bloqued');
                        interaccionDucha[index+1].querySelector('img').classList.add('activoButton');
                        gifElement.src = `../../../assets/avatares/${(datosUser.personaje).toLowerCase()}/gif/jabon/${interaccionDucha[index+1].getAttribute('data-accion')}.gif`;
                    }else{

                        try {
                            await postUtilizarItem(window.parent.slug, window.objItemSelect);
                            try {
            
                                const data = await postVerify({id_user: window.parent.identificador});
                                window.parent.objUsuario = JSON.stringify(data.data[0]);
                                document.getElementById('monedasUsuario').textContent = datosUser.puntos;
                                document.getElementById('nivelUsuario').textContent = datosUser.nivel == null || datosUser.nivel == 'null' ? 1 : datosUser.nivel;
            
                                window.location.href = URL+'vistas/'+window.parent.slug+'/activado.html';
            
                            } catch (err) {
                                throw err
                            }
                        } catch (error) {
                            console.log(error.message);
                            document.querySelector('.cantidadVerProducto').classList.add('hidden');
                            document.querySelector('.mensajeVerProducto').innerHTML = `
                                                                                    <div class="z-30 flex flex-col justify-center items-center gap-[4vh] px-[8vh] text-center">
                                                                                        <span id="nombre_producto_ver" class="text-[#015989] font-boldenvan text-[5vh]">UPS!!!</span>
                                                                                        <span id="descripcion_producto_ver" class="text-[#7B90A1] text-[4vh] font-boogaloo_regular text-justify">${error.message}</span>
                                                                                    </div>
                                                                                        `;
                        } finally{
                            document.querySelector('#accionPersonaje').classList.remove('hidden');

                            setTimeout(() => {
                                window.location.href = `${URL}vistas/${window.parent.slug}/home.html`;
                            }, 2000);
                        }
                    }
                }
            })
        });

    }

    if(document.getElementById('volverAlInicio')){
        const inicioDinamico = document.getElementById('volverAlInicio');

        inicioDinamico.addEventListener('click', () => {
            window.location.href = `${URL}vistas/${window.parent.slug}/home.html`;
        })
    }
}

export {
    listarItems,
    utilizarItem,
    interaccionrespuesta
}