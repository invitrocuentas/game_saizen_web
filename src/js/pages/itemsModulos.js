import { getAllProductosModulo,postAlmacen } from "../../services/almacen.service";
import { postComprarProductos,getTiendaProductos } from "../../services/tienda.service";
import {
  postUtilizarItem,
  postVerify,
  postDormirVerify,
  postDespertar
} from "../../services/user.service";
import { URL } from "../../config/const/api.const";

const listarItems = async () => {
  if (document.querySelector(".vistaModulo")) {
    const vista = document.querySelector(".vistaModulo");
    window.parent.slug = vista.getAttribute("data-slug");
    window.parent.nombreSlug = vista.getAttribute("data-nombre");
  }

  if (document.querySelector("#itemsVer")) {
    try {
      document.getElementById("loader").classList.remove("hidden");

      var ulElement = document.getElementById("itemsList");
      const datosUser = JSON.parse(window.parent.objUsuario);

      var [ {productos}, {inventario} ] = await Promise.all([getTiendaProductos(window.parent.slug), postAlmacen({id_usuario: datosUser.id})]);

      function crearElementoLi(
        id,
        nombre,
        imagenSrc,
        puntos,
        puntos_requeridos,
        referencias
      ) {
        const liElement = document.createElement("li");
        liElement.classList.add("splide__slide");

        const buttonElement = document.createElement("button");
        buttonElement.classList.add(
          "flex",
          "justify-center",
          "items-center",
          "h-[18vh]",
          "w-[18vh]",
          "bg-white",
          "shadow-xl",
          "rounded-[3vh]",
          "relative"
        );
        buttonElement.setAttribute("data-id", id);
        buttonElement.setAttribute("data-nombre", imagenSrc);

        if (inventario === null && puntos_requeridos > 0) {
          buttonElement.classList.add('bloqued');
        } else {
            if (!(inventario && inventario["".concat(window.parent.nombreSlug)] && inventario["".concat(window.parent.nombreSlug)]["".concat(id)]) && puntos_requeridos > 0) {
                buttonElement.classList.add('bloqued');
            }
        }

        // if (puntos_requeridos != 0) {
        //   buttonElement.classList.add("bloqued");
        // }

        const imgElement = document.createElement("img");
        imgElement.classList.add(
          "h-[12vh]",
          "hover:scale-105",
          "duration-150",
          "ease-in-out"
        );
        imgElement.src =
          "../../../assets/vistas/" +
          window.parent.slug +
          "/" +
          imagenSrc +
          ".png";
        imgElement.alt = "";

        buttonElement.appendChild(imgElement);

        if((inventario != null && inventario[window.parent.nombreSlug] && inventario[window.parent.nombreSlug][`${id}`]) || puntos_requeridos == 0){
          // if(1){
          buttonElement.onclick = async function () {
            const conjunto = [19,20,21,22,25];
            if (conjunto.includes(id)) {
              await postComprarProductos({id_usuario: datosUser.id, id_producto: id});
            }

            var { mensaje } = JSON.parse(referencias);

            window.parent.nombreProducto = imagenSrc;

            document.querySelector(".mensajeVerProducto").textContent =
              mensaje.replace("<<nombre_del_avatar>>", datosUser.avatar);
            const mostrarPuntos = document.querySelectorAll(".puntosVerAccion");

            mostrarPuntos.forEach((mostrar) => {
              mostrar.textContent = puntos;
            });

            window.parent.objItemSelect = {
              id_usuario: datosUser.id,
              id_producto: buttonElement.getAttribute("data-id"),
            };

            window.parent.productoNombreSelect = nombre;

            document
              .querySelector(".cantidadVerProducto")
              .classList.remove("hidden");
            document
              .querySelector("#accionPersonaje")
              .classList.remove("hidden");
            document
              .querySelector(".quitarContenido")
              .classList.remove("hidden");

              document.querySelector(".interactuarItem").setAttribute("data-item", imagenSrc);
              document.querySelector(".interactuarItem").setAttribute('data-paso', 2);

            if (
              imagenSrc == "jabon" ||
              imagenSrc == "cepillarse" ||
              imagenSrc == "dormir"
            ) {
              document.querySelector(".interactuarItem").setAttribute("data-slug", window.parent.slug);
            }
          };
        }

        liElement.appendChild(buttonElement);
        return liElement;
      }

      productos.forEach((datos, index) => {
        const liElement = crearElementoLi(
          datos.id,
          datos.nombre_producto,
          datos.imagen,
          datos.puntos_obtenidos,
          datos.puntos_requeridos,
          datos.referencias
        );
        ulElement.appendChild(liElement);
      });
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        document.getElementById("loader").classList.add("hidden");
      }, 1000);
    }
  }
};

const utilizarItem = () => {
  if (document.querySelector(".interactuarItem")) {
    const cambiosModal = document
      .querySelector("#accionPersonaje")
      .querySelectorAll(".close");
    cambiosModal.forEach((btn3) => {
      btn3.addEventListener("click", () => {
        const elementosConDataItem = document.querySelectorAll("[data-item]");

        elementosConDataItem.forEach((element) => {
          element.setAttribute("data-paso", 0);
        });
      });
    });

    const buttonInteractuar = document.querySelectorAll(".interactuarItem");
    const datosUser = JSON.parse(window.parent.objUsuario);

    buttonInteractuar.forEach((btn) => {
      btn.addEventListener("click", async () => {
        if (btn.getAttribute("data-paso") == 0) {
          try {
            const productosList = await getAllProductosModulo(
              btn.getAttribute("data-slug"),
              { id_usuario: datosUser.id }
            );
            const datoProducto = productosList.productos.find(
              (producto) => producto.imagen === btn.getAttribute("data-item")
            );

            if (datoProducto.mostrar == 1) {
              // if(1){
              var { mensaje } = JSON.parse(datoProducto.referencias);

              window.parent.nombreProducto = datoProducto.imagen;

              document.querySelector(".mensajeVerProducto").textContent =
                mensaje.replace("<<nombre_del_avatar>>", datosUser.avatar);
              const mostrarPuntos =
                document.querySelectorAll(".puntosVerAccion");

              mostrarPuntos.forEach((mostrar) => {
                mostrar.textContent = datoProducto.puntos_obtenidos;
              });

              window.parent.objItemSelect = {
                id_usuario: datosUser.id,
                id_producto: datoProducto.id,
              };

              window.parent.productoNombreSelect = datoProducto.nombre_producto;

              document
                .querySelector(".quitarContenido")
                .classList.remove("hidden");
              document
                .querySelector(".cantidadVerProducto")
                .classList.remove("hidden");
              document
                .querySelector("#accionPersonaje")
                .classList.remove("hidden");

              btn.setAttribute("data-paso", 1);
            } else {
              document
                .querySelector("#accionPersonaje")
                .classList.remove("hidden");
              document
                .querySelector(".cantidadVerProducto")
                .classList.add("hidden");
              document
                .querySelector(".quitarContenido")
                .classList.add("hidden");
              document.querySelector(".mensajeVerProducto").innerHTML = `
                                                                                    <div class="z-30 flex flex-col justify-center items-center gap-[4vh] px-[8vh] text-center">
                                                                                        <span id="nombre_producto_ver" class="text-[#015989] font-boldenvan text-[5vh]">UPS!!!</span>
                                                                                        <span id="descripcion_producto_ver" class="text-[#7B90A1] text-[4vh] font-boogaloo_regular text-justify">No se puede realizar esta acción ahora.</span>
                                                                                    </div>
                                                                                        `;
              setTimeout(() => {

                const dato_paso = document.querySelectorAll('[data-paso]');
                dato_paso.forEach(element => {
                  if(element.getAttribute('data-paso') == 1){
                    element.setAttribute('data-paso', 0);
                  }
                });

                document
                  .querySelector("#accionPersonaje")
                  .classList.add("hidden");
              }, 2000);
            }
          } catch (error) {
            console.log(error);
          }
        } else {
          if (
            (window.parent.nombreProducto == "jabon" ||
              window.parent.nombreProducto == "dormir" ||
              window.parent.nombreProducto == "cepillarse") &&
            btn.getAttribute("data-paso") == 1
          ) {
            window.location.href = `${URL}vistas/interaccion/${window.parent.nombreProducto}.html`;
          } else {
            try {
                if(window.parent.nombreProducto == "jabon"){
                  const opcion = window.parent.mensajeopcion;
                  const idProducto = window.parent.objItemSelect;
                  if(opcion.includes((idProducto.id_producto).toString())){
                    window.location.href = `${URL}vistas/interaccion/${window.parent.nombreProducto}.html`;
                  }else{
                    document
                          .querySelector(".cantidadVerProducto")
                          .classList.add("hidden");
                        document
                          .querySelector(".quitarContenido")
                          .classList.add("hidden");
                        document.querySelector(".mensajeVerProducto").innerHTML = `
                                                                                              <div class="z-30 flex flex-col justify-center items-center gap-[4vh] px-[8vh] text-center">
                                                                                                  <span id="nombre_producto_ver" class="text-[#015989] font-boldenvan text-[5vh]">UPS!!!</span>
                                                                                                  <span id="descripcion_producto_ver" class="text-[#7B90A1] text-[4vh] font-boogaloo_regular text-justify">No se puede realizar esta acción ahora.</span>
                                                                                              </div>
                                                                                                  `;
                        setTimeout(() => {

                          const dato_paso = document.querySelectorAll('[data-paso]');
                          dato_paso.forEach(element => {
                            if(element.getAttribute('data-paso') == 1){
                              element.setAttribute('data-paso', 0);
                            }
                          });

                          document
                            .querySelector("#accionPersonaje")
                            .classList.add("hidden");
                        }, 2000);
                  }
                }else{
                  await postUtilizarItem(window.parent.slug, window.parent.objItemSelect);
                  try {
                    const data = await postVerify({
                      id_user: window.parent.identificador,
                    });
                    window.parent.objUsuario = JSON.stringify(data.data[0]);
                    document.getElementById("monedasUsuario").textContent = datosUser.puntos;
                    document.getElementById("nivelUsuario").textContent = datosUser.nivel == null || datosUser.nivel == "null" ? 1 : datosUser.nivel;
                        if (window.parent.nombreProducto == "dormir") {
                            window.location.href = `${URL}vistas/interaccion/${window.parent.nombreProducto}.html`;
                          }else{
                            window.location.href = URL + "vistas/" + window.parent.slug + "/activado.html";
                          }
                  } catch (err) {
                    throw err;
                  }
                }
                
            } catch (error) {
              console.log(error.message);
              document
                .querySelector(".cantidadVerProducto")
                .classList.add("hidden");
              document
                .querySelector(".quitarContenido")
                .classList.add("hidden");
              document.querySelector(".mensajeVerProducto").innerHTML = `
                                                                                    <div class="z-30 flex flex-col justify-center items-center gap-[4vh] px-[8vh] text-center">
                                                                                        <span id="nombre_producto_ver" class="text-[#015989] font-boldenvan text-[5vh]">UPS!!!</span>
                                                                                        <span id="descripcion_producto_ver" class="text-[#7B90A1] text-[4vh] font-boogaloo_regular text-justify">No se puede realizar esta acción ahora.</span>
                                                                                    </div>
                                                                                        `;
              setTimeout(() => {

                const dato_paso = document.querySelectorAll('[data-paso]');
                dato_paso.forEach(element => {
                  if(element.getAttribute('data-paso') == 1){
                    element.setAttribute('data-paso', 0);
                  }
                });

                document
                  .querySelector("#accionPersonaje")
                  .classList.add("hidden");
              }, 2000);
            }
          }
        }
      });
    });
  }
};

const interaccionrespuesta = async () => {
  if (document.getElementById("gifDinamico")) {
    const gifElement = document.getElementById("gifDinamico");

    const datosUser = JSON.parse(window.parent.objUsuario);

    let slugGif = window.parent.slug;
    let nombreImg = window.parent.nombreProducto
      .toLowerCase()
      .replace(" ", "_");

    if (nombreImg == "cepillarse") {
      slugGif = "descanso";
    } else if (nombreImg == "jabon") {
      slugGif = "salud";
    }

    gifElement.src = `../../../assets/avatares/${datosUser.personaje.toLowerCase()}/gif/${slugGif}/${nombreImg}.gif`;
    // gifElement.src = '../../../assets/avatares/zen/gif/alimentacion/golosinas.gif';
  }

  if (document.getElementById("gifDormir")) {
    const datosUser = JSON.parse(window.parent.objUsuario);

    try {
      document.getElementById("loader").classList.remove("hidden");
      const { data } = await postDormirVerify({ id_user: datosUser.id });

      function verificarRango(array) {
        if (array.length === 0) {
          return false; // No hay elementos en el array
        }
      
        const ultimaFecha = new Date(array[0].date_created);
        const ultimoId = array[0].id;
      
        for (let i = 1; i < array.length; i++) {
          const fechaActual = new Date(array[i].date_created);
          const idActual = array[i].id;
      
          if (fechaActual > ultimaFecha) {
            ultimaFecha = fechaActual;
            ultimoId = idActual;
          }
        }
      
        const ahora = new Date();
        const ochoHorasEnMS = 8 * 60 * 60 * 1000; // 8 horas en milisegundos
      
        return ahora - ultimaFecha <= ochoHorasEnMS;
    }

    function obtenerUltimaFechaConDormirEnRango(array) {
        if (array.length === 0) {
          return null; // No hay elementos en el array
        }
      
        let ultimaFecha = array[0];
        for (let i = 1; i < array.length; i++) {
          const fechaActual = new Date(array[i].date_created);
          const fechaUltima = new Date(ultimaFecha.date_created);
      
          if (fechaActual > fechaUltima) {
            ultimaFecha = array[i];
          }
        }
      
        const ahora = new Date();
        const ochoHorasEnMS = 8 * 60 * 60 * 1000; // 8 horas en milisegundos
      
        return {
          ultimaFecha,
          dentroDelRango: ahora - new Date(ultimaFecha.date_created) <= ochoHorasEnMS
        };
      }

    const estaEnRango = verificarRango(data);
    const estadoDormir = obtenerUltimaFechaConDormirEnRango(data);

    if(estaEnRango && estadoDormir.ultimaFecha.dormir == 1 && estadoDormir.dentroDelRango){
        const vista = document.querySelector('.dormirVista');
        const ocultar = document.querySelectorAll(".dormirOcultar");
        document.querySelector("#mensajeTimer").classList.remove("hidden");
        vista.classList.add('luzOff');
        ocultar.forEach((e) => {
          e.classList.add("hidden");
        });

        updateCountdown(); 
    }

      function calculateTargetTime(baseTime) {
        const targetTime = new Date(baseTime);
        targetTime.setHours(targetTime.getHours() + 8); // Estimar 8 horas después
        return targetTime;
      }
      
      function calculateRemainingTime(targetTime) {
        const now = new Date();
        
        if (now > targetTime) {
          return { hours: 0, minutes: 0, seconds: 0 };
        }
      
        const timeDifference = targetTime - now;
        const totalSeconds = Math.floor(timeDifference / 1000);
        
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        
        return { hours, minutes, seconds };
      }
      
      async function updateCountdown() {
        const baseTime = (estadoDormir.ultimaFecha.date_created).replace(' ', 'T'); // Fecha de registro
        const targetTime = calculateTargetTime(baseTime);
        const remainingTime = calculateRemainingTime(targetTime);
      
        const formattedHours = remainingTime.hours.toString().padStart(2, '0');
        const formattedMinutes = remainingTime.minutes.toString().padStart(2, '0');
        const formattedSeconds = remainingTime.seconds.toString().padStart(2, '0');
      
        document.getElementById('hours').textContent = formattedHours;
        document.getElementById('minutes').textContent = formattedMinutes;
        document.getElementById('seconds').textContent = formattedSeconds;
      
        if (remainingTime.hours === 0 && remainingTime.minutes === 0 && remainingTime.seconds === 0) {
            await postDespertar({ id_user: datosUser.id, dormir: 0 });
            return;
        }
      
        setTimeout(updateCountdown, 1000);
      }    

      const btnRetornar = document.querySelector("#despertarAvatar");

      btnRetornar.addEventListener("click", async () => {
        await postDespertar({ id_user: datosUser.id, dormir: 0 });
        window.location.href = `${URL}inicio/home.html`;
      });

    } catch (error) {
      console.log(error);
    } finally {
      document.getElementById("loader").classList.add("hidden");

      await postDespertar({ id_user: datosUser.id, dormir: 1 });
    }
  }

  if (document.getElementById("gifBanarse")) {
    const gifElement = document.getElementById("gifBanarse");
    const datosUser = JSON.parse(window.parent.objUsuario);

    gifElement.src = `../../../assets/avatares/${datosUser.personaje.toLowerCase()}/gif/jabon/jabon.gif`;

    const interaccionDucha = document.querySelectorAll(".itemJabon");

    interaccionDucha.forEach((btn, index) => {
      btn.addEventListener("click", async () => {
        btn.querySelector("img").classList.remove("activoButton");
        if (!btn.classList.contains("bloqued")) {
          btn.classList.add("bloqued");
          if (interaccionDucha.length > index + 1) {
            interaccionDucha[index + 1]
              .querySelector("img")
              .classList.add("activoButton");
            interaccionDucha[index + 1].classList.remove("bloqued");
            interaccionDucha[index + 1]
              .querySelector("img")
              .classList.add("activoButton");
            gifElement.src = `../../../assets/avatares/${datosUser.personaje.toLowerCase()}/gif/jabon/${interaccionDucha[
              index + 1
            ].getAttribute("data-accion")}.gif`;
          } else {
            try {
              await postUtilizarItem(window.parent.slug, window.parent.objItemSelect);
              try {
                const data = await postVerify({
                  id_user: window.parent.identificador
                });
                window.parent.objUsuario = JSON.stringify(data.data[0]);
                window.parent.mensajeopcion = '';
              } catch (err) {
                throw err;
              }
            } catch (error) {
              console.log(error.message);
              document
                .querySelector(".cantidadVerProducto")
                .classList.add("hidden");
              document.querySelector(".mensajeVerProducto").innerHTML = `
                                                                                    <div class="z-30 flex flex-col justify-center items-center gap-[4vh] px-[8vh] text-center">
                                                                                        <span id="nombre_producto_ver" class="text-[#015989] font-boldenvan text-[5vh]">UPS!!!</span>
                                                                                        <span id="descripcion_producto_ver" class="text-[#7B90A1] text-[4vh] font-boogaloo_regular text-justify">${error.message}</span>
                                                                                    </div>
                                                                                        `;
            } finally {
              document
                .querySelector("#accionPersonaje")
                .classList.remove("hidden");

              setTimeout(() => {
                window.location.href = `${URL}vistas/${window.parent.slug}/home.html`;
              }, 2000);
            }
          }
        }
      });
    });
  }

  if (document.getElementById("volverAlInicio")) {
    const inicioDinamico = document.getElementById("volverAlInicio");

    inicioDinamico.addEventListener("click", () => {
      window.location.href = `${URL}vistas/${window.parent.slug}/home.html`;
    });
  }
};

export { listarItems, utilizarItem, interaccionrespuesta };
