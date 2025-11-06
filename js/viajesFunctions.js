function obtenerViajesDeDB(){
    fetch(URL)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if (localStorage.getItem("viajes")){
                viajes = JSON.parse(localStorage.getItem("viajes"))
                viajes = viajes.concat(data)
                console.log(viajes)
                
            } else {
                viajes = data
            }
            let viajesJSON = JSON.stringify(viajes)
            localStorage.setItem("viajes",viajesJSON)
            pantallaViajes()
            
        })
}

function pantallaCrear(){
    //preguntar por datos del viaje
    pantallaApp.innerHTML = `        <div id="pantalla-inicial">
            <h2>Crea tu viaje</h2>
            <h3>A donde vas?</h3>
            <input type="text" id="nombre-viaje">
            <h3>Cuantos dias dura?</h3>
            <input type="text" id="duracion-viaje">
            <button id="crear-button">Crear</button>
        </div>`

    let crearViaje = document.getElementById("crear-button")
    let duracionViaje = document.getElementById("duracion-viaje")
    let nombreViaje = document.getElementById("nombre-viaje")

    crearViaje.onclick = () => {

        if(document.getElementById("error-mensaje") ){
            mensaje = document.getElementById("error-mensaje")
            mensaje.remove()
            console.log("existe")
        }

        try {

            if ( !Number.isInteger(parseInt(duracionViaje.value) ) || parseInt(duracionViaje.value)<1 ) {
                throw new Error("Ingresa un numero de días valido")

            }  else if ( nombreViaje.value == "" ) {
                throw new Error("Ingresa un nombre valido")

            } else {
                viaje = new Array(parseInt(duracionViaje.value))
                viajes.push( new Viaje(nombreViaje.value, duracionViaje.value, viaje) )
                let viajesJSON = JSON.stringify(viajes)
                localStorage.setItem("viajes",viajesJSON)

                //Crear mensaje, cambia segun la circumstancia

                let messageTitle = "Tu viaje de " + viajes[viajeIndex].duracion + " dias a " + viajes[viajeIndex].nombre + " ha sido creado, agrega eventos a cada dia "

                rutinaPrincipal(messageTitle)
            }

        } catch (err){
            console.log(err)
            pantalla = document.getElementById("pantalla-inicial")
            mensajeError = document.createElement("div") 
            mensajeError.textContent = err
            mensajeError.className = "error-mensaje"
            mensajeError.id = "error-mensaje"
            pantalla.appendChild(mensajeError)
        } 
        



    }

}


function pantallaViajes(){
    viajes = JSON.parse(localStorage.getItem("viajes"))

    //crear interfaz para seleccionar o crear viaje

    pantallaApp.innerHTML = `
                                        <div>Viajes Disponibles:</div>
                                            <ul id="opcion-viaje">
                                            </ul>
    
    `
    // crear las opciones

    selectorViajes = document.getElementById("opcion-viaje")
    let contador = 0
    for (const viaje of viajes) {
        let li = document.createElement("li")
        let div = document.createElement("div")
        div.textContent = viaje.nombre
        div.className = "div-nombre"

        li.appendChild(div)

        //crear boton seguir editando
        let botonSeguir = document.createElement("button")
        botonSeguir.className = "boton-evento"
        botonSeguir.id = "seguir-"+viaje.nombre
        botonSeguir.textContent = "Seguir Editando"
        botonSeguir.addEventListener("click", () => {
            //Se indica el indice donde existe el viaje y se resetea el Dia actual
            viajeIndex = viajes.findIndex((viajeD) => viajeD.nombre === viaje.nombre)
            console.log(viajeIndex)
            diaActual = 0
            //Crear mensaje, cambia segun la circumstancia
            let messageTitle = "Regresa a planear tu viaje a " + viajes[viajeIndex].nombre + " de " +  viajes[viajeIndex].duracion + " dias"
            //rutina Principal
            rutinaPrincipal(messageTitle)

        }  )
        //crear boton eliminar
        let botonEliminar = document.createElement("button")
        botonEliminar.className = "boton-evento"
        botonEliminar.id = "eliminar-"+viaje.nombre
        botonEliminar.textContent = "Eliminar"
        botonEliminar.addEventListener("click",() => {
            index = viajes.findIndex((viajeD) => viajeD.nombre === viaje.nombre)
            viajes.splice(index,1)
            li.remove()
            GuardaDia()
        }) 
        li.appendChild(botonSeguir)
        li.appendChild(botonEliminar)
        selectorViajes.appendChild(li)
        contador++
    }

    //Agregar Boton Crear Nuevo

    let botonNuevo = document.createElement("Button")
    botonNuevo.className = "boton-evento"
    botonNuevo.id = "boton-nuevo"
    botonNuevo.textContent = "Crea un Nuevo Viaje!"
    botonNuevo.addEventListener("click", () => {
        viajeIndex = viajes.length
        console.log(viajeIndex)
        pantallaCrear()
    })

    //Agregar Boton sync con DB
    if (DBFlag == 0){
        let botonSync = document.createElement("button")
        botonSync.className = "boton-evento"
        botonSync.id = "boton-sync"
        botonSync.textContent = "Sincroniza con la Base de Datos"
        botonSync.addEventListener("click", () => {
            Swal.fire({
                title: "Good job!",
                text: "You clicked the button!",
                icon: "success"
            });
            obtenerViajesDeDB()
            botonSync.remove()
            DBFlag = 1

        })
        selectorViajes.appendChild(botonSync)
    }


    selectorViajes.appendChild(botonNuevo)
    
}

function agregaEventosPantalla(screenApp,message){

    screenApp.innerHTML = `             <h3>${message}</h3>

                                        <button id="anterior-dia-button">Anterior</button>
                                        <span id="dia-actual">Día ${diaActual+1}</span>
                                        <button id="sig-dia-button">Siguiente</button>

                                        <button id="regresar-inicio-button">Regresar a Viajes</button>

                                        <div id="eventos" class = "eventos-stile">
                                            <ul id="lista-eventos">
                                            </ul>
                                        </div>

                                        <div id="inputs">
                                            <div>Tipo de evento</div>
                                            <select id="tipo">
                                                <option value="Atraccion">Atraccion</option>
                                                <option value="Transporte">Transporte</option>
                                                <option value="Comida">Comida</option>
                                            </select>
                                            <div>Nombre del evento</div>
                                            <input type="text" id="nombre">
                                            <div>Costo</div>
                                            <input type="text" id="costo">
                                            <div>Hora</div>

                                            <button id="h-plus-button">+</button>
                                            <span id="hora" >00</span>
                                            <button id="h-minus-button">-</button>

                                            <button id="m-plus-button">+</button>
                                            <span id="minutos">00</span>
                                            <button id="m-minus-button">-</button>

                                            <button id="ingresar">Ingresar</button>

                                        </div>

                                        `

    //Botones de dias

    let anteriorDia = document.getElementById("anterior-dia-button")
    let siguienteDia = document.getElementById("sig-dia-button")
    let regresarViajes = document.getElementById("regresar-inicio-button")

    //crear on click

    anteriorDia.onclick = () => {
        GuardaDia()
        diaActual--
        if (diaActual < 0){
            diaActual = viajes[viajeIndex].duracion-1
        }
        actualizaDia(diaActual)
    }

    siguienteDia.onclick = () => {
        GuardaDia()
        diaActual++
        if (diaActual > viajes[viajeIndex].duracion-1){
            diaActual = 0
        }
        actualizaDia(diaActual)

    }

    regresarViajes.onclick = () =>{
        GuardaDia()
        pantallaViajes()
    }

}