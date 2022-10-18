let nuevo = document.getElementById("nuevo");
let modificar = document.getElementById("modificar");
let borrar = document.getElementById("borrar");
let tabla = document.getElementById("tabla");
let url="http://localhost:8083/api/Message/all"

inicial()
traerdatos()
traejuegos()
traeclientes()

function inicial() {
    nuevo.style.display = "none"
    modificar.style.display = "none"
    borrar.style.display = "none"
    datos.style.display = "block"
}

function agregar() {
    nuevo.style.display = "block"
    modificar.style.display = "none"
    borrar.style.display = "none"
    datos.style.display = "none"

    document.getElementById("messagetext").value=""
    document.getElementById("gameId").value=""
    document.getElementById("clientId").value=""
    document.getElementById("messagetext").focus()
}

function editar(id) {

    let xhttp = new XMLHttpRequest();
    url = "http://localhost:8083/api/Message"
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let respuesta = JSON.parse(this.responseText);
            console.log(respuesta);
            //Asigna la informaciòn obtenida tras la invocaciòn del ws a cada uno de los campos del formulario
            let idModif = document.getElementById("idModif")
            let messagetextModif = document.getElementById("messagetextModif")

            idModif.value = respuesta.idMessage
            messagetextModif.value = respuesta.messageText
            
            //document.getElementById("idLabel").innerHTML = "<strong>Id: </strong>" + idModif.value
            //Configura aspecto visual de la interfaz
            nuevo.style.display = "none"
            modificar.style.display = "block"
            borrar.style.display = "none"
            datos.style.display = "none"
        }
    };
    xhttp.open("GET", url + "/" + id,true);
    xhttp.send();
}

function eliminar(id) {
    let url = "http://localhost:8083/api/Message"

    //Creo un objeto para poder procesar la peticion ajax
    let solicitud = new XMLHttpRequest()

    solicitud.onreadystatechange = function () {
        //si la respusta esta lista y no hubo error
        if (solicitud.readyState == 4 && solicitud.status == 200) {

            let respuesta = JSON.parse(solicitud.responseText)

            document.getElementById("idList").innerHTML = "<strong>Id: </strong>" + respuesta.idMessage
            document.getElementById("messagetextList").innerHTML = "<strong>Mensaje: </strong>" + respuesta.messageText
            document.getElementById("clientList").innerHTML = "<strong>Cliente: </strong>" + respuesta.client.idClient
            document.getElementById("gameList").innerHTML = "<strong>Finca: </strong>" + respuesta.game.id
            document.getElementById("idDelete").value = respuesta.idMessage
            nuevo.style.display = "none"
            modificar.style.display = "none"
            borrar.style.display = "block"
            datos.style.display = "none"
        }
    }
    solicitud.open("GET", url + "/" + id, true)
    solicitud.send();
}

function guardarNuevo() {
    //recupera información del formulario
    let messagetext = document.getElementById("messagetext").value
    let gameId = document.getElementById("gameId").value
    let clientId = document.getElementById("clientId").value

    //creo un objeto javascript
    
    let objeto = {
        messageText: messagetext,
        game: {id: parseInt(gameId) },
        client: {idClient: parseInt(clientId) }
    };
    
    //convierto el objeto de javascript a formato json
    let objetoJson = JSON.stringify(objeto)

    url = "http://localhost:8083/api/Message/save";

    //1 crear un objeto XMLHttpRequest
    let peticion = new XMLHttpRequest()

    /*2 propiedad onreadystatechange asigna a una funcion
        que funcion valida si la respuesta fue exitosa
        readyState=4 y status=200, en cuyo caso obtiene la respuesta, 
        le aplica formato y modifica la pagina o vista
    */
    peticion.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 201) {

        //Configura el aspecto de la pagina
        traerdatos()
        inicial()
        }
    }

    peticion.open("POST", url, true)
    peticion.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
    peticion.send(objetoJson)
}

function guardarEditar() {
    url = "http://localhost:8083/api/Message/update";

    //recupera la informacion de los campos de texto "input"
    let idModif = document.getElementById("idModif").value    
    let messagetextModif = document.getElementById("messagetextModif").value 

    //crear un objeto javascript
    let objeto = {
        idMessage: idModif,
        messagetext: messagetextModif,
        
    };

    //Crea un objeto de tipo JSON a partir de un objeto javascript
    let objetoJSON = JSON.stringify(objeto)
    //1 crear un objeto XMLHttpRequest
    let peticion = new XMLHttpRequest()

    /*2 propiedad onreadystatechange asigna a una funcion
    que funcion valida si la respuesta fue exitosa
    readyState=4 y status=201, en cuyo caso obtiene la respuesta, 
    le aplica formato y modifica la pagina o vista
   */
    peticion.onreadystatechange = function () {
        if (peticion.readyState == 4 && peticion.status == 201) {
            traerdatos()
            inicial()
        }
    }

    //Configura la peticion
    peticion.open("PUT", url, true)
    //Indico que la peticion recibe formato JSON
    peticion.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
    //Hago un llamado o invoco la peticion
    peticion.send(objetoJSON)
}

function guardarBorrar() {
    let url = "http://localhost:8083/api/Message"

    let objetoPeticion = new XMLHttpRequest();
    let idDelete = document.getElementById("idDelete").value

    objetoPeticion.onreadystatechange = function () {
        if (objetoPeticion.readyState == 4 && objetoPeticion.status == 204) {
            traerdatos()
            inicial()
        }
    }
    objetoPeticion.open("DELETE", url + "/" + idDelete , true)
    objetoPeticion.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
    objetoPeticion.send()

}

function traerdatos() {
    let registros = ""
    let id = ""
    url="http://localhost:8083/api/Message/all"

    let xhttp = new XMLHttpRequest();
    let salida = "<strong>Texto del mensaje :</strong>";

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let respuesta = JSON.parse(this.responseText);

            for (let i in respuesta) {
                id = respuesta[i].idMessage
                registros += "<tr>\
                        <th scope=\"row\" style=\"display:none\">" + id + "</th>\
                        <td>" + respuesta[i].messageText + "</td>\
                        <td>" + respuesta[i].game.name + " - " + respuesta[i].game.category.name +"</td>\
                        <td>" + respuesta[i].client.name + "</td>\
                        <td>\
                             <button class=\"btn\" style=\"background-color: #d3d45f\" onclick=\"editar(" + id + ")\" >Modificar mensaje</button>\
                            <button class=\"btn\" style=\"background-color: #ef6b7a\" onclick=\"eliminar(" + id + ")\" >Eliminar mensaje</button>\
                        </td>\
                        </tr>"

            }

            document.getElementById("registros").innerHTML = registros;

            inicial()
        }
    };
    xhttp.open(
        "GET",
        url,
        true
    );
    xhttp.send();
}

function traejuegos(){
    //1 crear un objeto XMLHttpRequest
    let peticion = new XMLHttpRequest();
    url = "http://localhost:8083/api/Game/all";
    let id;
    let nombre;
    let respuesta;
    /*2 propiedad onreadystatechange asigna a una funcion
          que funcion valida si la respuesta fue exitosa
          readyState=4 y status=200, en cuyo caso obtiene la respuesta, 
          le aplica formato y modifica la pagina o vista
      */
    peticion.onreadystatechange = function () {
      //almacena el html para generar los registros de la tabla
      let registros = "";
      //valida si la peticion fue exitosa
      if (this.readyState == 4 && this.status == 200) {
        respuesta = JSON.parse(this.responseText)
  
        //crear html usando los datos de la respuesta que me da el servicio
        //variable 'respuesta'
        for (let i in respuesta) {
          id = respuesta[i].id;
          nombre = respuesta[i].name
          registros += '<option value="' + id + '">' + nombre + "</option>"
        }
  
        document.getElementById("gameId").innerHTML = registros
      }
    };
  
    peticion.open("GET", url, true)
    peticion.send();  
}

function traeclientes(){
    //1 crear un objeto XMLHttpRequest
    let peticion = new XMLHttpRequest();
    url = "http://localhost:8083/api/Client/all";
    let id;
    let nombre;
    let respuesta;
    /*2 propiedad onreadystatechange asigna a una funcion
          que funcion valida si la respuesta fue exitosa
          readyState=4 y status=200, en cuyo caso obtiene la respuesta, 
          le aplica formato y modifica la pagina o vista
      */
    peticion.onreadystatechange = function () {
      //almacena el html para generar los registros de la tabla
      let registros = "";
      //valida si la peticion fue exitosa
      if (this.readyState == 4 && this.status == 200) {
        respuesta = JSON.parse(this.responseText)
  
        //crear html usando los datos de la respuesta que me da el servicio
        //variable 'respuesta'
        for (let i in respuesta) {
          id = respuesta[i].idClient;
          nombre = respuesta[i].name;
          registros += '<option value="' + id + '">' + nombre + "</option>"
        }
  
        document.getElementById("clientId").innerHTML = registros
      }
    };
  
    peticion.open("GET", url, true)
    peticion.send();  
}