const flip = () => {
    // Datos de las imágenes (cada imagen se duplica)
    const imagenes = [
        "../../../assets/vistas/juegos/mandoCard.png",
        "../../../assets/vistas/juegos/mundocard.png",
        "../../../assets/vistas/juegos/libroscard.png",
        "../../../assets/vistas/juegos/coronaCard.png",
        "../../../assets/vistas/juegos/uvasCard.png",
        "../../../assets/vistas/juegos/rayoCard.png",
        "../../../assets/vistas/juegos/corazonCard.png"
    ];

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
            container.appendChild(cardContainer);
        }
        // Cargar las imágenes y crear contenedores de tarjetas en el orden aleatorio
        for (let i = 0; i < imagenesDuplicadas.length; i++) {
            crearTarjeta(imagenesDuplicadas[i], i + 1);
        }

        // ACCIONES PARA LAS TARJETAS
        const cards = document.querySelectorAll('.memory-card');
        const progressBar = document.getElementById('progress');
        let flippedCards = [];
        let tiempoRestante = 180; // 3 minutos en segundos
        let intentos = 0;
        let aciertos = 0;
        let fallos = 0;
        let interval;

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

        // Función para configurar y actualizar el temporizador
        function configurarTemporizador() {

            const timerElement = document.getElementById('timer');

            function actualizarTemporizador() {
                const minutos = Math.floor(tiempoRestante / 60);
                const segundos = tiempoRestante % 60;
            
                // Formatear minutos y segundos como "mm:ss"
                const tiempoFormateado = `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
            
                timerElement.textContent = tiempoFormateado;
            
                // Actualizar la longitud de la barra de progreso
                const progreso = (tiempoRestante / 180) * 100; // Calcular el porcentaje de tiempo restante
                progressBar.style.width = progreso + '%';
            
                if (tiempoRestante <= 0) {
                  clearInterval(interval); // Detener el temporizador
                  // Aquí puedes realizar acciones cuando se agote el tiempo
                  alert('¡Se agotó el tiempo!');
                  reiniciarJuego();
                }
                tiempoRestante--;
              }
            
              // Llama a actualizarTemporizador cada segundo y almacena el intervalo
              interval = setInterval(actualizarTemporizador, 1000);
        }
        
        // Función para verificar si todos los cards se han emparejado
        function verificarEmparejamiento() {
            if (aciertos === (cards.length / 2)) {
                // Todos los pares se han emparejado
                clearInterval(interval); // Detener el temporizador
                alert('¡Has ganado!'); // Puedes mostrar un mensaje de victoria
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
        // Esta función muestra las cartas inicialmente y luego las volteará
        async function mostrarYVoltearCartas() {
            const cartas = document.querySelectorAll('.memory-card');
            cartas.forEach((carta, index) => {
                setTimeout(() => {
                    carta.querySelector('.card-inner').classList.remove('rotate-y-180');
                }, 1000); // Mostrar cada tarjeta con un retraso de 1 segundo
            });

            await configurarTemporizador();

        }
        // Llama a mostrarYVoltearCartas después de 3 segundos (3000 milisegundos)
        setTimeout(mostrarYVoltearCartas, 3000);
    }
    
};

export {
    flip
};