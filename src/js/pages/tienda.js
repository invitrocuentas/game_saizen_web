import { getTiendaOpciones, getTiendaProductos, postComprarProductos } from "../../services/tienda.service";
import { postVerify } from "../../services/user.service";
import { URL } from "../../config/const/api.const";

const tiendaOpciones = async () => {
    if(document.querySelector("#modulos-tienda")){
        try {
            document.getElementById('loader').classList.remove('hidden')
            let box = document.querySelector("#modulos-tienda")
            const rsp = await getTiendaOpciones();
            rsp.tienda.forEach(modulo => {
                const {id, nombre, slug, imagen} = modulo
                const boxModule = document.createElement("button")
                boxModule.classList.add("flex", "flex-col", "justify-around", "items-center", "bg-white", "rounded-lg", "h-[35vh]", "w-[45vh]", "shadow-lg")
                boxModule.dataset.nombre = slug;
                var ancho = '';
                if(imagen == 'compraSalud' || imagen == 'compraDescanso'){
                    ancho = 'w-[18vh]';
                }else if(imagen == 'compraEntretemiento'){
                    ancho = 'w-[20vh]';
                }else{
                    ancho = 'w-[14vh]';
                }

                // Agregar un controlador de eventos onclick al botón
                boxModule.onclick = async function () {
                    try {
                        const rsp2 = await getTiendaProductos(slug);
                        window.parent.productosList = rsp2.productos;
                        window.parent.slugProduct = slug;
                        window.location.href = URL+'tienda/tiendaProductos.html';
                    } catch (error) {
                        throw error;
                    }
                };

                boxModule.innerHTML = `
                    <div class="h-[20vh] flex justify-center items-center">
                        <img class="hover:scale-110 duration-500 ease-in-out ${ancho}" src="../../assets/tienda/${imagen}.png" alt="">
                    </div>
                    <span class="text-[3.5vh] font-boldenvan text-[#009DC8]">${nombre}</span>            
                `
                box.appendChild(boxModule)
            });
        } catch (error) {
            console.log(error)
        } finally {
            document.getElementById('loader').classList.add('hidden');
        }
    }
};

const tiendaProductos = async () => {
    if(document.querySelector("#productosLista")){
        try {
            document.getElementById('fondoProductos').classList.add(`bg_${window.parent.slugProduct}`);
            document.getElementById('loader').classList.remove('hidden');

            if(!window.parent.productosList){
                window.location.href = URL+'tienda/tiendaOpciones.html';
            }else{
    
                var objProductos = window.parent.productosList;
    
                var ulElement = document.getElementById('productosList');
                document.getElementById('productoEntretenimiento').classList.add('hidden');
                document.getElementById('entretenimientoButton').classList.add('hidden');
                document.getElementById('productos').classList.remove('hidden');
    
                if(objProductos.length < 2){
                    document.getElementById('productoEntretenimiento').classList.remove('hidden');
                    document.getElementById('productos').classList.add('hidden');
                    document.getElementById('entretenimientoButton').classList.remove('hidden');
                    ulElement = document.getElementById('productosListEntretenimiento');
                }
    
                // Crea una función para generar un elemento li con el formato deseado
                function crearElementoLi(nombre, imagenSrc, puntos, index) {
                    const liElement = document.createElement('li');
                    liElement.classList.add('splide__slide');
                
                    const divElement = document.createElement('button');
                    divElement.classList.add(
                    'flex',
                    'flex-col',
                    'justify-between',
                    'items-center',
                    'shadow-lg',
                    'w-[30vh]',
                    'h-[90%]',
                    'bg-white',
                    'rounded-[2vh]',
                    'border-[#B35B3D]',
                    'border-[1vh]',
                    'relative'
                    );
                
                    const nombreElement = document.createElement('span');
                    nombreElement.classList.add('text-[3vh]', 'text-[#009DC8]', 'font-boldenvan', 'w-full', 'text-center', 'px-[3vh]');
                    nombreElement.textContent = nombre;
    
                    const subDivElement = document.createElement('div');
                    subDivElement.classList.add('w-full', 'h-[80%]', 'flex', 'justify-center', 'items-center');
                
                    const imgElement = document.createElement('img');
                    imgElement.classList.add('w-[70%]');
                    imgElement.src = '../../assets/tienda/productos/'+imagenSrc+'.png';
                    imgElement.alt = '';
    
                    subDivElement.appendChild(imgElement);
                
                    const buttonElement = document.createElement('button');
                    var urlFondo = 'boton_gratis';
                    if(puntos > 0){
                        urlFondo = "boton_obtener";
                    }
    
                    buttonElement.classList.add(urlFondo, 'bg-center', 'bg-contain', 'bg-no-repeat', 'absolute', '-bottom-[5vh]', 'h-[8vh]', 'w-[15vh]');
                
                    divElement.appendChild(nombreElement);
                    divElement.appendChild(subDivElement);
    
                    if(puntos > 0){
                        const divElementPrecio = document.createElement('div');
                        divElementPrecio.classList.add(
                          'flex',
                          'justify-center',
                          'items-center',
                          'bg-[url("../assets/tienda/productos/fondoStar.png")]',
                          'bg-center',
                          'bg-contain',
                          'bg-no-repeat',
                          'absolute',
                          '-bottom-[2vh]',
                          '-right-[3.5vh]',
                          'h-[10vh]',
                          'w-[10vh]'
                        );
                        
                        // Crear el elemento img dentro del div
                        const imgElement = document.createElement('img');
                        imgElement.classList.add('h-[4vh]');
                        imgElement.src = '../../assets/tienda/productos/star.png';
                        imgElement.alt = '';
                        
                        // Crear el elemento span dentro del div
                        const spanElement = document.createElement('span');
                        spanElement.classList.add('text-[3vh]', 'font-boldenvan', 'text-[#B35B3D]');
                        spanElement.textContent = 'x'+puntos;
                        
                        // Agregar el imgElement y spanElement dentro del divElementPrecio
                        divElementPrecio.appendChild(imgElement);
                        divElementPrecio.appendChild(spanElement);
                        
                        divElement.appendChild(divElementPrecio);
                    }
    
                    divElement.appendChild(buttonElement);

                    // Agregar un controlador de eventos onclick al botón
                    divElement.onclick = async function () {
                        window.parent.producto = index;
                        window.location.href = URL+'producto/producto.html';
                    };
                    
                    liElement.appendChild(divElement);
                
                    return liElement;
                }
    
                objProductos.forEach((datos, index) => {
                    const liElement = crearElementoLi(datos.nombre_producto, datos.imagen, datos.puntos_requeridos, index);
                    ulElement.appendChild(liElement);
                });
            }
        } catch (error) {
            console.log(error)
        } finally {
            document.getElementById('loader').classList.add('hidden');
        }
    }
}

const productosVer = async () => {
    if(document.querySelector('#productosVer')){

        try {
            document.getElementById('fondoProductos').classList.add(`bg_${window.parent.slugProduct}`);
            document.getElementById('loader').classList.remove('hidden');

            if((!window.parent.producto && window.parent.producto != 0) || !window.parent.productosList){
                window.location.href = URL+'tienda/tiendaOpciones.html';
            }else{
                var objProductos = window.parent.productosList;

                var ulElement = document.getElementById('productosList');
                document.getElementById('productoEntretenimiento').classList.add('hidden');
                document.getElementById('productosVer').classList.remove('hidden');
    
                if(objProductos.length < 2){
                    document.getElementById('productoEntretenimiento').classList.remove('hidden');
                    document.getElementById('productosVer').classList.add('hidden');
                    ulElement = document.getElementById('productosListEntretenimiento');
                }

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
            }
        } catch (error) {
            console.log(error);
        } finally{
            document.getElementById('loader').classList.add('hidden');
        }
    }
}

const comprarProducto = () => {
    if(document.querySelector('#comprarProducto')){

        var botonesComprar = document.querySelectorAll('#comprarProducto');
        const datosUser = JSON.parse(window.parent.objUsuario);
        botonesComprar.forEach(button => {
            button.addEventListener('click', async () => {

                const productoId = button.getAttribute('data-id');
                const productoName = button.getAttribute('data-nombre');

                try {

                    const rsp = await postComprarProductos({id_usuario: datosUser.id, id_producto: productoId});
                    if(rsp.ok){
                        try {

                            const data = await postVerify({id_user: window.parent.identificador});
                            window.parent.objUsuario = JSON.stringify(data.data[0]);

                            const datosUser = JSON.parse(window.parent.objUsuario);

                            document.getElementById('monedasUsuario').textContent = datosUser.puntos;
                            document.getElementById('nivelUsuario').textContent = datosUser.nivel == null || datosUser.nivel == 'null' ? 1 : datosUser.nivel;

                            document.querySelector('#nombre_producto_ver').textContent = productoName.toUpperCase();
                            document.querySelector('#descripcion_producto_ver').textContent = `Ahora cuentas con ${productoName.toUpperCase()} en tu almacén. Dirígete a la zona correspondiente para utilizarlo.`;
                            document.querySelector('#confirmarCompra').classList.remove('hidden');
                        } catch (err) {
                            throw err
                        }
                    }

                } catch (error) {
                    
                    console.log(error);
                    document.querySelector('#nombre_producto_ver').textContent = 'UPS!!!';
                    document.querySelector('#descripcion_producto_ver').textContent = error.message;
                    document.querySelector('#confirmarCompra').classList.remove('hidden');

                } finally {

                    setTimeout(() => {
                        document.querySelector('#confirmarCompra').classList.add('hidden');
                    }, 2000);
                    
                }
            });
        });
    }
}

export {
    tiendaOpciones,
    tiendaProductos,
    productosVer,
    comprarProducto
};