
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
const contenedor = document.querySelector("#contenedor");
const carritoContenedor = document.querySelector("#carritoContenedor");
const vaciarCarrito = document.querySelector("#vaciarCarrito");
const recargarPagina = document.querySelector("#recargarPagina");
const formulario = document.querySelector('#procesar-pago')
const procesarCompra = document.querySelector("#procesarCompra");
const totalProceso = document.querySelector("#totalProceso");
const precioTotal = document.querySelector("#precioTotal");


//creo los atributos de cada elemento del array 
const stockLibros = [
    {
      id: 1,
      nombre: "Harry Potter <br> y la Orden del Fenix",
      cantidad: 1,
      desc: "J. k. Rowling",
      precio: 6500,
      img: "img/harry.jpg",
    },
    {
      id: 2,
      nombre: "El Señor de los Anillos <br> las dos Torres",
      cantidad: 1,
      desc: "J. R. R. Tolkien",
      precio: 5600,
      img: "img/anillo.jpg",
    },
    {
      id: 3,
      nombre: "Las Cronicas de Narnia <br> el leon, la bruja y el ropero",
      cantidad: 1,
      desc: " C. S. Lewis ",
      precio: 4700,
      img: "img/narnia.jpg",
    },
  ]; 
 
//pinto con el inner.html los elementos en la pagina tomando sus atributos a traves del forEach
stockLibros.forEach((prod) => {
    const { id, nombre, precio, desc, img, cantidad } = prod;
    if (contenedor) {
      contenedor.innerHTML += `
      <div class="card mt-3" style="width: 18rem; text-align:center; margin-left:13rem;">
      <img class="card-img-top mt-2" src="${img}" alt="Card image cap">
      <div class="card-body">
        <h5 class="card-title">${nombre}</h5>
        <p class="card-text">Precio: $${precio}</p>
        <p class="card-text">Autor: ${desc}</p>
        <p class="card-text">Cantidad: ${cantidad}</p>
        <button class="btn btn-primary" onclick="agregarProducto(${id})" style="background-color:rgb(46, 232, 30)">Comprar</button>
      </div>
    </div>
      `;
    }
  });

  
  //a traves de la validacion if agrego productos individuales con push ó cantidad del mismo producto
function agregarProducto(id) {
  const existe = carrito.some(prod => prod.id === id);

  if (existe) {
    const prod = carrito.map(prod => {
      if (prod.id === id) {
        prod.cantidad++;
      }
    });
  } else {
    const item = stockLibros.find((prod) => prod.id === id);
    carrito.push(item);
  }
  mostrarCarrito();

}   

  //con el evento click genero nuevamente el array del carrito vacio
if (vaciarCarrito) {
  vaciarCarrito.addEventListener("click", () => {
    carrito.length = [];
    mostrarCarrito();
  });
}

//detalles de los productos que se muestran en el carrito
const mostrarCarrito = () => {
  const modalBody = document.querySelector(".modal .modal-body");
  if (modalBody) {
    modalBody.innerHTML = "";
    carrito.forEach((prod) => {
      const { id, nombre, precio, desc, img, cantidad } = prod;
      modalBody.innerHTML += `
      <div class="modal-contenedor";>
        <div>
        <img class="img-fluid img-carrito" src="${img}"/>
        </div>
        <div>
        <p>Producto: ${nombre}</p>
      <p>Precio: $${precio}</p>
      <p>Cantidad :${cantidad}</p>
      <button class="btn btn-danger"  onclick="eliminarProducto(${id})">Eliminar</button>
        </div>
      </div>
      
      `;
    });
  }
//pinto en el div(modal) "el carrito esta vacio"
  if (carrito.length === 0) {
    modalBody.innerHTML = `
    <p class="text-center text-primary parrafo"; style=font-size:1.5rem;">El carrito esta vacio</p>
    `;
  }
  carritoContenedor.textContent = carrito.length;

  //promesa con uso de async await junto al metodo setTimeout para que al apretar el boton de continuar compra
// me redirija a la pagina de compra o me avise que no hay productos
let error= "error";
new Promise((_resolve,_reject)=>{
    
})
const compra = () => {
    return new Promise((resolve, reject) =>{
        if (compra) {
        procesarCompra.addEventListener("click", () => {
            if (carrito.length !== 0) {
            setTimeout(() => {
            resolve(location.href ="compra.html");
              }, 2000);
  }else{
    setTimeout(() => {
    reject(error);
  }, 1300);
  }});
  }},)} 

async function compraData() {
    try {
        const dataCompra = await compra();
    }catch(err) {
      Swal.fire({
        icon: 'error',
        title: 'No hay productos en el carrito',
        text: 'por favor compra algo!',
        footer: '<a href="">Ayuda</a>'
      })
    }
  }
compraData(); 

  //el total arranca en $0 hasta que sumemos productos
  if (precioTotal) {
    precioTotal.innerText = carrito.reduce(
      (acc, prod) => acc + prod.cantidad * prod.precio,
       0
      );
  }

  guardarStorage();
};


// al recargar la pagina los productos no se borran, siguen en el carrito
// gracias a los datos almacenados en localStorage
if (recargarPagina) {
  recargarPagina.addEventListener("click", procesarPedido);
}
document.addEventListener("DOMContentLoaded", () => {
  carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  mostrarCarrito();
});

//guardo el dato de los elementos creados que se iran agregando al carrito
function guardarStorage() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

//darle funcionalidad al boton eliminar 
function eliminarProducto(id) {
  const libroId = id;
  carrito = carrito.filter((libro) => libro.id !== libroId);
  mostrarCarrito();
}
//Funcion para la suma del precio de cada producto
function procesarPedido() {
  carrito.forEach((prod) => {
    const listaCompra = document.querySelector("#lista-compra tbody");
    const { id, nombre, precio, img, cantidad } = prod;
    if (listaCompra) {
      const row = document.createElement("tr");
      row.innerHTML += `
              <td>
              <img class="img-fluid img-carrito" src="${img}"/>
              </td>
              <td>${nombre}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td><b>$${precio * cantidad}</b></td>
            `;
      listaCompra.appendChild(row);
    }
  });
  totalProceso.innerText = carrito.reduce(
    (acc, prod) => acc + prod.cantidad * prod.precio,
    0
  );
}


//USO DE FETCH para retornar en la pagina datos almacenados en el LOCAL.JSON con el boton "Libros mas vendidos del Año"
document.getElementById('jsonBtn').addEventListener('click', cargarJSON);

function cargarJSON() {
fetch('./js/local.json')
  .then(function(res){
    return res.json();
  })
  .then(function(data){
    let html = '';
    data.forEach(function(librosPopulares){
      html += `
      <li>${librosPopulares.nombre} ${librosPopulares.desc} ${librosPopulares.precio}</li>
      `;
    })
    document.getElementById('resultado').innerHTML = html;
  })
}




