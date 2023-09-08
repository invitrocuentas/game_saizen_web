import { postInicio, postVerify } from "../../services/user.service";
import { URL } from "../../config/const/api.const";

const homeInicio = async () => {
    if(document.querySelector('#monedasUsuario')){   
        try {

            window.identificador = window.parent.identificador;

            if(!window.objUsuario){
                const rsp = await postVerify({id_user: window.identificador});
                if(!rsp.existe){
                    window.location.href = URL+'index.html';
                }else{
                    window.objUsuario = JSON.stringify(rsp.data[0]);
                }
            }

            const datosUser = JSON.parse(window.objUsuario);

            if(document.querySelector('#monedasUsuario')){
                document.getElementById('monedasUsuario').textContent = datosUser.puntos;
            }
            if(document.querySelector('#nombreAvatar')){
                document.getElementById('nombreAvatar').textContent = datosUser.avatar;
            }
            if(document.querySelector('#nombreAvatar2')){
                document.getElementById('nombreAvatar2').textContent = datosUser.avatar;
            }
            if(document.querySelector('#nivelUsuario')){
                document.getElementById('nivelUsuario').textContent = datosUser.nivel == null || datosUser.nivel == 'null' ? 1 : datosUser.nivel;
            }
            
            if(document.getElementById("estadoPorcentaje")){
                    // Obtener elementos HTML por su ID
                    const personajeCarga = document.getElementById("personajeCarga");
                    const estadoCarga = document.getElementById("estadoCarga");
                    const estadoPorcentaje = document.getElementById("estadoPorcentaje");
                    const gradients = [
                        'linear-gradient(to bottom, #77CFE7, #009DC8, #005F8E, #015989)',
                        'linear-gradient(to bottom, #E7DC77, #C8B400, #8E8500, #895C01)',
                        'linear-gradient(to bottom, #E77777, #C80000, #8E0000, #890101)'
                    ];

                    const colorText = [
                        'texto-borde_estado_85',
                        'texto-borde_estado_50',
                        'texto-borde_estado_15'
                    ];
                    // Actualizar el texto del porcentaje
                    estadoPorcentaje.textContent = `Estado: ${datosUser.barra_estado}%`;
                    // Actualizar el tamaño de la barra de carga
                    personajeCarga.style.left = `${datosUser.barra_estado - 8}%`;
                    estadoCarga.style.clipPath  = `inset(0 ${100 - datosUser.barra_estado}% 0 0)`;
                    if(datosUser.barra_estado >= 75){
                        estadoPorcentaje.classList.add(colorText[0]);
                        estadoCarga.style.backgroundImage = gradients[0];
                    }else if(datosUser.barra_estado >= 50 && datosUser.barra_estado < 75){
                        estadoPorcentaje.classList.add(colorText[1]);
                        estadoCarga.style.backgroundImage = gradients[1];
                    }else{
                        estadoPorcentaje.classList.add(colorText[2]);
                        estadoCarga.style.backgroundImage = gradients[2];
                    }
            }
            
        } catch (error) {
            console.log(error)
        } finally{
            document.getElementById('loader').classList.add('hidden');
        }
    }
};

export {
    homeInicio
};