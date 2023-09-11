import { getTiendaOpciones, getTiendaProductos } from "../../services/tienda.service";
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
                    const rsp2 = await getTiendaProductos(slug);
                    window.parent.productosList = rsp2.productos;
                    window.parent.slugProduct = slug;
                    window.location.href = URL+'tienda/tiendaProductos.html';
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
                document.getElementById('productos').classList.remove('hidden');
    
                if(objProductos.length < 2){
                    document.getElementById('productoEntretenimiento').classList.remove('hidden');
                    document.getElementById('productos').classList.add('hidden');
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
        if(!window.parent.producto){
            window.location.href = URL+'tienda/tiendaOpciones.html';
        }else{
            var objProductos = window.parent.productosList;
            var ulElement = document.getElementById('productosList');

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
    }
}

export {
    tiendaOpciones,
    tiendaProductos,
    productosVer
};