function recogeDatos(evento) {
    evento.preventDefault();
  
    let nombre = document.querySelector("#nombre").value;
    let fecha = document.querySelector("#fecha").value;
    let edad = 2022 - fecha;
  
    let bienvenida = document.querySelector("#bienvenida");
    let mensajeEdad1="Hola " + nombre + ". Tu compra se realizo con exito!";
    let mensajeError = "Alguno de los datos es incorrecto<br> ó no eres mayor para realizar la compra. <br>"
    let mensaje;
 //USO DE OPERADOR AVANZADO (TERNARIO) y setTimeout para imprimir el mensaje
    (edad > 18) ? mensaje = mensajeEdad1 : mensaje = mensajeError;
    setTimeout(() => {
      bienvenida.innerHTML = mensaje;
      }, 2000);
   
  }
  
  let miForm = document.querySelector("#formulario");
  
  miForm.addEventListener("submit", recogeDatos);

  