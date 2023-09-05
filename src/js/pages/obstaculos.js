const obstaculosGame = () => {

    if (document.querySelector('#gameCanvas')) {

        var time = new Date();
        var deltaTime = 0;

        if(document.readyState == "complete" || document.readyState == "interactive"){
            setTimeout(Init, 1);
        }else{
            document.addEventListener("DOMContentLoaded", Init);
        }

        function Init() {
            time = new Date();
            Start();
            Loop();
        }

        function Loop(){
            deltaTime = (new Date() - time) / 100;
            time = new Date();
            Update();
            requestAnimationFrame(Loop);
        }

        var sueloY = 7;
        var velY = 0;
        var impulso = 25;
        var gravedad = 15;

        var zenPosX = 42;
        var zenPosY = sueloY;

        var sueloX = 0;
        var velEscenario = 20;
        var gameVel = 1;
        var score = 0;

        var parado = false;
        var saltando = false;

        var contenedor;
        var zen ;
        var textoScore;
        var suelo;
        var gameOver;

        function Start() {
            gameOver = document.querySelector('.game-over');
            suelo = document.querySelector('.suelo');
            contenedor = document.querySelector('#gameCanvas');
            textoScore = document.querySelector('.score');
            zen = document.querySelector('.zeni');
            document.addEventListener('keydown', HandleKeyDown);
        }

        function HandleKeyDown(ev){
            if(ev.keyCode == 32){
                Saltar();
            }
        }
        
        function Saltar(){
            if(zenPosY === sueloY){
                saltando = true;
                velY = impulso;
                zen.classList.remove('zeni-corriendo');
            }
        }

        function Update(){
            MoverSuelo();
            MoverZen();

            velY -= gravedad * deltaTime;
        }

        function MoverSuelo(){
            sueloX += CalcularDesplazamiento();
            suelo.style.left = -(sueloX % contenedor.clientWidth) + `px`;
        }

        function CalcularDesplazamiento(){
            return velEscenario * deltaTime * gameVel;
        }

        function MoverZen(){
            zenPosY += velY * deltaTime;
            if(zenPosY < sueloY){
                TocarSuelo();
            }
            zen.style.bottom = zenPosY+'vh';
        }

        function TocarSuelo(){
            zenPosY = sueloY;
            velY = 0;
            if(saltando){
                zen.classList.add('zeni-corriendo');
            }
            saltando = false;
        }
        

        // function IniciarJuego(){

        //     // Cambia el color del semáforo en un intervalo de tiempo
        //     setTimeout(function() {
        //         document.getElementById('rojo').classList.remove('hidden');
        //         // document.getElementById('amarillo').classList.add('hidden');
        //         // document.getElementById('verde').classList.add('hidden');
        //     }, 1000);
        //     setTimeout(function() {
        //         // document.getElementById('rojo').classList.add('hidden');
        //         document.getElementById('amarillo').classList.remove('hidden');
        //         // document.getElementById('verde').classList.add('hidden');
        //     }, 2500);
        //     setTimeout(function() {
        //         // document.getElementById('rojo').classList.add('hidden');
        //         // document.getElementById('amarillo').classList.add('hidden');
        //         document.getElementById('verde').classList.remove('hidden');
        //     }, 3500);

        //     setTimeout(function() {
        //         document.getElementById('rojo').classList.add('hidden');
        //         document.getElementById('amarillo').classList.add('hidden');
        //         document.getElementById('verde').classList.add('hidden');
        //         reiniciarJuego();
        //     }, 4000);
        // }

        // setTimeout(IniciarJuego, 10);
    }
};

export {
    obstaculosGame
};