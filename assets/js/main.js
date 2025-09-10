const contenedorProductos = document.querySelector('#contenedor-productos');
const botonesCategoria = document.querySelectorAll('.boton-categoria');
const tituloPrincipal = document.querySelector('#titulo-principal');
const numerito = document.querySelector('.numerito');
let productosArray = [];
let productosEnCarrito;


fetch('./assets/js/productos.json')
    .then(response => response.json())
    .then(data => {
        productosArray = data;
        cargarProductos(productosArray);

        const productosEnCarritoLS = JSON.parse(localStorage.getItem("productos-en-carrito"));
        if (productosEnCarritoLS) {
            productosEnCarrito = productosEnCarritoLS;
            actualizarNumerito();
        } else {
            productosEnCarrito = [];
        }
    });

function cargarProductos(productosElegidos) {
    contenedorProductos.innerHTML = "";
    
    productosElegidos.forEach(producto => {
        const div = document.createElement('div');
        div.classList.add('producto');
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.nombre}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.nombre}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <p class="producto-descripcion">${producto.descripcion}</p>
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