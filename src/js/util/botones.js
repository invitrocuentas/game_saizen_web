const marcharAtras = () => {
    if(document.querySelector('#btnAtras')){
        var backButton = document.getElementById("btnAtras");

        backButton.addEventListener("click", function() {
            window.history.back();
        });
    }
};

const modalesAcciones = () => {
    if(document.querySelector('.open-modal-button')){
        const openModalButtons = document.querySelectorAll('.open-modal-button');
        const closeButtons = document.querySelectorAll('.close');
        const modals = document.querySelectorAll('.modal');

        openModalButtons.forEach(button => {
            button.addEventListener('click', () => {
                const modalId = button.getAttribute('data-modal');
                const modal = document.getElementById(modalId);
                modal.classList.remove('hidden');
            });
        });

        closeButtons.forEach(button => {
            button.addEventListener('click', () => {
                const modalId = button.getAttribute('data-modalclose');
                const modal = document.getElementById(modalId);
                modal.classList.add('hidden');
            });
        });

        window.addEventListener('click', (event) => {
            modals.forEach(modal => {
                if (event.target === modal) {
                modal.classList.add('hidden');
                }
            });
        });
    }
};

const vibracionBtn = () => {
    if(document.querySelector('#btnVibrar')){
        var btnvibrar = document.querySelector('#btnVibrar');
        var elemento = document.querySelector('.veloOcultar');
        var isActive = false;

        btnvibrar.addEventListener('click', () => {
            isActive = !isActive; // Cambiar el estado activo/desactivo

            if (isActive) {
                elemento.classList.remove("hidden");
            } else {
                elemento.classList.add("hidden");
            }
        });
    }
}

const cambiarContenido = () => {
    if(document.getElementById('nextBtnSobre')){
        const items = document.querySelectorAll('.itemSobre');
        const prevBtn = document.getElementById('prevBtnSobre');
        const nextBtn = document.getElementById('nextBtnSobre');
        let currentIndex = 0;

        function showItem(index) {
            items.forEach(item => {
                item.classList.add('hidden');
                item.classList.remove('opacity-100');
            });

            items[index].classList.remove('hidden');
            items[index].classList.add('opacity-100');

            if (index === items.length - 1) {
                nextBtn.classList.add('hidden');
                prevBtn.classList.remove('hidden');
            }else if (index === 0){
                nextBtn.classList.remove('hidden');
                prevBtn.classList.add('hidden');
            }else{
                nextBtn.classList.remove('hidden');
                prevBtn.classList.remove('hidden');
            }

        }
        document.getElementById('nextBtnSobre').addEventListener('click', () => {
            currentIndex = Math.min(currentIndex + 1, items.length - 1);
            console.log(currentIndex);
            showItem(currentIndex);
            
        });
    
        document.getElementById('prevBtnSobre').addEventListener('click', () => {
            currentIndex = Math.max(currentIndex - 1, 0);
            showItem(currentIndex);
        });
    
        showItem(currentIndex);
    }
}

export {
    marcharAtras,
    modalesAcciones,
    vibracionBtn,
    cambiarContenido
};