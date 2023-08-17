let selectedPersonaje = '';
let selectedGenero = '';

const politicas_privacidad = () => {
    
    if(document.querySelector('#politicas_privacidad')){

        const politicas_privacidad = document.getElementById('politicas_privacidad');
        const botonPoliticas = document.getElementById('botonPoliticas');
        const valorAlmacenado = localStorage.getItem('estado');
        const ninoAlmacenado = localStorage.getItem('selectedGenero');
        const personajeAlmacenado = localStorage.getItem('selectedPersonaje');
        const nombreAlmacenado = localStorage.getItem('NombrePersonaje');

        if(valorAlmacenado){
            if(valorAlmacenado == 3){
                window.location.href = 'inicio/home.html';
            }else if(!ninoAlmacenado || !personajeAlmacenado || !nombreAlmacenado){
                politicas_privacidad.classList.add('hidden');
            }else{
                window.location.href = 'inicio/home.html';
            }
        }else{
            politicas_privacidad.classList.remove('hidden');
        }
        

        botonPoliticas.addEventListener('click', function(){
            politicas_privacidad.classList.add('hidden');
            localStorage.setItem('estado', 2)
        })
    }

};

const cambioPanel = () => {
    if(document.querySelector('.item')){
        const items = document.querySelectorAll('.item');
        const pers = document.getElementById('personajesFront');
        const loui = document.getElementById('Loui');
        const zen = document.getElementById('Zen');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const nexthome = document.getElementById('nexthome');
        let currentIndex = 0;

        function showItem(index) {

            items.forEach(item => {
                item.classList.add('hidden');
                item.classList.remove('opacity-100');
            });

            items[index].classList.remove('hidden');
            items[index].classList.add('opacity-100');

            zen.classList.add('hidden');
            loui.classList.add('hidden');

            if (index === 0) {
                nextBtn.classList.remove('hidden');
                pers.classList.remove('hidden');
                prevBtn.classList.add('hidden');
            }else if(index >= 6){
                pers.classList.add('hidden');
                nextBtn.classList.add('hidden');

                if(index == 8){
                    if(selectedPersonaje == 'Zen'){
                        zen.classList.remove('hidden');
                        loui.classList.add('hidden');
                    }else{
                        loui.classList.remove('hidden');
                        zen.classList.add('hidden');
                    }
                }

            } 
            else {
                nextBtn.classList.remove('hidden');
                pers.classList.remove('hidden');
                prevBtn.classList.remove('hidden');
            }

            if (index === items.length - 1) {
                nextBtn.classList.add('hidden');
            }
        }

        document.getElementById('nextBtn').addEventListener('click', () => {
            currentIndex = Math.min(currentIndex + 1, items.length - 1);

            console.log(currentIndex);
            showItem(currentIndex);
            
        });

        document.getElementById('prevBtn').addEventListener('click', () => {
            currentIndex = Math.max(currentIndex - 1, 0);
            showItem(currentIndex);
        });

        showItem(currentIndex);

        const avatarButtons = document.querySelectorAll('.avatarSelect');

        avatarButtons.forEach(button => {
            button.addEventListener('click', () => {
                const personaje = button.getAttribute('data-personaje');
                selectedPersonaje = personaje;
                localStorage.setItem('selectedPersonaje', personaje);

                currentIndex = Math.min(currentIndex + 1, items.length - 1);
                showItem(currentIndex);
            });
        });

        const genderButtons = document.querySelectorAll('.genderSelect');

        genderButtons.forEach(button => {
            button.addEventListener('click', () => {
                const genero = button.getAttribute('data-genero');
                selectedGenero = genero;
                localStorage.setItem('selectedGenero', genero);

                currentIndex = Math.min(currentIndex + 1, items.length - 1);
                showItem(currentIndex);
            });
        });

        const inputField = document.getElementById('nombreAvatar');
        const cursor = document.getElementById('cursor');

        inputField.addEventListener('input', () => {
            if (inputField.value.trim() === '') {
                cursor.style.display = 'block';
                nexthome.classList.add('hidden');
            } else {
                cursor.style.display = 'none';
                nexthome.classList.remove('hidden');
            }
        });

        nexthome.addEventListener('click', () => {
            localStorage.setItem('NombrePersonaje', inputField.value);
            localStorage.setItem('estado', 3);
            // ================
            // AQUI VA LA API
            // se estan guardando los datos en localstorage solo para registro
            // NombrePersonaje, selectedGenero, selectedPersonaje
            // ================
            window.location.href = 'inicio/home.html';
        })
    }
}

export {    
    politicas_privacidad,
    cambioPanel
};
