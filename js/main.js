/* const eventos = [
    {
        id: 1,
        tipo: "Atraccion",
        nombre: "Museo 1",
        hora: "13",
        costo: 100
    },
    {
        id: 2,
        tipo: "Transporte",
        nombre: "Tren",
        hora: "8",
        costo: 150
    },
    {
        id: 3,
        tipo: "Atraccion",
        nombre: "Museo 2",
        hora: "11",
        costo: 254
    },
    {
        id: 4,
        tipo: "Comida",
        nombre: "Amborguesa",
        hora: "16",
        costo: 567
    },
        {
        id: 5,
        tipo: "Transporte",
        nombre: "Tren 2",
        hora: "17",
        costo: 57
    },
] */

/* console.log(eventos)
console.log("djjadsj") */
let vacaciones = [] //conjunto de dias
let dia =  [] //conjunto de eventos
let stringEventoFlag = ""
let botones = []
let diasVacaciones = 0
let nombreVacaciones = '' 

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

//Primera pantalla

let crearVacaciones = document.getElementById("crear-button")
let duracionVacacion = document.getElementById("duracion-vacacion")
let nombreVacacion = document.getElementById("nombre-vacacion")
let pantallaApp = document.getElementById("screen-app")

crearVacaciones.onclick = () => {
    //guardar datos y borrar
    diasVacaciones = duracionVacacion.value
    nombreVacaciones = nombreVacacion.value
    console.log(diasVacaciones,nombreVacaciones)
    pantallaApp.innerHTML = ""
    //crear segunda pantalla
    pantallaApp.innerHTML = `       <h3>Tu viaje de ${diasVacaciones} dias a ${nombreVacaciones} ha sido creado, agrega eventos a cada dia </h3>
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
                                
    let tipoEvento = document.getElementById("tipo")
    let nombreEvento = document.getElementById("nombre")
    let costoEvento = document.getElementById("costo")
    let horaEventoPlus = document.getElementById("h-plus-button")
    let horaEventoMinus = document.getElementById("h-minus-button")
    let horaEvento = document.getElementById("hora")
    let minutosEventoPlus = document.getElementById("m-plus-button")
    let minutosEventoMinus = document.getElementById("m-minus-button")
    let minutosEvento = document.getElementById("minutos")
    let ingresarEvento = document.getElementById("ingresar")

    let horaValor = 0
    let minutosValor = 0

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

    ingresarEvento.onclick = () => {

        //borrar ul

        if (dia.length > 0){
            let listaEventos = document.getElementById("lista-eventos")
            listaEventos.innerHTML = ""
        }
        
        //Crear Instancia de evento y agregar a dia

        dia.push( new Evento(tipoEvento.value, nombreEvento.value, costoEvento.value, horaValor, minutosValor  ) )
        tipoEvento.value = ""
        nombreEvento.value = ""
        costoEvento.value = ""

        //sortear dia por hora

        dia.sort((a,b) => a.horaDecimal - b.horaDecimal)

        //print ul
        listaEventos = document.getElementById("lista-eventos")



        for (const evento of dia) {
            let li = document.createElement("li")
            if (evento.minutos < 10) {
                stringEvento = evento.hora +":"+ "0" + evento.minutos +"hrs " +evento.tipo + " con el nombre " + evento.nombre +" con el presupuesto de " + evento.costo
            } else {
                stringEvento = evento.hora +":" + evento.minutos +"hrs " +evento.tipo + " con el nombre " + evento.nombre +" con el presupuesto de " + evento.costo
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
                console.log(dia)
            })
            li.appendChild(botonEliminar)

            listaEventos.appendChild(li)

        }
    }

}

//Pantalla Dias





