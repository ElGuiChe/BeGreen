//Declaración de variables
const carrito = []

//Declaración de objetos y arrays (Productos)

class Entrada {
    constructor(id, nombre, categoria, precio, imagen, alt, descripcion, cantidad) {
        this.id = id;
        this.nombre = nombre;
        this.categoria = categoria;
        this.precio = precio;
        this.imagen = imagen;
        this.alt = alt;
        this.descripcion = descripcion;
        this.cantidad = cantidad;
    }
}

const entrada1 = new Entrada("e1", "Ceviche de camarón", "entrada", "5490", "./imagenes/Entradas/ceviche-camarones.jpg", "Ceviche de camaron", "Ácido y picaron", "1");
const entrada2 = new Entrada("e2", "Ensalada thai", "entrada", "3490", "./imagenes/Entradas/ensalada-thai.jpg", "Ensalada Thai", "Con quinoa 3 colores", "1");
const entrada3 = new Entrada("e3", "Tártaro de atún", "entrada", "8690", "./imagenes/Entradas/tartaro-atun.jpg", "Tártaro de atún","250g", "1");
const entrada4 = new Entrada("e4", "Carpaccio de salmón", "entrada", "4990", "./imagenes/Entradas/carpaccio-salmon.jpg", "Carpaccio de salmón","100g", "1");

class Panaderia {
    constructor(id, nombre, categoria, precio, imagen, alt, descripcion, cantidad) {
        this.id = id;
        this.nombre = nombre;
        this.categoria = categoria;
        this.precio = precio;
        this.imagen = imagen;
        this.alt = alt;
        this.descripcion = descripcion;
        this.cantidad = cantidad;
    }
}

const panaderia1 = new Panaderia("p1", "Baguette", "panaderia", "890", "./imagenes/Panadería/baguette.jpg", "Ceviche de camaron", "160g", "1");
const panaderia2 = new Panaderia("p2", "Baguette aceitunas negras", "panaderia", "890", "./imagenes/Panadería/baguette-aceitunas.jpg", "Baguette con aceitunas", "160g", "1");
const panaderia3 = new Panaderia("p3", "Pan integral", "panaderia", "3290", "./imagenes/Panadería/integral.jpg", "Pan integral","600g", "1");
const panaderia4 = new Panaderia("p4", "Ciabatta", "panaderia", "690", "./imagenes/Panadería/ciabatta.jpg", "Pan ciabatta","180g", "1");

const entradas = [entrada1, entrada2, entrada3, entrada4];
const panaderias = [panaderia1, panaderia2, panaderia3, panaderia4];
const productos = [entradas, panaderias];

//Modificación del DOM - Añade las cards

let divID = document.getElementById("productosEntradas");

let divID2 = document.getElementById("productosPanaderia");

const renderEntradas = (array) => {
    for (const Entrada of entradas) {
        let div = document.createElement("div")
        div.className = "card card2 col-md-3 mt-2"
        div.style.width = "18rem"
        div.innerHTML = `<img src="${Entrada.imagen}" class="card-img-top card-img-top2"
        alt="${Entrada.alt}">
        <div class="card-body">
            <h5 class="card-title card-title2 mt-2">${Entrada.nombre}</h5>
            <p class="card-text card-text2">${Entrada.descripcion}</p>
            <hr>
        <div class="container">
            <div id="entrada${Entrada.id}" class="row align-items-baseline">
            <p class="col-5 precio">$${Entrada.precio}</p>
            <a href="" id="${Entrada.id}" class="col-7 btn btn-dark btn2">AGREGAR <i class="bi bi-basket"></i></a>
            </div>
        </div>
        </div>
        </div>`
        divID.append(div);
    }
}

const renderPanaderias = (array) => {
    for (const Panaderia of panaderias) {
        let div = document.createElement("div")
        div.className = "card card2 col-md-3 mt-2"
        div.style.width = "18rem"
        div.innerHTML = `<img src="${Panaderia.imagen}" class="card-img-top card-img-top2"
        alt="${Panaderia.alt}">
        <div class="card-body">
            <h5 class="card-title card-title2 mt-2">${Panaderia.nombre}</h5>
            <p class="card-text card-text2">${Panaderia.descripcion}</p>
            <hr>
        <div class="container">
            <div class="row align-items-baseline">
            <p class="col-5 precio">$${Panaderia.precio}</p>
            <a id="${Panaderia.id}" class="col-7 btn btn-dark btn2">AGREGAR <i class="bi bi-basket"></i></a>
            </div>
        </div>
        </div>
        </div>`
        divID2.append(div);
    }
}

renderEntradas(entradas);
renderPanaderias(panaderias);

//Operaciones de Carrito

const Clickbutton = document.querySelectorAll (".btn2");
Clickbutton.forEach (btn=>{
    btn.addEventListener("click", addCarrito)
})

let item = {
    id:"A0",
}

function addCarrito (e){
    e.preventDefault();
    const button = e.target.id;
    console.log(button);
    const nuevoItem = entradas.find (entradas => entradas.id === button) || panaderias.find (panaderias => panaderias.id === button);
    let a = carrito.find(nuevoItem=>nuevoItem.id === button)
    if (a==undefined){
        console.log(item.id)
    }else{
        item=a
        console.log(item.id)
    }

if(item.id!=nuevoItem.id){
    carrito.push(nuevoItem)
    addToLocalStorage(carrito);
    Toastify({
        text: "Hemos agregado " + nuevoItem.nombre + " a tu carrito",
        duration: 3000,
        destination: "./carrito.html",
        newWindow: false,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "#bada55",
        },
      }).showToast();
}else{
    localStorage.clear();
    item.precio = item.precio/item.cantidad
    item.cantidad++
    console.log(item.cantidad)
    item.precio = item.precio * item.cantidad 
    console.log("nuevo precio" + nuevoItem.precio)
    console.log("precio" + item.precio)
    addToLocalStorage(carrito)
    Toastify({
        text: "Hemos agregado " + nuevoItem.nombre + " a tu carrito",
        duration: 3000,
        destination: "./carrito.html",
        newWindow: false,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "#bada55",
        },
      }).showToast();
}
}
    

function addToLocalStorage (clave, valor){
    localStorage.setItem("carrito", JSON.stringify(carrito))
}

class Producto {
    constructor(obj) {
        this.id = obj.id;
        this.nombre = obj.nombre;
        this.categoria = obj.categoria;
        this.precio = obj.precio;
        this.imagen = obj.imagen;
        this.alt = obj.alt;
        this.descripcion = obj.descripcion;
        this.cantidad =obj.cantidad;
    }
}

window.onload = function() {
if (localStorage.carrito !== undefined) {
    const storage = JSON.parse(localStorage.getItem("carrito"))
    for (const obj of storage)
        carrito.push(new Producto(obj));
}}

