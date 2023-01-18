function recogeDatos(evento) {
    evento.preventDefault();
  
    let nombre = document.querySelector("#nombre").value;
    let fecha = document.querySelector("#fecha").value;
    let edad = 2022 - fecha;
  
    let bienvenida = document.querySelector("#bienvenida");
    let mensajeEdad1="Hola " + nombre + ". Tu compra se realizo con exito!";
    let mensajeEdad2="Hola " + nombre + ". No se pudo realizar la operacion<br> por que eres menor de edad.!";
    let mensajeError = "Alguno de los datos es incorrecto<br> vuelve a intentarlo!"
    let mensaje;
  
    if (edad > 18) {
      mensaje = mensajeEdad1;
    } else if (edad < 18) {
      mensaje = mensajeEdad2;
    } else {
      mensaje = mensajeError;
    }

    bienvenida.innerHTML = mensaje;
  }
  
  let miForm = document.querySelector("#formulario");
  
  miForm.addEventListener("submit", recogeDatos);
  