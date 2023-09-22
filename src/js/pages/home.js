import { getTiendaProductos } from "../../services/tienda.service";
import { postDormirVerify, postVerify, getMensajeModulo } from "../../services/user.service";
import { postAlmacen } from "../../services/almacen.service";
import { URL, URL_ASSETS } from "../../config/const/api.const";

const homeInicio = async () => {

    if(document.querySelector('button') || document.querySelector('a')){
        const botones = document.querySelectorAll('button');
        const enlaces = document.querySelectorAll('a');
        botones.forEach(btn => {
            btn.addEventListener('mouseover', () => {
                window.parent.postMessage({ type: "hover", tipo: 'hoverBasico' }, "*");
            })
        });

        botones.forEach(btn => {
            btn.addEventListener('click', () => {
                window.parent.postMessage({ type: "click", tipo: 'clickBasico' }, "*");
            })
        });

        enlaces.forEach(btn => {
            btn.addEventListener('mouseover', () => {
                window.parent.postMessage({ type: "hover", tipo: 'hoverBasico' }, "*");
            })
        });

        enlaces.forEach(btn => {
            btn.addEventListener('click', () => {
                window.parent.postMessage({ type: "click", tipo: 'clickBasico' }, "*");
            })
        });
    }

    // if(document.querySelector('button') || document.querySelector('a')){
    //     const botones = document.querySelectorAll('button');
    //     const enlaces = document.querySelectorAll('a');
    //     botones.forEach(btn => {
    //         btn.addEventListener('mouseover', () => {
    //             window.parent.postMessage({ type: "hover", tipo: 'hover_dormir' }, "*");
    //         })
    //     });

    //     botones.forEach(btn => {
    //         btn.addEventListener('click', () => {
    //             window.parent.postMessage({ type: "click", tipo: 'click_dormir' }, "*");
    //         })
    //     });

    //     enlaces.forEach(btn => {
    //         btn.addEventListener('mouseover', () => {
    //             window.parent.postMessage({ type: "hover", tipo: 'hover_dormir' }, "*");
    //         })
    //     });

    //     enlaces.forEach(btn => {
    //         btn.addEventListener('click', () => {
    //             window.parent.postMessage({ type: "click", tipo: 'click_dormir' }, "*");
    //         })
    //     });
    // }

    if(document.querySelector('#monedasUsuario') || document.querySelector('.nombrePersonajeVer') || document.querySelector('.imagenAvatarBoton')){   
        try {

            if(!window.parent.objUsuario){
                const rsp = await postVerify({id_user: window.parent.identificador});
                if(!rsp.existe){
                    window.location.href = URL+'index.html';
                }else{
                    window.parent.objUsuario = JSON.stringify(rsp.data[0]);
                }
            }

            let datosUser = JSON.parse(window.parent.objUsuario);

            if(document.querySelector('#home') || document.querySelector('.vistaModulo')){

                window.parent.postMessage({ type: "cambiarMusica", tipo: 'general' }, "*"); 

                const {data} = await postDormirVerify({id_user: datosUser.id});

                function verificarRango(array) {
                    if (array.length === 0) {
                      return false; // No hay elementos en el array
                    }
                  
                    const ultimaFecha = new Date(array[0].date_created);
                    const ultimoId = array[0].id;
                  
                    for (let i = 1; i < array.length; i++) {
                      const fechaActual = new Date(array[i].date_created);
                      const idActual = array[i].id;
                  
                      if (fechaActual > ultimaFecha) {
                        ultimaFecha = fechaActual;
                        ultimoId = idActual;
                      }
                    }
                  
                    const ahora = new Date();
                    const ochoHorasEnMS = 8 * 60 * 60 * 1000; // 8 horas en milisegundos
                  
                    return ahora - ultimaFecha <= ochoHorasEnMS;
                }

                function obtenerUltimaFechaConDormirEnRango(array) {
                    if (array.length === 0) {
                      return null; // No hay elementos en el array
                    }
                  
                    let ultimaFecha = array[0];
                    for (let i = 1; i < array.length; i++) {
                      const fechaActual = new Date(array[i].date_created);
                      const fechaUltima = new Date(ultimaFecha.date_created);
                  
                      if (fechaActual > fechaUltima) {
                        ultimaFecha = array[i];
                      }
                    }
                  
                    const ahora = new Date();
                    const ochoHorasEnMS = 8 * 60 * 60 * 1000; // 8 horas en milisegundos
                  
                    return {
                      ultimaFecha,
                      dentroDelRango: ahora - new Date(ultimaFecha.date_created) <= ochoHorasEnMS
                    };
                  }

                const estaEnRango = verificarRango(data);
                const estadoDormir = obtenerUltimaFechaConDormirEnRango(data);

                if(estaEnRango && estadoDormir.ultimaFecha.dormir == 1 && estadoDormir.dentroDelRango){
                    window.location.href = URL+'inicio/home_dormir.html';
                }
            }

            const mensajeAvatar = [
                {mensaje_accion: "Yuhuuuu!!!"},
                {mensaje_accion: "¿Como va tu día?"},
                {mensaje_accion: "Es un bonito dia, vamos a divertirnos...!"},
                {mensaje_accion: "No olvides comer nutritivo y todas tu comidas."},
                {mensaje_accion: `Hola me llamo ${datosUser.avatar}; vamos a divertirnos.` },
                {mensaje_accion: `¡Hola soy ${datosUser.avatar}` }
            ]

            if(document.querySelector('.vistaModulo')){
                var {rsp} = await getMensajeModulo(window.parent.slug, {id_user: datosUser.id});
                const mensajer = document.querySelector('#mensajeCron');

                if(rsp[0]){
                    mensajer.classList.remove('hidden');
                    if(rsp[0].mensaje_accion.length > 20){
                        mensajer.querySelector('span').style.fontSize = '3vh';
                    }
                    mensajer.querySelector('span').textContent = rsp[0].mensaje_accion;
                    window.parent.mensajeopcion = rsp[0].productos_seleccionados;
                }else{
                    mensajer.classList.remove('hidden');
                    // Generar un índice aleatorio
                    const indiceAleatorio = Math.floor(Math.random() * mensajeAvatar.length);
                    // Obtener el mensaje aleatorio
                    const mensajeAleatorio = mensajeAvatar[indiceAleatorio];
                    if(mensajeAleatorio.mensaje_accion.length > 20){
                        mensajer.querySelector('span').style.fontSize = '3vh';
                    }
                    mensajer.querySelector('span').textContent = mensajeAleatorio.mensaje_accion;
                }
            }

            if(document.querySelector('.vistaMusica')){

                const vistaJuego = document.querySelector('.vistaMusica');
                var nombre = vistaJuego.getAttribute('data-nombre');

                window.parent.postMessage({ type: "cambiarMusica", tipo: nombre }, "*");

            }

            if(document.getElementById('mensajePrincipal')){

                const mensajer = document.querySelector('#mensajePrincipal');

                // Generar un índice aleatorio
                const indiceAleatorio = Math.floor(Math.random() * mensajeAvatar.length);
                // Obtener el mensaje aleatorio
                const mensajeAleatorio = mensajeAvatar[indiceAleatorio];
                if(mensajeAleatorio.mensaje_accion.length > 20){
                    mensajer.querySelector('span').style.fontSize = '3vh';
                }
                mensajer.querySelector('span').textContent = mensajeAleatorio.mensaje_accion;
            }

            if(document.querySelector('.imagenAvatarPrincipal')){
                const imagenAvatar = document.querySelector('.imagenAvatarPrincipal');
                let generoAvatar = '';

                if(datosUser.genero == 'Niño'){
                    generoAvatar = 'nino.png';
                }else{
                    generoAvatar = 'nino.png';
                }

                imagenAvatar.src = `${URL_ASSETS}avatares/${(datosUser.personaje).toLowerCase()}/imagenes/principal/${generoAvatar}`;
            }

            if(document.querySelector('.imagenAvatarEstados')){
                const imagenAvatar = document.querySelectorAll('.imagenAvatarEstados');

                imagenAvatar.forEach(element => {
                    element.src = `${URL_ASSETS}avatares/${(datosUser.personaje).toLowerCase()}/imagenes/estados/default.png`;
                });
            }

            if(document.querySelector('.avatarDormir')){
                const imgDormir = document.querySelector('.avatarDormir');
                const datosUser = JSON.parse(window.parent.objUsuario);
        
                imgDormir.src = `../../../assets/avatares/${(datosUser.personaje).toLowerCase()}/imagenes/dormir/dormir.png`;
                // imgDormir.src = `../../../assets/avatares/zen/imagenes/dormir/dormir.png`;
            }

            if(document.querySelector('.imagenAvatarNivel')){
                const imagenAvatar = document.querySelector('.imagenAvatarNivel');

                // consulta a la bd para verificar el nivel en el que se encuentra.

                imagenAvatar.src = `${URL_ASSETS}avatares/${(datosUser.personaje).toLowerCase()}/imagenes/niveles/nivel_1.png`;
            }

            if(document.querySelector('.imagenAvatarBoton')){
                const imagenAvatar = document.querySelectorAll('.imagenAvatarBoton');
                imagenAvatar.forEach(img => {
                    img.src = `${URL_ASSETS}avatares/${(datosUser.personaje).toLowerCase()}/imagenes/boton/default.png`;
                });
            }

            if(document.querySelector('.imagenAvatarAnuncio')){
                const imagenAvatar = document.querySelector('.imagenAvatarAnuncio');
                imagenAvatar.src = `${URL_ASSETS}avatares/${(datosUser.personaje).toLowerCase()}/imagenes/anuncios/default.png`;
            }

            if(document.querySelector('#monedasUsuario')){
                document.getElementById('monedasUsuario').textContent = datosUser.puntos;
            }
            if(document.querySelector('#nombreAvatar')){
                document.getElementById('nombreAvatar').textContent = datosUser.avatar;
            }
            if(document.querySelector('.nombrePersonajeVer')){
                const nombre = document.querySelectorAll('.nombrePersonajeVer');

                nombre.forEach(element => {
                    element.textContent = datosUser.avatar;
                });

            }
            if(document.querySelector('#nombreAvatar2')){
                document.getElementById('nombreAvatar2').textContent = datosUser.avatar;
            }
            if(document.querySelector('#nivelUsuario')){
                document.getElementById('nivelUsuario').textContent = datosUser.nivel == null || datosUser.nivel == 'null' ? 1 : datosUser.nivel;
            }
            if(document.querySelector('#estado_alimentacion')){

                estadosGrowin(datosUser.estado_alimentacion, document.querySelector('#estado_alimentacion'));
                estadosGrowin(datosUser.estado_salud, document.querySelector('#estado_salud'));
                estadosGrowin(datosUser.estado_descanso, document.querySelector('#estado_descanso'));
                estadosGrowin(datosUser.estado_game, document.querySelector('#estado_game'));

                function estadosGrowin(estado, rangeFilled){
                    var clipPathValue = "inset(0 0 " + estado +"% 0)";
                    rangeFilled.style.clipPath = clipPathValue;
                }
                
            }
            if(document.querySelector('#menuPrincipal')){
                var volumenAudio = localStorage.getItem('musicaAudio');
                var volumenSonido = localStorage.getItem('sonidoAudio');
                if(!volumenAudio){
                    updateRange(50, 'musicaAudio')
                }else{
                    updateRange(volumenAudio * 100, 'musicaAudio');
                }

                if(!volumenSonido){
                    updateRange(50, 'sonidoAudio')
                }else{
                    updateRange(volumenSonido * 100, 'sonidoAudio');
                }

                var vibracionButton = localStorage.getItem('vibracion');
                var elementoButton = document.querySelector('.veloOcultar');
                if(vibracionButton && vibracionButton == 1 ){
                    elementoButton.classList.remove("hidden");
                }else{
                    elementoButton.classList.add("hidden");
                    localStorage.setItem('vibracion', 0);
                }

                function updateRange(percentage, tipo) {

                    var rangeThumb = document.querySelector('#'+tipo).parentElement.parentElement.querySelector(".range-thumb");
                    var rangeFilled = document.querySelector('#'+tipo).parentElement.parentElement.querySelector(".range-filled");
                    var muteDivId = rangeThumb.getAttribute("data-mute");
                    var muteDiv = document.getElementById(muteDivId);

                    if (percentage < 0) {
                        percentage = 0;
                    } else if (percentage > 100) {
                        percentage = 100;
                    }
                
                    var clipPathValue = "inset(0 " + (100 - percentage) + "% 0 0)";
                    rangeThumb.style.left = (percentage - 12) + "%";
                    rangeFilled.style.clipPath = clipPathValue;
                
                    if (percentage === 0) {
                        muteDiv.classList.remove("hidden");
                    } else {
                        muteDiv.classList.add("hidden");
                    }
                
                    window.parent.postMessage({ type: "cambiarVolumen", volumen: percentage, tipo: muteDivId }, "*");
                }
            }
            
            if(document.getElementById("estadoPorcentaje")){
                    // Obtener elementos HTML por su ID
                    const personajeCarga = document.getElementById("personajeCarga");
                    const estadoCarga = document.getElementById("estadoCarga");
                    const estadoPorcentaje = document.getElementById("estadoPorcentaje");
                    const gradients = [
                        'linear-gradient(to bottom, #77CFE7, #009DC8, #005F8E, #015989)',
                        'linear-gradient(to bottom, #E7DC77, #C8B400, #8E8500, #895C01)',
                        'linear-gradient(to bottom, #E77777, #C80000, #8E0000, #890101)'
                    ];

                    const colorText = [
                        'texto-borde_estado_85',
                        'texto-borde_estado_50',
                        'texto-borde_estado_15'
                    ];
                    // Actualizar el texto del porcentaje
                    estadoPorcentaje.textContent = `Estado: ${datosUser.barra_estado}%`;
                    // Actualizar el tamaño de la barra de carga
                    personajeCarga.style.left = `${datosUser.barra_estado - 8}%`;
                    estadoCarga.style.clipPath  = `inset(0 ${100 - datosUser.barra_estado}% 0 0)`;
                    if(datosUser.barra_estado >= 75){
                        estadoPorcentaje.classList.add(colorText[0]);
                        estadoCarga.style.backgroundImage = gradients[0];
                    }else if(datosUser.barra_estado >= 50 && datosUser.barra_estado < 75){
                        estadoPorcentaje.classList.add(colorText[1]);
                        estadoCarga.style.backgroundImage = gradients[1];
                    }else{
                        estadoPorcentaje.classList.add(colorText[2]);
                        estadoCarga.style.backgroundImage = gradients[2];
                    }
            }

            if(document.getElementById('almacenTabs')){

                if(!window.almacen){
                    const {inventario} = await postAlmacen({id_usuario: datosUser.id});
                    console.log(inventario);
                    window.almacen = inventario;
                }

                function obtenerCantidadPorNombre(nombre) {
                    let cantidadTotal = 0;
                    var objAlmacen = window.almacen;
                
                    for (const categoria in objAlmacen) {
                        for (const idProducto in objAlmacen[categoria]) {
                            const producto = objAlmacen[categoria][idProducto];
                            if (producto.nombre_producto.toLowerCase() === nombre.toLowerCase()) {
                                cantidadTotal += producto.cantidad;
                            }
                        }
                    }
                
                    return cantidadTotal;
                }

                var productosAlmacen = document.querySelectorAll('.productoAlmacen ');

                productosAlmacen.forEach(producto => {
                    const cantidad = obtenerCantidadPorNombre(producto.dataset.nombre);
                    producto.querySelector('.cantidadProducto').textContent = cantidad;

                    if(cantidad > 0){
                        producto.classList.remove('item_inhabilitado');
                    }else{
                        producto.addEventListener('click', async() => {
                            try {
                                const rsp2 = await getTiendaProductos(window.parent.slugProduct);
                                window.parent.productosList = rsp2.productos;
                                window.location.href = `${URL}tienda/tiendaProductos.html`;
                            } catch (error) {
                                console.log(error);
                            }
                        })
                    }
                });
            }
            
        } catch (error) {
            console.log(error)
        } finally{
            if(document.getElementById('loader')){
                document.getElementById('loader').classList.add('hidden');
            }
        }
    }
};

export {
    homeInicio
};