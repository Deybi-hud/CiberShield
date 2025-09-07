const productosArray = [
    {
        id:"Llave de seguridad USB-01",
        nombre:"Llave de seguridad USB",
        Imagen:"assets/img/hardware/01.jpg",
        categoria:{
            nombre:"hardware",
            id:"hardware"
        },
        precio: 50000
    },
    {
        id:"Billetera anti RFID-01",
        nombre:"Billetera anti RFID",
        Imagen:"assets/img/hardware/02.jpg",
        categoria:{
            nombre:"hardware",
            id:"hardware"
        },
        precio: 10000
    },
    {
        id:"Malwarebyte-01",
        nombre:"Malwarebyte",
        Imagen:"assets/img/software/01.jpg",
        categoria:{
            nombre:"software",
            id:"software"
        },
        precio: 50000
    },
    {
        id:"ProtonVPN-01",
        nombre:"ProtonVPN",
        Imagen:"assets/img/software/02.jpg",
        categoria:{
            nombre:"software",
            id:"software"
        },
        precio: 120000
    },
]


const contenedorProductos = document.querySelector('#contenedor-productos');

const botonesCategoria = document.querySelectorAll('.boton-categoria');

const tituloPrincipal = document.querySelector('#titulo-principal');

let botonAgregar = document.querySelectorAll('.producto-agregar');

const numerito = document.querySelector('#numerito');


function cargarProductos(productosElegidos){

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {

        const div = document.createElement('div');

        div.classList.add('productos');
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.Imagen}" alt="${producto.nombre}" width="200px">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.nombre}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar al carrito</button>
            </div>
        `;

        contenedorProductos.append(div);
    })

        actualizarBotonesAgregar();
}


cargarProductos(productosArray);

botonesCategoria.forEach(boton => {
    boton.addEventListener('click', (e) => {

        botonesCategoria.forEach(boton => boton.classList.remove('active'));
        e.currentTarget.classList.add('active');

        if(e.currentTarget.id != "todos"){
            const productosBoton = productosArray.filter(producto => producto.categoria.id === e.currentTarget.id);
            if(productosBoton.length > 0){
                tituloPrincipal.innerText = productosBoton[0].categoria.nombre;
            } else {
                tituloPrincipal.innerText = "Sin productos";
            }
            cargarProductos(productosBoton);   
        }
        else{
            tituloPrincipal.innerText = "Todos los productos";
            cargarProductos(productosArray);
        }

    })
})


function actualizarBotonesAgregar(){

    botonAgregar = document.querySelectorAll('.producto-agregar');

    botonAgregar.forEach(boton => {
        boton.addEventListener('click', agregarAlCarrito);
    });

}

const productosEnCarrito = []; 

function agregarAlCarrito(e){

    const idBoton = e.currentTarget.id;
    const productosAgregado = productosArray.find(producto => producto.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)){
        productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosAgregado[index].cantidad++;    
    }

    else{
        productosAgregado.cantidad = 1;
        productosEnCarrito.push(productosAgregado);   
    }
    actualizarNumeroCarrito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

}


function actualizarNumeroCarrito(){
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;

}