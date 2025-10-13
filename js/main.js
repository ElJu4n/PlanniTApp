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
vacaciones = [] //conjunto de dias
dia =  [] //conjunto de eventos

class Evento {
    constructor(tipo, nombre, costo, hora, minutos){
        this.tipo = tipo
        this.nombre = nombre
        this.costo = costo
        this.hora = hora
        this.minutos = minutos
    }
}

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
    
    dia.push( new Evento(tipoEvento.value, nombreEvento.value, costoEvento.value, horaValor, minutosValor  ) )
    tipoEvento.value = ""
    nombreEvento.value = ""
    costoEvento.value = ""
    console.log(dia)

    let eventos = document.getElementById("eventos")
    let listaEventos = document.createElement("ul")
    listaEventos.id = "lista-eventos"
    eventos.appendChild(listaEventos)


    //sortear dia por hora
    //borrar li

    let agruparElementos = document.getElementsByClassName("Evento")
    
    //for (const li of listaActividades) li.remove()

    //print ul
    for (const evento of dia) {
        let li = document.createElement("li")
        li.innerHTML = evento.tipo + " Con el nombre " + evento.nombre + " A las "+ evento.hora +":"+evento.minutos +" Con el presupuesto de " + evento.costo
        li.className = "Evento"
        listaEventos.appendChild(li)
    }

    console.log(agruparElementos)

}







/* opcionMenu = 0
const tipoEvento=[]
const nombreEvento=[]
const horaEvento=[]
const costoEvento=[]
const listaCompleta=[]
let finalListString = ""
let costoTotal = 0

let index = 0;

function sumarElementos (array){
    total = 0
    for(let i = 0; i<index; i++){
        total+=array[i]
    }
    console.log(array)

    return total
}

function generaString(globalIndex) {
    let dummyString = ""
    for(let i = 0; i<globalIndex; i++){
        let numb = i+1
        dummyString += numb +". [" + tipoEvento[i]+ "] Con el nombre " + nombreEvento[i] + " con la duracion de "+ horaEvento[i]+" horas con el presupuesto de " +costoEvento[i] + "\n"
    }
    return dummyString
}

function quitarEventoLog (indexQuitar){
    tipoEvento.splice(indexQuitar,1)
    console.log(tipoEvento)
    nombreEvento.splice(indexQuitar,1)
    console.log(nombreEvento)
    horaEvento.splice(indexQuitar,1)
    console.log(horaEvento)
    costoEvento.splice(indexQuitar,1)
    console.log(costoEvento)
}

alert("Bienvenido a el planeador de vacaciones. Con esta pequeña aplicacion podras planear un dia de tus vacaciones y presupuestarlo. Presiona Ok para comenzar")

while (opcionMenu!=6){
    opcionMenu = parseInt(prompt("Planea tu dia \n\nQue quieres hacer? \n\n1. Agregar Evento\n2. Quitar Evento\n3. Mostrar los eventos del dia\n4. Obten el presupuesto del dia\n5. Obten el total de horas ocupadas\n6. Salir"))
    switch (opcionMenu){
        case 1:

            //Preguntar Tipo de evento
            opcionEvento = parseInt(prompt("Agregar evento\nQue tipo de evento es?\n1. Atraccion\n2. Transporte\n3. Comida"))
            switch (opcionEvento){
                case 1:
                    tipoEvento.push("Atraccion")
                    break
                case 2:
                    tipoEvento.push("Transporte")
                    break
                case 3:
                    tipoEvento.push("Comida")
                    break
                default:
                    break
            }

            //Segun el tipo de evento, indicar un nombre identificador
            if(tipoEvento[index]=="Transporte"){
                nombreEvento.push(prompt("Ponle nombre a este " + tipoEvento[index] + ":" ))
            } else {
                nombreEvento.push(prompt("Ponle nombre a esta " + tipoEvento[index] + ":" ))
            }

            //Establecer la hora
            horaEvento.push(parseInt(prompt("Cuanto dura? (Horas, Int)")))

            //Establecer el presupuesto
            costoEvento.push(parseInt(prompt("Cual es el presupuesto dedicado a este evento")))

            //Imprime todo el evento
            if(tipoEvento[index]=="Transporte"){
                alert("Se agrego un " + tipoEvento[index]+ "\nCon el nombre " + nombreEvento[index] + "\nDurando "+ horaEvento[index]+" horas"+"\nCon el presupuesto de " +costoEvento[index]) 
            } else {
                alert("Se agrego una " + tipoEvento[index]+ "\nCon el nombre " + nombreEvento[index] + "\nDurando "+ horaEvento[index]+" horas"+"\nCon el presupuesto de " +costoEvento[index]) 
            }

            //Se incremente el indice para el siguiente elemento
            index+=1

            break
            
        case 2:

            opcionQuitar = parseInt(prompt("Quitar Evento\n\nIngresa identificador del evento que quieras quitar:\n"+generaString(index)))
            console.log(opcionQuitar)

            //quitar el evento de cada arreglo

            let indexQuitar = opcionQuitar-1
            console.log(indexQuitar)

            console.log("Se quito" + tipoEvento[indexQuitar]+ "] Con el nombre " + nombreEvento[indexQuitar] + " con duracion de "+ horaEvento[indexQuitar]+" horas con el presupuesto de " +costoEvento[indexQuitar])

            quitarEventoLog(indexQuitar)

            index-=1

            break
        case 3:
            //Crear el String para visualizar

            if (index!=0){
                alert("Visualizar Dia\n\n"+ generaString(index))                
            } else {
                alert("No tienes eventos el dia de hoy")
            }

            break
        case 4:
            alert("El presupuesto total es de: " + sumarElementos(costoEvento))
            break

        case 5:
            alert("El total de horas ocupadas es de: " + sumarElementos(horaEvento))
            break
        default:
            break
    }
} */