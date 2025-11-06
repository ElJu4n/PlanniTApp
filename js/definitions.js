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
let DBFlag = 0

const URL = "./db/data.json"



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

function popupMessage(title,text){
    Swal.fire({
        title: title,
        text: text,
        icon: "success",
        confirmButtonColor: '#D86363'

    });
}