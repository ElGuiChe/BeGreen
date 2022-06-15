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
console.log(document.getElementById("idCarrito"));


const renderCarrito = (array) => {
    for (let i = 0; i < carrito.length; i++) {
        let tr = document.createElement("tr")
        tr.innerHTML = `<th scope="row"><img class="imgCarrito" src="${carrito[i].imagen}" alt="${carrito[i].alt}"></th>
        <td>${carrito[i].nombre}</td>
        <td>$${carrito[i].precio}</td>`
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
            position: 'top-end',
            icon: 'warning',
            title: 'Tu carrito está vacio',
            showConfirmButton: false,
            timer: 2000
        });
    } else {
        localStorage.removeItem("carrito")
        carrito.splice(0, carrito.length);
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: '¡Gracias por tu compra!',
            showConfirmButton: false,
            timer: 2000
        });

    }
})