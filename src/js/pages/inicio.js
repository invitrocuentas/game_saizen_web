const politicas_privacidad = () => {
    if(document.querySelector('#politicas_privacidad')){

        const politicas_privacidad = document.getElementById('politicas_privacidad');
        const botonPoliticas = document.getElementById('botonPoliticas');
        const valorAlmacenado = localStorage.getItem('estado');

        if(valorAlmacenado && valorAlmacenado == 1){
            politicas_privacidad.classList.remove('hidden');
        }else{
            window.location.href = 'home.html';
        }

        botonPoliticas.addEventListener('click', function(){
            politicas_privacidad.classList.add('hidden');
        })
        
    }

};

export {    
    politicas_privacidad
};
