const obstaculosGame = () => {

    if (document.querySelector('#gameCanvas')) {

        var time = new Date();
        var deltaTime = 0;

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

        var sueloY = 13;
        var velY = 0;
        var impulso = 25;
        var gravedad = 10;

        var zenPosX = 42;
        var zenPosY = sueloY;

        var sueloX = 0;
        var velEscenario = 20;
        var gameVel = 1;
        var score = 0;

        var parado = false;
        var saltando = false;

        var tiempoHastaObstaculo = 10;
        var tiempoObstaculoMin = 5;
        var tiempoObstaculoMax = 8;
        var obstaculoPosY = 16;
        var obstaculos = [];

        var contenedor;
        var zen ;
        var textoScore;
        var suelo;
        var gameOver;

        let agachado = false;

        function Start() {
            gameOver = document.querySelector('.game-over');
            suelo = document.querySelector('.suelo');
            contenedor = document.querySelector('#gameCanvas');
            textoScore = document.querySelector('.score');
            zen = document.querySelector('.zeni');
            document.addEventListener('keydown', HandleKeyDown); 
            document.addEventListener('keyup', HandleKeyUp); 
        }

        function HandleKeyDown(ev){
            if(ev.keyCode == 32 || ev.key === "w" || ev.key === "W" || ev.key === "ArrowUp"){
                Saltar();
            }else{
                if(ev.key === "s" || ev.key === "S" || ev.key === "ArrowDown"){
                    Agacharse();
                }
            }
        }
        
        function Saltar(){
            if(zenPosY === sueloY){
                saltando = true;
                velY = impulso;
                zen.classList.remove('zeni-corriendo');
            }
        }

        function HandleKeyUp(ev) {
            if (ev.key === "s" || ev.key === "S" || ev.key === "ArrowDown") {
              DejarDeAgacharse();
            }
          }
          
          function Agacharse() {
            if (zenPosY === sueloY && !agachado) {
              zen.classList.remove('zeni-corriendo');
              zen.classList.add('zeni-agacharse');
              agachado = true; // Establecer la variable agachado en verdadero
            }
          }
          
          function DejarDeAgacharse() {
            if (agachado) {
              zen.classList.add('zeni-corriendo');
              zen.classList.remove('zeni-agacharse');
              agachado = false; // Establecer la variable agachado en falso
            }
          }

        function Update(){

            if(parado)return;

            MoverSuelo();
            MoverZen();
            DecidirCrearObstaculos();
            MoverObstaculos();
            DetectarColision();

            velY -= gravedad * deltaTime;
        }

        function MoverSuelo(){
            sueloX += CalcularDesplazamiento();
            suelo.style.left = -(sueloX % contenedor.clientWidth) / 4 + `vh`;
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
                zen.classList.remove('zeni-agacharse');
            }
            saltando = false;
        }

        function DecidirCrearObstaculos(){
            tiempoHastaObstaculo -= deltaTime;
            if(tiempoHastaObstaculo <= 0){
                CrearObstaculo();
            }
        }

        function CrearObstaculo(){
            var obstaculo = document.createElement("div");
            contenedor.appendChild(obstaculo);
            obstaculo.classList.add("cactus");
            if(Math.random() > 0.5) obstaculo.classList.add("cactus2");
            obstaculo.posX = contenedor.clientWidth;
            obstaculo.style.left = contenedor.clientWidth+"px";

            obstaculos.push(obstaculo);
            tiempoHastaObstaculo = tiempoObstaculoMin + Math.random() * (tiempoObstaculoMax - tiempoObstaculoMin) / gameVel;
        }

        function MoverObstaculos(){
            for(var i = obstaculos.length - 1; i>= 0; i--){
                if(obstaculos[i].posX < -obstaculos[i].clientWidth){
                    obstaculos[i].parentNode.removeChild(obstaculos[i]);
                    obstaculos.splice(i, 1);
                    GanarPuntos();
                }else{
                    obstaculos[i].posX -= CalcularDesplazamiento();
                    obstaculos[i].style.left = obstaculos[i].posX / 4 +"vh";
                }
            }
        }

        function GanarPuntos(){
            score++;
            textoScore.innerText = score;
            if(score == 15){
                gameVel = 1.2;
            }else if(score == 30) {
                gameVel = 1.5;
            } else if(score == 50) {
                gameVel = 1.8;
            }
            suelo.style.animationDuration = (3/gameVel)+"s";
        }

        function DetectarColision(){
            for(var i = 0; i < obstaculos.length; i++){
                if(obstaculos[i].posX > zenPosX + zen.clientWidth){
                    break;
                }else{
                    if(IsCollision(zen, obstaculos[i], 2, 13, 13, 13)){
                        GameOver();
                    }
                }
            }
        }

        function IsCollision(a, b, paddingTop, paddingRight, paddingBottom, paddingLeft){
            var aRect = a.getBoundingClientRect();
            var bRect = b.getBoundingClientRect();

            return !(
                ((aRect.top + aRect.height - paddingBottom) < (bRect.top)) ||
                (aRect.top + paddingTop > (bRect.top + bRect.height)) ||
                ((aRect.left + aRect.width - paddingRight) < bRect.left) ||
                (aRect.left + paddingLeft > (bRect.left + bRect.width))
            );
        }

        function GameOver(){
            Estrellarse();
            gameOver.style.display = "block";
        }

        function Estrellarse(){
            zen.classList.remove('zeni-corriendo');
            zen.classList.add('zeni-estrellado');
            parado = true;
        }
        

        function IniciarJuego(){

            // Cambia el color del semáforo en un intervalo de tiempo
            setTimeout(function() {
                document.getElementById('rojo').classList.remove('hidden');
                // document.getElementById('amarillo').classList.add('hidden');
                // document.getElementById('verde').classList.add('hidden');
            }, 1000);
            setTimeout(function() {
                // document.getElementById('rojo').classList.add('hidden');
                document.getElementById('amarillo').classList.remove('hidden');
                // document.getElementById('verde').classList.add('hidden');
            }, 2500);
            setTimeout(function() {
                // document.getElementById('rojo').classList.add('hidden');
                // document.getElementById('amarillo').classList.add('hidden');
                document.getElementById('verde').classList.remove('hidden');
            }, 3500);

            setTimeout(function() {
                document.getElementById('rojo').classList.add('hidden');
                document.getElementById('amarillo').classList.add('hidden');
                document.getElementById('verde').classList.add('hidden');
                document.querySelector('.semaforo').classList.add('hidden');
                Init();
            }, 4000);
        }

        if(document.readyState == "complete" || document.readyState == "interactive"){
            setTimeout(IniciarJuego, 1);
        }else{
            document.addEventListener("DOMContentLoaded", IniciarJuego);
        }

        // if(document.readyState == "complete" || document.readyState == "interactive"){
        //     setTimeout(Init, 1);
        // }else{
        //     document.addEventListener("DOMContentLoaded", Init);
        // }
    }
};

export {
    obstaculosGame
};