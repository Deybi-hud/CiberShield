const contenedorProductos = document.querySelector('#contenedor-productos');
const botonesCategoria = document.querySelectorAll('.boton-categoria');
const tituloPrincipal = document.querySelector('#titulo-principal');
const numerito = document.querySelector('.numerito');
let productosEnCarrito;

const productosEnCarritoLS = JSON.parse(localStorage.getItem("productos-en-carrito"));

if (productosEnCarritoLS) {
    productosEnCarrito = productosEnCarritoLS;
    actualizarNumerito();
} else {
    productosEnCarrito = [];
}

const productosArray = [
    {
        id: "Llave de seguridad USB-01",
        nombre: "Llave de seguridad USB",
        Imagen: "./assets/img/hardware/01.jpg",
        categoria: { nombre: "hardware", id: "hardware" },
        precio: 50000
    },
    {
        id: "Billetera anti RFID-01",
        nombre: "Billetera anti RFID",
        Imagen: "./assets/img/hardware/02.jpg",
        categoria: { nombre: "hardware", id: "hardware" },
        precio: 10000
    },
    {
        id: "Malwarebytes-01",
        nombre: "Malwarebytes",
        Imagen: "./assets/img/software/01.jpg",
        categoria: { nombre: "software", id: "software" },
        precio: 60000
    },
    {
        id: "ProtonVPN-01",
        nombre: "ProtonVPN",
        Imagen: "./assets/img/software/02.jpg",
        categoria: { nombre: "software", id: "software" },
        precio: 120000
    }
];

function cargarProductos(productosElegidos) {
    contenedorProductos.innerHTML = "";
    
    productosElegidos.forEach(producto => {
        const div = document.createElement('div');
        div.classList.add('producto');
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.Imagen}" alt="${producto.nombre}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.nombre}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
        `;
        contenedorProductos.append(div);
    });
    actualizarBotonesAgregar();
}

function actualizarBotonesAgregar() {
    const botonesAgregar = document.querySelectorAll('.producto-agregar');
    botonesAgregar.forEach(boton => {
        boton.addEventListener('click', agregarAlCarrito);
    });
}

function agregarAlCarrito(e) {
    const idBoton = e.currentTarget.id;
    const productoAgregado = productosArray.find(producto => producto.id === idBoton);
    
    const itemEnCarrito = productosEnCarrito.find(item => item.id === idBoton);

    if (itemEnCarrito) {
        itemEnCarrito.cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    actualizarNumerito();
}

function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}

botonesCategoria.forEach(boton => {
    boton.addEventListener('click', (e) => {
        botonesCategoria.forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        
        const categoriaSeleccionada = e.currentTarget.id;

        if (categoriaSeleccionada !== "todos") {
            const productosFiltrados = productosArray.filter(p => p.categoria.id === categoriaSeleccionada);
            cargarProductos(productosFiltrados);
        } else {
            cargarProductos(productosArray);
        }
    });
});

cargarProductos(productosArray);