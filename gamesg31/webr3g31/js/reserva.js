let nuevo = document.getElementById("nuevo");
let modificar = document.getElementById("modificar");
let borrar = document.getElementById("borrar");
let datos = document.getElementById("datos");
let url = "http://localhost:8082/api/Reservation/all"

inicial()
traerdatos();
traejuegos()
traeclientes()

function inicial() {
  nuevo.style.display = "none";
  modificar.style.display = "none";
  borrar.style.display = "none";
  datos.style.display = "block";
}

function agregar() {

  document.getElementById("startDate").value=""
  document.getElementById("devolutionDate").value=""
  document.getElementById("clientId").value=""
  
  nuevo.style.display = "block";
  modificar.style.display = "none";
  borrar.style.display = "none";
  datos.style.display = "none";
  
}

function editar(id) {
  //1 crear un objeto XMLHttpRequest
  let peticion = new XMLHttpRequest();
  let url = "http://localhost:8083/api/Reservation" ;

  /*
  2 propiedad onreadystatechange asigna a una funcion
  que funcion valida si la respuesta fue exitosa
  readyState=4 y status=200, en cuyo caso obtiene la respuesta, 
  le aplica formato y modifica la pagina o vista
*/
  peticion.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {

      let respuesta = JSON.parse(this.responseText)

      let idModif = respuesta.idReservation
      let startDateModif = respuesta.startDate
      let devolutionDateModif = respuesta.devolutionDate
      let clientIdModif = respuesta.client_id
      let gameIdModif = respuesta.game_id
      let status = respuesta.status

      document.getElementById("idModif").value = idModif
      document.getElementById("startDateModif").value = startDateModif
      document.getElementById("devolutionDateModif").value = devolutionDateModif
      document.getElementById("clientIdModif").value = clientIdModif
      document.getElementById("gameIdModif").value = gameIdModif
      document.getElementById("status").value = status

      //modificamos el titulo para que muestre el valor del codigo de la finca
      //document.getElementById("idLabel").innerHTML = "<strong>Farm id :</strong>" + idModif

      nuevo.style.display = "none";
      modificar.style.display = "block";
      borrar.style.display = "none";
      datos.style.display = "none";
    }
  };
  peticion.open("GET", url + "/" + id, true);
  peticion.send();

}

function eliminar(id) {
  //1 crear un objeto XMLHttpRequest
  let peticion = new XMLHttpRequest();
  let url = "http://localhost:8083/api/Reservation";

  /*
  2 propiedad onreadystatechange asigna a una funcion
  que funcion valida si la respuesta fue exitosa
  readyState=4 y status=200, en cuyo caso obtiene la respuesta, 
  le aplica formato y modifica la pagina o vista
*/
  peticion.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {

      let respuesta = JSON.parse(this.responseText)
      console.log(respuesta)
      document.getElementById("idDelete").value = respuesta.idReservation
      document.getElementById("idList").innerHTML = "<strong>Id :</strong>" + respuesta.idReservation
      document.getElementById("dateStart").innerHTML = "<strong>Fecha inicio :</strong>" + respuesta.startDate
      document.getElementById("dateEnd").innerHTML = "<strong>Fecha fin :</strong>" + respuesta.devolutionDate
      document.getElementById("clientId").innerHTML = "<strong>Farm categoryId :</strong>" + respuesta.game_id
      document.getElementById("gameId").innerHTML = "<strong>Farm Name :</strong>" + respuesta.client_id

      nuevo.style.display = "none";
      modificar.style.display = "none";
      borrar.style.display = "block";
      datos.style.display = "none";
    }
  };
  peticion.open("GET", url + "/" + id, true);
  peticion.send();
}

function guardarNuevo() {

  //recuperar la informacion ingresada en el formulario
  let startDateVal = document.getElementById("startDate").value
  let devolutionDateVal = document.getElementById("devolutionDate").value
  let gameId = document.getElementById("gameId").value
  let clientId = document.getElementById("clientId").value

  //creo un objeto javascript
  let objeto = {
    startDate: startDateVal,
    devolutionDate: devolutionDateVal,
    game: {id: parseInt(gameId) },
    client: {idClient: parseInt(clientId) }
  }

  //convierto el objeto de javascript a formato json
  let objetoJson = JSON.stringify(objeto)

  let url ="http://localhost:8083/api/Reservation/save"

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

  //recuperar la informacion ingresada en el formulario
  let idFarm = document.getElementById("idModif").value
  let startDateModif = document.getElementById("startDateModif").value
  let devolutionDateModif = document.getElementById("devolutionDateModif").value
  let clientIdModif = document.getElementById("clientIdModif").value
  let gameIdModif = document.getElementById("gameIdModif").value

  //creo un objeto javascript
  let objeto = {
    id: idFarm,
    startDate: startDateModif,
    devolutionDate: devolutionDateModif,
    clientId: clientIdModif,
    game_id: gameIdModif
  }

  //convierto el objeto de javascript a formato json
  let objetoJson = JSON.stringify(objeto)

  let url ="http://localhost:8083/api/Reservation";

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

  peticion.open("PUT", url, true)
  peticion.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
  peticion.send(objetoJson)
}

function guardarBorrar() {
  //recuperar la informacion ingresada en el formulario
  let idReservation = document.getElementById("idDelete").value

  let url ="http://localhost:8083/api/Reservation";

  //1 crear un objeto XMLHttpRequest
  let peticion = new XMLHttpRequest()

  /*2 propiedad onreadystatechange asigna a una funcion
        que funcion valida si la respuesta fue exitosa
        readyState=4 y status=200, en cuyo caso obtiene la respuesta, 
        le aplica formato y modifica la pagina o vista
    */
  peticion.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 204) {

      //Configura el aspecto de la pagina
      traerdatos()
      inicial()
    }
  }

  peticion.open("DELETE", url+ "/" + idReservation, true)
  peticion.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
  peticion.send()
}

function traerdatos() {
  //1 crear un objeto XMLHttpRequest
  let peticion = new XMLHttpRequest();
  url = "http://localhost:8083/api/Reservation/all"

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
      let respuesta = JSON.parse(this.responseText);
      //console.log("Respuesta despues de convertir a JSON: " + respuesta);

      //crear html usando los datos de la respuesta que me da el servicio
      //variable 'respuesta'
      for (let i in respuesta) {
        let id = respuesta[i].idReservation;
        var inicio = format(new Date(respuesta[i].startDate));
        var fin = format(new Date(respuesta[i].devolutionDate));
        
        registros +=
          '<tr>\
                        <th scope="row">' +
                        id +
          "</th>\
                        <td>" +
                        inicio +
          "</td>\
                        <td>" +
                        fin +
          "</td>\
                        <td>" +
                        respuesta[i].game.name + " - " + respuesta[i].game.category.name +
          "</td>\
                        <td>" +
          respuesta[i].client.name +
          '</td>\
                        <td>\
                             <button class="btn" style=\"background-color: #d3d45f\" onclick="editar(' +
          id +
          ')">Modificar reserva</button>\
                            <button class="btn" style=\"background-color: #ef6b7a\" onclick="eliminar(' +
          id +
          ')">Eliminar reserva</button>\
                        </td>\
                        </tr>';
      }

      document.getElementById("registros").innerHTML = registros;
    }
  };

  peticion.open("GET", url, true);
  peticion.send();
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
      document.getElementById("gameIdModif").innerHTML = registros
    }
  };

  peticion.open("GET", url, true)
  peticion.send();  
}

function traeclientes(){
  //1 crear un objeto XMLHttpRequest
  let peticion = new XMLHttpRequest();
  url = "http://localhost:8083/api/Client/all"
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
      document.getElementById("clientIdModif").innerHTML = registros
    }
  };

  peticion.open("GET", url, true)
  peticion.send();  
}