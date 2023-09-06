import { getTienda } from "../../services/tienda.service";

const tiendaOpciones = async () => {

    if(document.querySelector("#modulos-tienda")){
        try {
            let box = document.querySelector("#modulos-tienda")
            const rsp = await getTienda();
            rsp.tienda.forEach(modulo => {
                const {id, nombre, slug, imagen} = modulo
                const boxModule = document.createElement("A")
                boxModule.classList.add("flex", "flex-col", "justify-around", "items-center", "bg-white", "rounded-lg", "h-[35vh]", "w-[45vh]", "shadow-lg", "hover:cursor-pointer")
                boxModule.href = `tiendaProductos.html`;
                boxModule.innerHTML = `
                    <div class="h-[20vh] flex justify-center items-center">
                        <img class="hover:scale-110 duration-500 ease-in-out w-[14vh]" src="../../assets/tienda/${imagen}.png" alt="">
                    </div>
                    <span class="text-[4vh] font-boldenvan text-[#009DC8]">${nombre}</span>            
                `
                box.appendChild(boxModule)
            });
        } catch (error) {
            console.log(error)
        }
    }

};

export {
    tiendaOpciones
};