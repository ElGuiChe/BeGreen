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
    const storage = JSON.parse(localStorage.getItem("carrito"))
    for (const obj of storage)
    carrito.push (new Item (obj));


//Modificación del DOM - Carrito

let trID = document.getElementById("idCarrito");
console.log(document.getElementById("idCarrito"));


const renderCarrito = (array) => {
    for (let i = 0; i < carrito.length; i++) {
        let tr = document.createElement("tr")
        tr.innerHTML = `<th scope="row"><img class="imgCarrito" src="${carrito[i].imagen}" alt="${carrito[i].alt}"></th>
        <td>${carrito[i].nombre}</td>
        <td>$${carrito[i].precio}</td>`
        console.log(i)
        trID.append(tr);
    }
}

renderCarrito(carrito);