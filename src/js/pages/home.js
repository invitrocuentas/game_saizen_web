const homeInicio = () => {
    if(document.querySelector('#home')){
        const valorAlmacenado = localStorage.getItem('estado');
        if(!valorAlmacenado || valorAlmacenado != 3){
            window.location.href = '../index.html';
        }
    }
};

export {
    homeInicio
};