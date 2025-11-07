function GuardaDia(){
    viajes[viajeIndex].dias[diaActual] = dia

    let viajesJSON = JSON.stringify(viajes)
    localStorage.setItem("viajes",viajesJSON )

}

function actualizaDia(diaNuevo){
    let spanDia = document.getElementById("dia-actual")
    let diaforString = parseInt(diaNuevo) + 1
    spanDia.textContent = "Día " + diaforString

    actualizaLista(diaNuevo)

}

function crearEventosApp(){
    let tipoEvento = document.getElementById("tipo")
    let nombreEvento = document.getElementById("nombre")
    let costoEvento = document.getElementById("costo")

    if(document.getElementById("error-mensaje") ){
        mensaje = document.getElementById("error-mensaje")
        mensaje.remove()
        console.log("existe")
    }

    try {
        if(nombreEvento.value == ""){
            throw new Error("Por favor ingresa un nombre")

        } else if (tipoEvento.value == ""){
            throw new Error ("Por favor Ingresa un tipo de Evento")

        }else if (costoEvento.value == ""){
            throw new Error ("Por favor Ingresa un costo")

        }else if (isNaN(costoEvento.value)){
            throw new Error ("Ingresa un numero en el campo de costo")
        }else{
            dia.push( new Evento(tipoEvento.value, nombreEvento.value, parseFloat(costoEvento.value), horaValor, minutosValor  ) )
            tipoEvento.value = ""
            nombreEvento.value = ""
            costoEvento.value = ""
            GuardaDia()
            popupMessage("Exito","Se Guardo el evento")
        }
    } catch (err) {
        //pantalla = document.getElementById("pantalla-inicial")
        mensajeError = document.createElement("div") 
        mensajeError.textContent = err
        mensajeError.className = "error-mensaje"
        mensajeError.id = "error-mensaje"
        pantallaApp.appendChild(mensajeError)
    }


}

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
                Swal.fire({
                    title: "Seguro que quieres eliminar este evento?",
                    showDenyButton: true,
                    confirmButtonColor: '#D86363',
                    denyButtonColor: ' #fccd60ff',
                    confirmButtonText: "Si",
                    denyButtonText: "No"
                    }).then((result) => {
                    if (result.isConfirmed) {
                        popupMessage("Evento Eliminado","Puedes Continuar")
                        console.log(dia)
                        index = dia.findIndex((eventoD) => eventoD.nombre === evento.nombre)
                        dia.splice(index,1)
                        li.remove()
                        
                        if (viajes.length > 0){
                            GuardaDia()
                        }
                        
                    } else if (result.isDenied) {
                        
                    }
                });
                
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

    }
}