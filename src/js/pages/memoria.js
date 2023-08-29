const flip = () => {

    // Datos de las imágenes (cada imagen se duplica)
    const grupoImagenes = [
        "../../../assets/vistas/juegos/mandoCard.png",
        "../../../assets/vistas/juegos/mundoCard.png",
        "../../../assets/vistas/juegos/librosCard.png",
        "../../../assets/vistas/juegos/coronaCard.png",
        "../../../assets/vistas/juegos/uvasCard.png",
        "../../../assets/vistas/juegos/rayoCard.png",
        "../../../assets/vistas/juegos/corazonCard.png"
    ];

    // Función para obtener un número entero aleatorio en un rango
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Función para seleccionar 4 imágenes aleatorias
    function seleccionarGrupoImagenes(arr, cantidad) {
        const grupoImagenes = [];
        const copiaImagenes = [...arr]; // Copiamos el array original para no modificarlo

        for (let i = 0; i < cantidad; i++) {
            // Escoge un índice aleatorio y obtén la imagen correspondiente
            const indiceAleatorio = getRandomInt(0, copiaImagenes.length - 1);
            const imagenSeleccionada = copiaImagenes.splice(indiceAleatorio, 1)[0];

            grupoImagenes.push(imagenSeleccionada);
        }

        return grupoImagenes;
    }

    let cantidadImagenes = 4;
    let tiempoEstablecido = 180;
    let puntosPorNivel = 15;

    // Obtener 4 imágenes aleatorias
    const imagenes = seleccionarGrupoImagenes(grupoImagenes, cantidadImagenes);

    // Duplicar el array de imágenes (cada imagen se repite 2 veces)
    const imagenesDuplicadas = imagenes.concat(imagenes);

    // Función para barajar un array
    function barajarArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    // Barajar el array de imágenes duplicadas para obtener un orden aleatorio
    barajarArray(imagenesDuplicadas);

    if (document.getElementById('memory-card')) {

        // VARIABLES GLOBALES
        const modal = document.getElementById('recargaRedirigir');
        const gameOver = document.getElementById('gameOver');
        const confirmBtn = document.getElementById('confirmBtn');
        const cancelBtn = document.getElementById('cancelBtn');
        const progressBar = document.getElementById('progress');

        let flippedCards = [];
        let accion = null;
        let enlaceReanudar = '';
        let tiempoRestante = tiempoEstablecido; // 3 minutos en segundos
        let intentos = 0;
        let aciertos = 0;
        let fallos = 0;
        let modalShown = false;
        let interval;
        let redireccionar = false;

        // function evaluarPuntos(){
        //     let tiempo2 = tiempoEstablecido % 3;
        //     let tiempo3 = tiempo2 * 2;
            
        //     // UNA ESTRELLA
        //     if(tiempoRestante < tiempo2 && intentos > cantidad * 3){

        //     // UNA ESTRELLA
        //     }else if(tiempoRestante < tiempo2 && intentos > cantidad * 2){

        //     // UNA ESTRELLA
        //     }else{

        //     }
        // }

        function actualizarTemporizador() {
            const minutos = Math.floor(tiempoRestante / 60);
            const segundos = tiempoRestante % 60;
            const timerElement = document.getElementById('timer');
            // Formatear minutos y segundos como "mm:ss"
            const tiempoFormateado = `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
        
            timerElement.textContent = tiempoFormateado;
        
            // Actualizar la longitud de la barra de progreso
            const progreso = (tiempoRestante / tiempoEstablecido) * 100; // Calcular el porcentaje de tiempo restante
            progressBar.style.width = progreso + '%';
        
            if (tiempoRestante <= 0) {
                // Aquí puedes realizar acciones cuando se agote el tiempo
                detenerTemporizador(); // Detener el temporizador

                const siguienteNivel = document.getElementById('btnSiguiente');
                const intentarNuevamente = document.getElementById('btnIntentar');
                siguienteNivel.classList.add('hidden');
                intentarNuevamente.classList.remove('hidden');

                gameOver.classList.remove('hidden');
            }
            tiempoRestante--;
        }

        // Función para iniciar el temporizador
        function iniciarTemporizador() {
            if (!modalShown) {
                interval = setInterval(actualizarTemporizador, 1000);// Reinicia el temporizador al cerrar el modal si no se ha confirmado
            }
        }

        // Función para detener el temporizador
        function detenerTemporizador() {
            clearInterval(interval); // Detiene el temporizador
            interval = null;
        }

        // Función para mostrar el modal
        function mostrarModal() {
            modal.classList.remove('hidden');
            detenerTemporizador(); // Detiene el temporizador al abrir el modal
            modalShown = true;
        }

        // Función para ocultar el modal
        function ocultarModal() {
            modal.classList.add('hidden');
            iniciarTemporizador();
        }

        // Función para confirmar la acción en el modal
        function confirmarAccion() {
            switch (accion) {
                case 1:
                    window.location.href = enlaceReanudar;
                    break;
            
                default:
                    window.location.reload();
                    break;
            }
            // Realiza la acción confirmada
            ocultarModal();
        }

        // Función para cancelar la acción en el modal
        function cancelarAccion() {
            modalShown = false;
            // Cancela la acción
            ocultarModal();
        }

        function alMenosUnModalActivo() {
            const modales = document.querySelectorAll('.modalVerificar');
            for (const modal of modales) {
                if (!modal.classList.contains('hidden')) {
                    return true; // Al menos un modal está activo (visible)
                }
            }
            return false; // Ningún modal está activo
        }

        const abrirMenu = document.getElementById('abrirMenu');
        abrirMenu.addEventListener('click', () => {
            detenerTemporizador(); // Detiene el temporizador al abrir el modal
            modalShown = true;
        });

        // Obtener todos los elementos con la clase 'close'
        const elementosClose = document.querySelectorAll('.close');
        // Agregar un manejador de clic a cada elemento 'close'
        elementosClose.forEach((elemento) => {
            elemento.addEventListener('click', function () {
                // Reanudar el temporizador al hacer clic en 'close'
                // iniciarTemporizador();
                setTimeout(() => {
                    if(!alMenosUnModalActivo()){
                        modalShown = false;
                        iniciarTemporizador();
                    }
                }, 300);
            });
        });

        confirmBtn.addEventListener('click', confirmarAccion);
        cancelBtn.addEventListener('click', cancelarAccion);

        // Ejemplo de excepción para evitar la recarga de página
        document.addEventListener('keydown', function (e) {
            if (e.key === 'F5' || (e.ctrlKey && (e.key === 'r' || e.key === 'R'))) {
                e.preventDefault();
                accion = 2; // 2 es recarga de pagina
                mostrarModal(); // Muestra el modal para confirmar antes de recargar la página
            }
        });

        // Ejemplo de excepción para evitar la navegación no confirmada
        const links = document.querySelectorAll('a');
        links.forEach((link) => {
            link.addEventListener('click', function (e) {
                if(!redireccionar){
                    e.preventDefault();
                    enlaceReanudar = link.getAttribute('href');
                    accion = 1; // 1 es redireccionar
                    mostrarModal(); // Muestra el modal para confirmar antes de navegar a través del enlace
                }
                
            });
        });

        //CREACION DE TARJETAS
        const container = document.getElementById('memory-card');

        // Función para crear un contenedor de tarjeta con una imagen
        function crearTarjeta(imagenSrc, cardIndex) {
            const cardContainer = document.createElement('div');
            cardContainer.classList.add('memory-card');
            const cardInner = document.createElement('div');
            cardInner.classList.add('card-inner', 'rotate-y-180');
            const cardFront = document.createElement('div');
            cardFront.classList.add('card-front');
            const cardBack = document.createElement('div');
            cardBack.classList.add('card-back');
            const imgFront = document.createElement('img');
            imgFront.src = imagenSrc;
            imgFront.alt = 'Imagen ' + cardIndex;
            const imgBack = document.createElement('img');
            imgBack.src = "../../../assets/vistas/juegos/atrasCard.png"; // Imagen trasera común
            imgBack.alt = 'Imagen Trasera Común';
            cardFront.appendChild(imgFront);
            cardBack.appendChild(imgBack);
            cardInner.appendChild(cardFront);
            cardInner.appendChild(cardBack);
            cardContainer.appendChild(cardInner);
            container.style.gridTemplateColumns = `repeat(${cantidadImagenes}, 1fr)`;
            container.appendChild(cardContainer);
        }
        // Cargar las imágenes y crear contenedores de tarjetas en el orden aleatorio
        for (let i = 0; i < imagenesDuplicadas.length; i++) {
            crearTarjeta(imagenesDuplicadas[i], i + 1);
        }

        const cards = document.querySelectorAll('.memory-card');
        
        // Función para manejar el clic en una tarjeta volteada
        function handleFlippedCard() {
            if (flippedCards.length === 2) {
                // Incrementar el contador de intentos
                intentos++;
                document.getElementById('intentos').textContent = intentos;
    
                // Se han volteado dos tarjetas, verifiquemos si son iguales
                const [card1, card2] = flippedCards;
                const imgSrc1 = card1.querySelector('.card-front img').src;
                const imgSrc2 = card2.querySelector('.card-front img').src;
    
                if (imgSrc1 === imgSrc2) {
                    // Las tarjetas son iguales, puedes realizar acciones adicionales aquí
                    console.log('¡Tarjetas iguales!');
                    aciertos++;
                    document.getElementById('aciertos').textContent = aciertos;
                    // Por ejemplo, puedes deshabilitar las tarjetas para que no se puedan hacer más clics en ellas.
                    card1.removeEventListener('click', flipCard);
                    card2.removeEventListener('click', flipCard);
                    // Incrementar aciertos y agregar tiempo
                    tiempoRestante += 2; // Aumentar el tiempo en 2 segundos
                } else {
                    // Las tarjetas no son iguales, volvámoslas a voltear después de un breve retraso
                    setTimeout(() => {
                        card1.querySelector('.card-inner').classList.toggle('rotate-y-180');
                        card2.querySelector('.card-inner').classList.toggle('rotate-y-180');
                        // Incrementar fallos y restar tiempo
                        fallos++;
                        document.getElementById('fallos').textContent = fallos;
                        tiempoRestante -= 1; // Restar 1 segundo
                        document.getElementById('fallos').textContent = fallos;
                    }, 1000); // Retraso de 1 segundo para mostrar las tarjetas no coincidentes
                }

                // Limpiamos el array de tarjetas volteadas
                flippedCards = [];

                verificarEmparejamiento();
            }
        }

        function flipCard() {
            if(!this.querySelector('.card-inner').classList.contains('rotate-y-180')){
                this.querySelector('.card-inner').classList.toggle('rotate-y-180');
                flippedCards.push(this);
                handleFlippedCard();
            }
        }

        cards.forEach(card => card.addEventListener('click', flipCard));

        // Función para verificar si todos los cards se han emparejado
        function verificarEmparejamiento() {
            if (aciertos === (cards.length / 2)) {
                // Todos los pares se han emparejado
                detenerTemporizador(); // Detener el temporizador
                redireccionar = true;
                const siguienteNivel = document.getElementById('btnSiguiente');
                const intentarNuevamente = document.getElementById('btnIntentar');
                siguienteNivel.classList.remove('hidden');
                intentarNuevamente.classList.add('hidden');

                gameOver.classList.remove('hidden');
            }
        }

        // Esta función muestra las cartas inicialmente y luego las volteará
        async function mostrarYVoltearCartas() {
            const cartas = document.querySelectorAll('.memory-card');
            cartas.forEach((carta, index) => {
                setTimeout(() => {
                    carta.querySelector('.card-inner').classList.remove('rotate-y-180');
                }, 1000); // Mostrar cada tarjeta con un retraso de 1 segundo
            });

            await iniciarTemporizador();

        }
        // Llama a mostrarYVoltearCartas después de 3 segundos (3000 milisegundos)
        setTimeout(mostrarYVoltearCartas, 3000);
    }
    
};

export {
    flip
};