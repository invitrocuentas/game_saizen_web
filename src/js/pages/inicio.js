import { postInicio, postVerify } from "../../services/user.service";
import { URL } from "../../config/const/api.const";

const politicas_privacidad = async () => {
    
    if(document.querySelector('#politicas_privacidad')){
        try {
            const politicas_privacidad = document.getElementById('politicas_privacidad');
            const botonPoliticas = document.getElementById('botonPoliticas');

            if(window.parent.identificador){

                const rsp = await postVerify({id_user: window.parent.identificador});

                if(rsp.existe){
                    window.parent.objUsuario = rsp.datos;
                    window.location.href = URL+'inicio/home.html';
                }
            }

            politicas_privacidad.classList.remove('hidden');
            

            botonPoliticas.addEventListener('click', function(){
                politicas_privacidad.classList.add('hidden');
            })
        } catch (error) {
            console.log(error)
        } finally{
            document.querySelector('#loader').classList.add('hidden');
        }
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
                window.selectedPersonaje = personaje;

                currentIndex = Math.min(currentIndex + 1, items.length - 1);
                showItem(currentIndex);
            });
        });

        const genderButtons = document.querySelectorAll('.genderSelect');

        genderButtons.forEach(button => {
            button.addEventListener('click', () => {
                const genero = button.getAttribute('data-genero');
                window.selectedGenero = genero;

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

        nexthome.addEventListener('click', async () => {
            try {

                window.objUsuario = {
                    id_user: window.parent.identificador,
                    personaje: selectedPersonaje,
                    genero: selectedGenero,
                    avatar: inputField.value
                }
                
                const rsp = await postInicio(window.objUsuario);

                if(rsp.data){
                    window.location.href = URL+'inicio/home.html';
                }
            } catch (error) {
                console.log(error);
            }
        })
    }
}

const cambioEstado = () => {
    if(document.querySelector('.box')){
        const box = document.querySelector('.box');
        let currentIndex = 0;

        const clipPaths = [
        'inset(0 0% 0 0)',
        'inset(0 15% 0 0)',
        'inset(0 51% 0 0)',
        'inset(0 85% 0 0)'
        ];

        const gradients = [
        'linear-gradient(to bottom, #77CFE7, #009DC8, #005F8E, #015989)',
        'linear-gradient(to bottom, #77CFE7, #009DC8, #005F8E, #015989)',
        'linear-gradient(to bottom, #E7DC77, #C8B400, #8E8500, #895C01)',
        'linear-gradient(to bottom, #E77777, #C80000, #8E0000, #890101)'
        ];

        const colorText = [
            'texto-borde_estado_85',
            'texto-borde_estado_85',
            'texto-borde_estado_50',
            'texto-borde_estado_15'
            ];

        const leftValues = ['92%', '77%', '41%', '7%'];

        const valores = ['100%', '85%', '51%', '15%'];

        box.addEventListener('click', () => {

            currentIndex = (currentIndex + 1) % clipPaths.length;

            if(currentIndex == 0){
                box.parentElement.querySelector('.open-modal-button').classList.remove('hidden');
                box.classList.add(colorText[currentIndex]);
                box.classList.remove(colorText[(colorText.length - 1)]);
            }else{
                box.parentElement.querySelector('.open-modal-button').classList.add('hidden');
                if(colorText[currentIndex] != colorText[(currentIndex - 1)]){
                    box.classList.add(colorText[currentIndex]);
                    box.classList.remove(colorText[(currentIndex - 1)]);
                }
            }

            const newClipPath = clipPaths[currentIndex];
            const newGradient = gradients[currentIndex];
            const newLeftValue = leftValues[currentIndex];

            box.textContent = `Estado: ${valores[currentIndex]}`;
            
            const innerDiv = box.parentElement.querySelector('.fondoEstado');
            const img = box.parentElement.querySelector('img');
            
            innerDiv.style.clipPath = newClipPath;
            box.parentElement.querySelector('.fondoEstado').style.backgroundImage = newGradient;
            img.style.left = newLeftValue;
        });
    }
}

export {    
    politicas_privacidad,
    cambioPanel,
    cambioEstado
};
