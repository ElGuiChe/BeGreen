//Declaración de objetos y arrays (Productos)

class Entrada {
    constructor(id, nombre, categoria, precio, imagen, alt, descripcion) {
        this.id = id;
        this.nombre = nombre;
        this.categoria = categoria;
        this.precio = precio;
        this.imagen = imagen;
        this.alt = alt;
        this.descripcion = descripcion;
    }
}

const entrada1 = new Entrada(1, "Ceviche de camarón", "entrada", "5.490", "./imagenes/Entradas/ceviche-camarones.jpg", "Ceviche de camaron", "Ácido y picaron");
const entrada2 = new Entrada(2, "Ensalada thai", "entrada", "3.490", "./imagenes/Entradas/ensalada-thai.jpg", "Ensalada Thai", "Con quinoa 3 colores");
const entrada3 = new Entrada(3, "Tártaro de atún", "entrada", "8.690", "./imagenes/Entradas/tartaro-atun.jpg", "Tártaro de atún","250g");
const entrada4 = new Entrada(4, "Carpaccio de salmón", "entrada", "4.990", "./imagenes/Entradas/carpaccio-salmon.jpg", "Carpaccio de salmón","100g");

class Panaderia {
    constructor(id, nombre, categoria, precio, imagen, alt, descripcion) {
        this.id = id;
        this.nombre = nombre;
        this.categoria = categoria;
        this.precio = precio;
        this.imagen = imagen;
        this.alt = alt;
        this.descripcion = descripcion;
    }
}

const panaderia1 = new Panaderia(1, "Baguette", "panaderia", "890", "./imagenes/Panadería/baguette.jpg", "Ceviche de camaron", "160g");
const panaderia2 = new Panaderia(2, "Baguette aceitunas negras", "panaderia", "890", "./imagenes/Panadería/baguette-aceitunas.jpg", "Baguette con aceitunas", "160g");
const panaderia3 = new Panaderia(3, "Pan integral", "panaderia", "3.290", "./imagenes/Panadería/integral.jpg", "Pan integral","600g");
const panaderia4 = new Panaderia(4, "Ciabatta", "panaderia", "690", "./imagenes/Panadería/ciabatta.jpg", "Pan ciabatta","180g");

const entradas = [entrada1, entrada2, entrada3, entrada4];
const panaderias = [panaderia1, panaderia2, panaderia3, panaderia4];
const productos = [entradas, panaderias];

//Modificación del DOM

let divID = document.getElementById("productosEntradas");
console.log(divID);

let divID2 = document.getElementById("productosPanaderia");
console.log(divID2);

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
            <div class="row align-items-baseline">
            <p class="col-5 precio">$${Entrada.precio}</p>
            <a href="" class="col-7 btn btn-dark btn2">AGREGAR <i class="bi bi-basket"></i></a>
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
            <a href="" class="col-7 btn btn-dark btn2">AGREGAR <i class="bi bi-basket"></i></a>
            </div>
        </div>
        </div>
        </div>`
        divID2.append(div);
    }
}


renderEntradas(Entrada);
renderPanaderias(Panaderia);

