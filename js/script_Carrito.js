//Declaración de variables
const carrito = []

//Declaración de clases y constructores
class Item {
    constructor(obj) {
        this.id = obj.id;
        this.nombre = obj.nombre;
        this.categoria = obj.categoria;
        this.precio = obj.precio;
        this.imagen = obj.imagen;
        this.alt = obj.alt;
        this.descripcion = obj.descripcion;
    }
}

//Recuperación de localStorage
if (localStorage.carrito !== undefined) {
    const storage = JSON.parse(localStorage.getItem("carrito"))
    for (const obj of storage)
        carrito.push(new Item(obj));
}


//Modificación del DOM - Carrito

let trID = document.getElementById("idCarrito");


const renderCarrito = (array) => {
    for (let i = 0; i < carrito.length; i++) {
        let tr = document.createElement("tr")
        tr.innerHTML = `<th scope="row"><img class="imgCarrito" src="${carrito[i].imagen}" alt="${carrito[i].alt}"></th>
        <td>${carrito[i].nombre}</td>
        <td class="precioCarrito"> ${carrito[i].precio}</td>`
        trID.append(tr);
    }
}

renderCarrito(carrito);

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
    }
})

//Conversor de Monedas - API

const APIKey = "6654f1f5e08fff1364de60e8"


let paises = {
    "Argentina": "ARS",
    "Colombia": "COP",
    "EEUU": "USD",
    "Venezuela": "VES",
}

let desplegableMoneda = document.getElementById("moneda")
let monto = document.querySelector("#moneda")
let montoDivisa = document.getElementsByClassName("precioCarrito")
console.log((montoDivisa[0]).innerText)
console.log(montoDivisa.length)

let prueba = document.getElementById("prueba")
console.log(prueba.innerText)

for (let pais in paises) {
    let moneda = paises[pais];
    let option = document.createElement("option")
    option.text = moneda;
    option.value = moneda;
    desplegableMoneda.appendChild(option);
}



async function cambiar() {
    let montoVal = moneda.value
    const URL = `https://v6.exchangerate-api.com/v6/${APIKey}/pair/CLP/${montoVal}`;
    try {
        let respuesta = await fetch(URL);
        let data = await respuesta.json();
        let tasaConversion = data.conversion_rate;
        console.log(tasaConversion)
        for(let i=0; i<montoDivisa.length; i++) {
        let regex = /[0-9]+/g
        let precioAnterior = montoDivisa[i].innerText.match(regex).join("")
        console.log(precioAnterior)
        let nuevoPrecio = tasaConversion * parseFloat(precioAnterior)
        console.log(nuevoPrecio)
        montoDivisa[i].innerText= parseInt(nuevoPrecio)
        
//console.log(precio1)
        }

    } catch (error) {
        alert("algo salio mal");
        console.log(error)
    }
}

monto.addEventListener("change", function(){
    cambiar()
})

