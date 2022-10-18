let nuevo = document.getElementById("nuevo");
let modificar = document.getElementById("modificar");
let borrar = document.getElementById("borrar");
let tabla = document.getElementById("tabla");
let url = "http://localhost:8083/api/Game/all";

inicial();
traerdatos();
listarcategorias();

function inicial() {
  nuevo.style.display = "none";
  modificar.style.display = "none";
  borrar.style.display = "none";
  datos.style.display = "block";
}

function agregar() {
  nuevo.style.display = "block";
  modificar.style.display = "none";
  borrar.style.display = "none";
  datos.style.display = "none";

  document.getElementById("name").value = "";
  document.getElementById("category").value = "";
  document.getElementById("developer").value = "";
  document.getElementById("description").value = "";
  document.getElementById("year").value = "";
  document.getElementById("name").focus();
}

function editar(id) {
  let xhttp = new XMLHttpRequest();
  let url = "http://localhost:8083/api/Game";
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let respuesta = JSON.parse(this.responseText);

      //Asigna la informaciòn obtenida tras la invocaciòn del ws a cada uno de los campos del formulario
      let idModif = document.getElementById("idModif");
      let nameModif = document.getElementById("nameModif");
      let categoryIdModif = document.getElementById("categoryIdModif");
      let developerModif = document.getElementById("developerModif");
      let yearModif = document.getElementById("yearModif");
      let descModif = document.getElementById("descModif");
      idModif.value = respuesta.id;
      nameModif.value = respuesta.name;
      categoryIdModif.value = respuesta.category.id;
      developerModif.value = respuesta.developer;
      yearModif.value = respuesta.year;
      descModif.value = respuesta.description;
      console.log(respuesta);
      console.log(respuesta.id);
      //document.getElementById("idLabel").innerHTML = "<strong>Game id: </strong>" + idModif.value
      //Configura aspecto visual de la interfaz
      nuevo.style.display = "none";
      modificar.style.display = "block";
      borrar.style.display = "none";
      datos.style.display = "none";
    }
  };
  xhttp.open("GET", url + "/" + id, true);
  xhttp.send();
}

function eliminar(id) {
  let solicitud = new XMLHttpRequest();
  let url = "http://localhost:8083/api/Game";

  solicitud.onreadystatechange = function () {
    //si la respusta esta lista y no hubo error
    if (solicitud.readyState == 4 && solicitud.status == 200) {

      let respuesta = JSON.parse(solicitud.responseText);
        document.getElementById("idList").innerHTML = "<strong>Id: </strong>" + respuesta.id;
        document.getElementById("developerList").innerHTML = "<strong>Desarrollador: </strong>" + respuesta.developer;
        document.getElementById("yearList").innerHTML ="<strong>Año: </strong>" + respuesta.year;
        document.getElementById("category_idList").innerHTML = "<strong>Categoría: </strong>" + respuesta.category_id;
        document.getElementById("nameList").innerHTML =  "<strong>Nombre: </strong>" + respuesta.name;
        document.getElementById("descList").innerHTML = "<strong>Descripción: </strong>" + respuesta.description;
        document.getElementById("idDelete").value = respuesta.id;

      nuevo.style.display = "none";
      modificar.style.display = "none";
      borrar.style.display = "block";
      datos.style.display = "none";
    }
  };
  solicitud.open("GET", url + "/" + id, true);
  solicitud.send();
}

function guardarNuevo() {
  //recupera información del formulario
  let nameGame = document.getElementById("name").value;
  let category = document.getElementById("category").value;
  let developer = document.getElementById("developer").value;
  let description = document.getElementById("description").value;
  let year = document.getElementById("year").value;

  let objeto = {
    developer: developer,
    year: parseInt(year),
    category: { id: parseInt(category) },
    name: nameGame,
    description: description,
  };

  //convierto el objeto de javascript a formato json
  let objetoJson = JSON.stringify(objeto);

  url = "http://localhost:8083/api/Game/save";

  //1 crear un objeto XMLHttpRequest
  let peticion = new XMLHttpRequest();

  /*2 propiedad onreadystatechange asigna a una funcion
        que funcion valida si la respuesta fue exitosa
        readyState=4 y status=200, en cuyo caso obtiene la respuesta, 
        le aplica formato y modifica la pagina o vista
    */
  peticion.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 201) {
      //Configura el aspecto de la pagina
      traerdatos();
      inicial();
    }
  };

  peticion.open("POST", url, true);
  peticion.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  peticion.send(objetoJson);
}

function guardarEditar() {
    let url = "http://localhost:8083/api/Game/update";

  //recupera la informacion de los campos de texto "input"
    idModif = document.getElementById("idModif").value;
    nameModif = document.getElementById("nameModif").value;
    categoryIdModif = document.getElementById("categoryIdModif").value;
    developerModif = document.getElementById("developerModif").value;
    yearModif = document.getElementById("yearModif").value;
    descModif = document.getElementById("descModif").value;
    
  

  //crear un objeto javascript
  let objeto = {
    id: idModif,
    name: nameModif,
    category_id: categoryIdModif,
    developer: developerModif,
    year: yearModif,
    description:descModif,
  };

  //Crea un objeto de tipo JSON a partir de un objeto javascript
  let objetoJSON = JSON.stringify(objeto);
  //1 crear un objeto XMLHttpRequest
  let peticion = new XMLHttpRequest();

  /*2 propiedad onreadystatechange asigna a una funcion
    que funcion valida si la respuesta fue exitosa
    readyState=4 y status=201, en cuyo caso obtiene la respuesta, 
    le aplica formato y modifica la pagina o vista
   */
  peticion.onreadystatechange = function () {
    if (peticion.readyState == 4 && peticion.status == 201) {
      traerdatos();
      inicial();
    }
  };

  //Configura la peticion
  peticion.open("PUT", url, true);
  //Indico que la peticion recibe formato JSON
  peticion.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  //Hago un llamado o invoco la peticion
  peticion.send(objetoJSON);
}

function guardarBorrar() {

  let url = "http://localhost:8083/api/Game";
  let idDelete = document.getElementById("idDelete").value;
  let objetoPeticion = new XMLHttpRequest();

  objetoPeticion.onreadystatechange = function () {
    if (objetoPeticion.readyState == 4 && objetoPeticion.status == 204) {
      traerdatos();
      inicial();
    }
  };
  objetoPeticion.open("DELETE", url + "/" +idDeletegameIdModif, true);
  objetoPeticion.setRequestHeader("Content-Type","application/json;charset=UTF-8");
  objetoPeticion.send();
}

function traerdatos() {
  url = "http://localhost:8083/api/Game/all";
  let registros = "";
  let id = "";

  let xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let respuesta = JSON.parse(this.responseText);

      for (let i in respuesta) {
        id = respuesta[i].id;

        registros +=
          '<tr>\
              <th scope="row" style = "display:none">' + respuesta[i].id +"</th>\
              <td>" + respuesta[i].name +"</td>\
              <td>" + respuesta[i].year + "</td>\
              <td>" + respuesta[i].category.name + "</td>\
              <td>" + respuesta[i].developer + "</td>\
              <td>" + respuesta[i].description + '</td>\
              <td>\<button class="btn" style="background-color: #d3d45f" onclick="editar(' + id + ')">Modificar Juego</button>\
                  <button class="btn" style="background-color: #ef6b7a" onclick="eliminar(' + id + ')">Borrar Juego</button>\
              </td>\
            </tr>';
      }

      document.getElementById("registros").innerHTML = registros;

      inicial();
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}

function listarcategorias() {
    let url = "http://localhost:8083/api/Category/all";
    let categorias = document.getElementById("category");
    let respuesta = "";
    let xhttp = new XMLHttpRequest();
    let id = ""
  xhttp.onreadystatechange = function () {
    let opciones = "";
    if (this.readyState == 4 && this.status == 200) {
        respuesta = JSON.parse(this.responseText);
        
        for (let i in respuesta) {
            id = respuesta[i].id
            opciones += '<option value="' + respuesta[i].id + '">' + respuesta[i].name +"</option>";
        }
        document.getElementById("categoryIdModif").innerHTML = opciones
        categorias.innerHTML = opciones;
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}
