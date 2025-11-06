


//primer menu

if (localStorage.getItem("viajes")){

    pantallaViajes()

} else {
    pantallaApp.innerHTML = `
                                        <div>No tienes viajes almacenados en almacenamiento local, crea un nuevo viaje o sincroniza con la base de datos</div>
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

    if (DBFlag == 0){
        let botonSync = document.createElement("button")
        botonSync.className = "boton-evento"
        botonSync.id = "boton-sync"
        botonSync.textContent = "Sincroniza con la Base de Datos"
        botonSync.addEventListener("click", () => {
            
            popupMessage("Exito","Se ha sincronizado la base de datos")
            obtenerViajesDeDB()
            botonSync.remove()
            DBFlag = 1
        })
        selectorViajes.appendChild(botonSync)
    }
}






