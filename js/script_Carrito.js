//Declaración de variables y funciones globales
const carrito = []
const carritoMonex = []

function addToLocalStorage (clave, valor){
    localStorage.setItem("carrito", JSON.stringify(carrito))
}

//Declaración de clases y constructores
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

//Recuperación de localStorage
function recuperar () {if (localStorage.carrito !== undefined) {
    const storage = JSON.parse(localStorage.getItem("carrito"))
    for (const obj of storage)
        carrito.push(new Producto(obj));
}}

recuperar();

//Modificación del DOM - Carrito

let trID = document.getElementById("idCarrito");

const renderCarrito = (array) => {
    for (let i = 0; i < carrito.length; i++) {
        let tr = document.createElement("tr")
        tr.innerHTML = `<td scope="row" class="col-2 text-center"><img class="imgCarrito" src="${carrito[i].imagen}" alt="${carrito[i].alt}"></td>
        <td class="col-3 text-center">${carrito[i].nombre}</td>
        <td class="precioCarrito col-3 text-center"> ${carrito[i].precio}</td>
        <td> <button type="button" id="${carrito[i].id}" class="btnMenos btn btn-dark text-center"> - </button></td>
        <td class="text-center">${carrito[i].cantidad}</td>
        <td> <button type="button" id="${carrito[i].id}" class="btnMas btn btn-dark text-center"> + </button> </td>
        <td> <button type="button" id="${carrito[i].id}" class="btnEliminar btn btn-dark text-center"> Eliminar </button></td>`
        trID.append(tr);
    }
}

renderCarrito(carrito);

//Botón cantidad mayor

const clickButtonMas = document.querySelectorAll (".btnMas");
clickButtonMas.forEach (btn=>{
    btn.addEventListener("click", carritoMas)
})

function carritoMas (e){
    e.preventDefault();
    const button = e.target.id;
    let a = carrito.find(nuevoItem=>nuevoItem.id === button)
    console.log(a)
    a.precio=a.precio/a.cantidad;
    a.cantidad++;
    a.precio = a.precio * a.cantidad;
    localStorage.clear();
    addToLocalStorage(carrito);
    location.reload();
}

//Botón cantidad menor

const clickButtonMenos = document.querySelectorAll (".btnMenos");
clickButtonMenos.forEach (btn=>{
    btn.addEventListener("click", carritoMenos)
})

function carritoMenos (e){
    e.preventDefault();
    const button = e.target.id;
    let a = carrito.find(nuevoItem=>nuevoItem.id === button)
    if(a.cantidad==1){
    carritoNuevo = carrito.filter((item) => item.id != a.id)
    console.log(carritoNuevo)
    carrito.splice(0, carrito.length);
    for (const obj of carritoNuevo){
        carrito.push(new Producto(obj));
    }
    localStorage.clear();
    addToLocalStorage(carrito);
    location.reload();
    }else{
    console.log(a)
    a.precio=a.precio/a.cantidad;
    a.cantidad--;
    a.precio = a.precio * a.cantidad;
    localStorage.clear();
    addToLocalStorage(carrito);
    location.reload();
}}

//Botón eliminar

const clickButtonEliminar = document.querySelectorAll (".btnEliminar");

clickButtonEliminar.forEach (btn=>{
    btn.addEventListener("click", carritoEliminar)
})

function carritoEliminar(e){
e.preventDefault()
const button = e.target.id;
console.log(button)
    let a = carrito.find(nuevoItem=>nuevoItem.id === button)
    console.log(a)
    carritoNuevo = carrito.filter((item) => item.id != a.id)
    console.log(carritoNuevo)
    carrito.splice(0, carrito.length);
    for (const obj of carritoNuevo){
        carrito.push(new Producto(obj));
    }
    localStorage.clear();
    addToLocalStorage(carrito);
    location.reload();
}

//Botones de compra y vaciado

const botonDelete = document.getElementById("carritoDelete");

botonDelete.addEventListener("click", (e) => {
    localStorage.clear();
    carrito.splice(0, carrito.length);
})

const botonBuy = document.getElementById("carritoBuy");

botonBuy.addEventListener("click", (e) => {
    e.preventDefault();
    if (carrito.length == 0) {
        Swal.fire({
            icon: 'warning',
            title: 'Tu carrito está vacio',
            showConfirmButton: false,
            timer: 2000
        });
    } else {
        localStorage.removeItem("carrito")
        carrito.splice(0, carrito.length);
        Swal.fire({
            icon: 'success',
            title: '¡Gracias por tu compra!',
            showConfirmButton: false,
            timer: 2000
        });
        asyncCall();

    }
})

function resolveAfter3Seconds() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('resolved');
      }, 3000);
    });
  }
  
  async function asyncCall() {
    const result = await resolveAfter3Seconds();
    location.reload();
  }


//Conversor de Monedas - API

const APIKey = "6654f1f5e08fff1364de60e8"

let paises = {
    "Argentina": "ARS",
    "Colombia": "COP",
    "USA": "USD",
    "Venezuela": "VES",
}

let banderas = {
    "CLP":"cl",
    "ARS": "ar",
    "COP": "co",
    "USD": "usa",
    "VES": "ve",
}

let desplegableMoneda = document.getElementById("moneda")
let monto = document.querySelector("#moneda")
let montoDivisa = document.getElementsByClassName("precioCarrito")
let bandera = document.getElementById("bandera")


for (let pais in paises) {
    let moneda = paises[pais];
    let option = document.createElement("option")
    option.text = moneda;
    option.value = moneda;
    desplegableMoneda.appendChild(option);
}


async function cambiarMoneda() {

    if (moneda.value != "CLP") {
        let monedaFin = moneda.value
        const URL = `https://v6.exchangerate-api.com/v6/${APIKey}/pair/CLP/${monedaFin}`;
        try {
            let respuesta = await fetch(URL);
            let data = await respuesta.json();
            let tasaConversion = data.conversion_rate;

            //
            console.log(tasaConversion)
            for (let i = 0; i < carrito.length; i++) {
                let precioAnterior = carrito[i].precio
                let precioNuevo = tasaConversion * precioAnterior
                carritoMonex.push(precioNuevo)
                montoDivisa[i].innerText = precioNuevo.toFixed(2)

            }
        } catch (error) {
            alert("algo salio mal");
            console.log(error)
        }
    } else {
        for (let i = 0; i < carrito.length; i++) {
            montoDivisa[i].innerText = carrito[i].precio
        }
    }
}

function cambiarBandera() {

    for (let bandera in banderas) {
        if (bandera == moneda.value) {
            let imagen = `https://www.countryflagsapi.com/png/${banderas[bandera]}`
            document.getElementById("bandera").src = imagen;
        }
    }
}


monto.addEventListener("change", function () {
    cambiarMoneda()
    cambiarBandera()
})