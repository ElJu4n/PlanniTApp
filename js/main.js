
let vacaciones = [] //conjunto de dias
let dia =  [] //conjunto de eventos
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

let pantallaApp = document.getElementById("screen-app")

//Existe algo en local storage? si no, visualiza pantalla de crear

if ( localStorage.getItem("numeroDias") ){

    //Crear mensaje, cambia segun la circumstancia
    let messageTitle = "Regresa a planear tu viaje a " + localStorage.getItem("nombreVacaciones") + " de " +  localStorage.getItem("numeroDias") + " dias"

    //rutina Principal
    rutinaPrincipal(messageTitle)


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

    let crearVacaciones = document.getElementById("crear-button")
    let duracionVacacion = document.getElementById("duracion-vacacion")
    let nombreVacacion = document.getElementById("nombre-vacacion")

    crearVacaciones.onclick = () => {
        
        //guardar nombre y dias 
        localStorage.setItem("numeroDias",duracionVacacion.value)
        localStorage.setItem("nombreVacaciones",nombreVacacion.value)

        //Crear mensaje, cambia segun la circumstancia
        let messageTitle = "Tu viaje de " + localStorage.getItem("numeroDias") + " dias a " + localStorage.getItem("nombreVacaciones") + " ha sido creado, agrega eventos a cada dia "

        rutinaPrincipal(messageTitle)

    }
}

function agregaEventosPantalla(screenApp,message){
    screenApp.innerHTML = `       <h3>${message}</h3>
                                        <div id="inputs">
                                        <div>Tipo de evento</div>
                                        <select id="tipo">
                                        <option value="Atraccion">Atraccion</option>
                                        <option value="Transporte">Transporte</option>
                                        <option value="Comida">Comida</option>
                                        </select>
                                        <div>Nombre</div>
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

                                        <div id="eventos" class = "eventos-stile">
                                            <ul id="lista-eventos">
                                            </ul>
                                        </div>`
}

function actualizaLista(){
    
    listaEventos = document.getElementById("lista-eventos")

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
            const diaJSON = JSON.stringify(dia)
            localStorage.setItem("dia",diaJSON)
        })
        li.appendChild(botonEliminar)
        
        listaEventos.appendChild(li)

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
}

function rutinaPrincipal(messageTitle){
    //Clear pantalla
    pantallaApp.innerHTML = ""

    //crear segunda pantalla
    agregaEventosPantalla(pantallaApp,messageTitle)

    //cargar dia si existe                                
    if (localStorage.getItem("dia")){

        dia = JSON.parse(localStorage.getItem("dia"))
        console.log(dia)

        //sortear dia por hora
        dia.sort((a,b) => a.horaDecimal - b.horaDecimal)
    }
    //print ul
    actualizaLista()

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
        actualizaLista()

        const diaJSON = JSON.stringify(dia)
        localStorage.setItem("dia",diaJSON)
    }
}