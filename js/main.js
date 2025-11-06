
let vacacion = [] //conjunto de dias
let vacaciones = []
let numeroVacaciones = 0
let vacacionIndex = 0
let dia =  [] //conjunto de eventos
let diaActual = 0 //dia en pantalla se guarda
let stringEvento = ""
let botones = []
let diasVacaciones = 0
let nombreVacaciones = '' 
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

class Vacacion {
    constructor(nombre, duracion, dias){
        this.nombre = nombre
        this.dias = dias
        this.duracion = duracion
    }
}

let pantallaApp = document.getElementById("screen-app")

//primer menu

if (localStorage.getItem("vacaciones")){

    vacaciones = JSON.parse(localStorage.getItem("vacaciones"))

    //crear interfaz para seleccionar o crear vacacion

    pantallaApp.innerHTML = `
                                        <div>Vacaciones Almacenadas en Local Storage</div>
                                            <ul id="opcion-vacacion">
                                            </ul>
    
    `
    // crear las opciones

    selectorVacaciones = document.getElementById("opcion-vacacion")

    for (const vacacion of vacaciones) {
        let li = document.createElement("option")
        li.value = vacacion.nombre
        li.textContent = vacacion.nombre
        //crear boton seguir editando
        let botonSeguir = document.createElement("button")
        botonSeguir.className = "boton-evento"
        botonSeguir.id = "seguir-"+vacacion.nombre
        botonSeguir.textContent = "Seguir Editando"
        //crear boton eliminar
        let botonEliminar = document.createElement("button")
        botonEliminar.className = "boton-evento"
        botonEliminar.id = "eliminar-"+vacacion.nombre
        botonEliminar.textContent = "Eliminar"
/*         botonEliminar.addEventListener("click",() => {
            index = vacaciones.findIndex((eventoD) => eventoD.nombre === evento.nombre)
            dia.splice(index,1)
            li.remove()
            GuardaDia()
        }) */
        li.appendChild(botonSeguir)
        li.appendChild(botonEliminar)
        selectorVacaciones.appendChild(li)

    }

    //Agregar Boton Crear Nuevo

    let botonNuevo = document.createElement("Button")
    botonNuevo.className = "boton-evento"
    botonNuevo.id = "boton-nuevo"
    botonNuevo.textContent = "Crea una Nueva Vacacion!"
    botonNuevo.addEventListener("click", () => {
        vacacionIndex = vacaciones.length
        console.log(vacacionIndex)
        pantallaCrear()
    })

    selectorVacaciones.appendChild(botonNuevo)
    

} else {
    pantallaApp.innerHTML = `
                                        <div>No Tienes Vacaciones Almacenadas en Local Storagedd</div>
                                            <ul id="opcion-vacacion">
                                            </ul>
    
    `
    //Agregar Boton Crear Nuevo
    selectorVacaciones = document.getElementById("opcion-vacacion")

    let botonNuevo = document.createElement("Button")
    botonNuevo.className = "boton-evento"
    botonNuevo.id = "boton-nuevo"
    botonNuevo.textContent = "Crea una Nueva Vacacion!"
    botonNuevo.addEventListener("click", () => {
        vacacionIndex = vacaciones.length
        console.log(vacacionIndex)
        pantallaCrear()
    })
    selectorVacaciones.appendChild(botonNuevo)
}

//Existe algo en local storage? si no, visualiza pantalla de crear

function pantallaCrear(){
    //preguntar por datos del viaje
    pantallaApp.innerHTML = `        <div id="pantalla-inicial">
            <h2>Crea tu vacacion</h2>
            <h3>A donde vas?</h3>
            <input type="text" id="nombre-vacacion">
            <h3>Cuantos dias dura?</h3>
            <input type="text" id="duracion-vacacion">
            <button id="crear-button">Crear</button>
        </div>`

    let crearVacacion = document.getElementById("crear-button")
    let duracionVacacion = document.getElementById("duracion-vacacion")
    let nombreVacacion = document.getElementById("nombre-vacacion")

    crearVacacion.onclick = () => {
        
        // crear array con dias

        vacacion = new Array(parseInt(duracionVacacion.value))

        vacaciones.push( new Vacacion(nombreVacacion.value, duracionVacacion.value, vacacion) )
        let vacacionesJSON = JSON.stringify(vacaciones)
        localStorage.setItem("vacaciones",vacacionesJSON)

        //Crear mensaje, cambia segun la circumstancia

        let messageTitle = "Tu viaje de " + vacaciones[vacacionIndex].duracion + " dias a " + vacaciones[vacacionIndex].nombre + " ha sido creado, agrega eventos a cada dia "

        rutinaPrincipal(messageTitle)

    }

}

/* if ( localStorage.getItem("vacaciones") ){

    vacaciones = JSON.parse(localStorage.getItem("vacaciones"))

    //Crear mensaje, cambia segun la circumstancia
    let messageTitle = "Regresa a planear tu viaje a " + vacaciones[0].nombre + " de " +  vacaciones[0].duracion + " dias"

    
    //rutina Principal
    //rutinaPrincipal(messageTitle)


} else {

    //preguntar por datos del viaje
    pantallaApp.innerHTML = `        <div id="pantalla-inicial">
            <h2>Crea tu vacacion</h2>
            <h3>A donde vas?</h3>
            <input type="text" id="nombre-vacacion">
            <h3>Cuantos dias dura?</h3>
            <input type="text" id="duracion-vacacion">
            <button id="crear-button">Crear</button>
        </div>`

    let crearVacacion = document.getElementById("crear-button")
    let duracionVacacion = document.getElementById("duracion-vacacion")
    let nombreVacacion = document.getElementById("nombre-vacacion")

    crearVacacion.onclick = () => {
        
        // crear array con dias

        vacacion = new Array(parseInt(duracionVacacion.value))


        vacaciones.push( new Vacacion(nombreVacacion.value, duracionVacacion.value, vacacion) )
        let vacacionesJSON = JSON.stringify(vacaciones)
        localStorage.setItem("vacaciones",vacacionesJSON)

        //Crear mensaje, cambia segun la circumstancia

        let messageTitle = "Tu viaje de " + vacaciones[0].duracion + " dias a " + vacaciones[0].nombre + " ha sido creado, agrega eventos a cada dia "

        //rutinaPrincipal(messageTitle)

    }
}

 */

function agregaEventosPantalla(screenApp,message){

    screenApp.innerHTML = `             <h3>${message}</h3>

                                        <button id="anterior-dia-button">Anterior</button>
                                        <span id="dia-actual">Día ${diaActual+1}</span>
                                        <button id="sig-dia-button">Siguiente</button>

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

    //crear on click

    anteriorDia.onclick = () => {
        GuardaDia()
        diaActual--
        if (diaActual < 0){
            diaActual = vacaciones[0].duracion
        }
        actualizaDia(diaActual)
    }

    siguienteDia.onclick = () => {
        GuardaDia()
        diaActual++
        if (diaActual > vacaciones[0].duracion-1){
            diaActual = 0
        }
        actualizaDia(diaActual)

    }

}

function actualizaDia(diaNuevo){
    let spanDia = document.getElementById("dia-actual")
    let diaforString = parseInt(diaNuevo) + 1
    spanDia.textContent = "Día " + diaforString

    actualizaLista(diaNuevo)

}

function GuardaDia(){
    vacaciones[vacacionIndex].dias[diaActual] = dia

    let vacacionesJSON = JSON.stringify(vacaciones)
    localStorage.setItem("vacaciones",vacacionesJSON )

}

//Guarda Dia Actual


//Actualiza a siguiente dia

function actualizaLista(diaActualizar){
    
    listaEventos = document.getElementById("lista-eventos")
    listaEventos.textContent = ""
    console.log(vacaciones)

    if (vacaciones[vacacionIndex].dias[diaActualizar] == null){
        listaEventos.textContent = "No tienes ningun evento en el dia, agrega eventos"
        dia = []
    } else if (vacaciones[vacacionIndex].dias[diaActualizar].length == 0){
        listaEventos.textContent = "No tienes ningun evento en el dia, agrega eventos"
        dia = []
    } else {

        dia = vacaciones[vacacionIndex].dias[diaActual]

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

    vacaciones = JSON.parse(localStorage.getItem("vacaciones"))

    //cargar dia si existe      
    
    if (vacaciones[vacacionIndex].dias[diaActual] != null){

        dia = vacaciones[vacacionIndex].dias[diaActual]

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