const marcharAtras = () => {
    if(document.querySelector('#btnAtras')){
        var backButton = document.getElementById("btnAtras");

        backButton.addEventListener("click", function() {
            window.history.back();
        });
    }
};

export {
    marcharAtras
};