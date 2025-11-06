
let viaje = [] //conjunto de dias
let viajes = [] //conjunto de viajes
let numeroViajes = 0
let viajeIndex = 0
let dia =  [] //conjunto de eventos
let diaActual = 0 //dia en pantalla se guarda
let stringEvento = ""
let botones = []
let diasViajes = 0
let nombreViajes = '' 
let horaValor = 0
let minutosValor = 0

class Evento {
    constructor(tipo, nombre, costo, hora, minutos){
        this.tipo = tipo
        this.nombre = nombre
        this.costo = costo
        this.hora = hora
        this.minutos = minutos
        this.horaDecimal = this.hora + this.minutos/60
    }
}

class Viaje {
    constructor(nombre, duracion, dias){
        this.nombre = nombre
        this.dias = dias
        this.duracion = duracion
    }
}

let pantallaApp = document.getElementById("screen-app")

//primer menu

if (localStorage.getItem("viajes")){

    pantallaViajes()

} else {
    pantallaApp.innerHTML = `
                                        <div>No Tienes Viajes Almacenados en Local Storage</div>
                                            <ul id="opcion-viaje">
                                            </ul>
    
    `
    //Agregar Boton Crear Nuevo
    selectorViajes = document.getElementById("opcion-viaje")

    let botonNuevo = document.createElement("Button")
    botonNuevo.className = "boton-evento"
    botonNuevo.id = "boton-nuevo"
    botonNuevo.textContent = "Crea una Nueva Viaje!"
    botonNuevo.addEventListener("click", () => {
        viajeIndex = viajes.length
        console.log(viajeIndex)
        pantallaCrear()
    })
    selectorViajes.appendChild(botonNuevo)
}

//Existe algo en local storage? si no, visualiza pantalla de crear

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
        
        // crear array con dias

        viaje = new Array(parseInt(duracionViaje.value))

        viajes.push( new Viaje(nombreViaje.value, duracionViaje.value, viaje) )
        let viajesJSON = JSON.stringify(viajes)
        localStorage.setItem("viajes",viajesJSON)

        //Crear mensaje, cambia segun la circumstancia

        let messageTitle = "Tu viaje de " + viajes[viajeIndex].duracion + " dias a " + viajes[viajeIndex].nombre + " ha sido creado, agrega eventos a cada dia "

        rutinaPrincipal(messageTitle)

    }

}


function pantallaViajes(){
    viajes = JSON.parse(localStorage.getItem("viajes"))

    //crear interfaz para seleccionar o crear viaje

    pantallaApp.innerHTML = `
                                        <div>Viajes Almacenadas en Local Storage</div>
                                            <ul id="opcion-viaje">
                                            </ul>
    
    `
    // crear las opciones

    selectorViajes = document.getElementById("opcion-viaje")
    let contador = 0
    for (const viaje of viajes) {
        let li = document.createElement("li")
        li.value = viaje.nombre
        li.textContent = viaje.nombre
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
    botonNuevo.textContent = "Crea una Nueva Viaje!"
    botonNuevo.addEventListener("click", () => {
        viajeIndex = viajes.length
        console.log(viajeIndex)
        pantallaCrear()
    })

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
            diaActual = viajes[viajeIndex].duracion
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

function actualizaDia(diaNuevo){
    let spanDia = document.getElementById("dia-actual")
    let diaforString = parseInt(diaNuevo) + 1
    spanDia.textContent = "Día " + diaforString

    actualizaLista(diaNuevo)

}

function GuardaDia(){
    viajes[viajeIndex].dias[diaActual] = dia

    let viajesJSON = JSON.stringify(viajes)
    localStorage.setItem("viajes",viajesJSON )

}

//Guarda Dia Actual


//Actualiza a siguiente dia

function actualizaLista(diaActualizar){
    
    listaEventos = document.getElementById("lista-eventos")
    listaEventos.textContent = ""
    console.log(viajes)

    if (viajes[viajeIndex].dias[diaActualizar] == null){
        listaEventos.textContent = "No tienes ningun evento en el dia, agrega eventos"
        dia = []
    } else if (viajes[viajeIndex].dias[diaActualizar].length == 0){
        listaEventos.textContent = "No tienes ningun evento en el dia, agrega eventos"
        dia = []
    } else {

        dia = viajes[viajeIndex].dias[diaActual]

        for (const evento of dia) {
            console.log(evento)
            let li = document.createElement("li")
            if (evento.minutos < 10) {
                stringEvento = evento.hora +":"+ "0" + evento.minutos +"hrs " +evento.tipo + " con el nombre " + evento.nombre +" con el presupuesto de " + evento.costo +" pesos"
            } else {
                stringEvento = evento.hora +":" + evento.minutos +"hrs " +evento.tipo + " con el nombre " + evento.nombre +" con el presupuesto de " + evento.costo+" pesos"
            }

            li.innerHTML = `<span>${stringEvento}</span>`
            li.className = "evento"

            const botonEliminar = document.createElement("button")
            botonEliminar.className = "boton-evento"
            botonEliminar.id = "eliminar-"+evento.nombre
            botonEliminar.textContent = "Eliminar"
            botonEliminar.addEventListener("click",() => {
                console.log(dia)
                index = dia.findIndex((eventoD) => eventoD.nombre === evento.nombre)
                dia.splice(index,1)
                li.remove()
                GuardaDia()
            })
            li.appendChild(botonEliminar)
            
            listaEventos.appendChild(li)

        }
    }


}


function eventosHora(){
    let horaEventoPlus = document.getElementById("h-plus-button")
    let horaEventoMinus = document.getElementById("h-minus-button")
    let horaEvento = document.getElementById("hora")

    horaEventoPlus.onclick = () => {
        horaValor++
        if (horaValor > 24) horaValor = 0 
        horaEvento.innerHTML = horaValor 
    }

    horaEventoMinus.onclick = () => {
        horaValor--
        if (horaValor < 0)  horaValor = 23
        horaEvento.innerHTML = horaValor
    }

}

function eventosMinutos(){

    let minutosEventoPlus = document.getElementById("m-plus-button")
    let minutosEventoMinus = document.getElementById("m-minus-button")
    let minutosEvento = document.getElementById("minutos")

    minutosEventoPlus.onclick = () => {
        minutosValor++
        if (horaValor > 60) minutosValor = 0 
        minutosEvento.innerHTML = minutosValor 
    }

    minutosEventoMinus.onclick = () => {
        minutosValor--
        if (minutosValor < 0)  minutosValor = 59
        minutosEvento.innerHTML = minutosValor
    }
}

function crearEventosApp(){
    let tipoEvento = document.getElementById("tipo")
    let nombreEvento = document.getElementById("nombre")
    let costoEvento = document.getElementById("costo")

    dia.push( new Evento(tipoEvento.value, nombreEvento.value, costoEvento.value, horaValor, minutosValor  ) )
    tipoEvento.value = ""
    nombreEvento.value = ""
    costoEvento.value = ""

    GuardaDia()
}

function rutinaPrincipal(messageTitle){
    //Clear pantalla
    pantallaApp.innerHTML = ""

    //crear segunda pantalla
    agregaEventosPantalla(pantallaApp,messageTitle)

    viajes = JSON.parse(localStorage.getItem("viajes"))

    //cargar dia si existe      
    
    if (viajes[viajeIndex].dias[diaActual] != null){

        dia = viajes[viajeIndex].dias[diaActual]

        //sortear dia por hora
        dia.sort((a,b) => a.horaDecimal - b.horaDecimal)
    }

      

    //print ul
    actualizaLista(diaActual)

    //eventos Tiempo
    eventosHora()
    eventosMinutos()

    //Ingresar Evento
    let ingresarEvento = document.getElementById("ingresar")

    ingresarEvento.onclick = () => {

        //borrar ul para actualizar
        if (dia.length > 0){
            let listaEventos = document.getElementById("lista-eventos")
            listaEventos.innerHTML = ""
        }
        
        //Crear Instancia de evento y agregar a dia aki
        crearEventosApp()

        //sortear dia por hora
        dia.sort((a,b) => a.horaDecimal - b.horaDecimal)

        //actualiza pantalla de agenda
        actualizaLista(diaActual)
        GuardaDia()

        /* const diaJSON = JSON.stringify(dia)
        localStorage.setItem("dia",diaJSON) */
    }
}