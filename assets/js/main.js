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
        id:"Llave de seguridaad USB-02",
        nombre:"Llave de seguridad USB 2",
        Imagen:"assets/img/hardware/01.jpg",
        categoria:{
            nombre:"hardware",
            id:"hardware"
        },
        precio: 50000
    },
    {
        id:"Billetera anti RFID-02",
        nombre:"Billetera anti RFID 3",
        Imagen:"assets/img/hardware/02.jpg",
        categoria:{
            nombre:"hardware",
            id:"hardware"
        },
        precio: 10000
    },
]


const contenedorProductos = document.querySelector('#contenedor-productos');

const botonesCategoria = document.querySelectorAll('.boton-categoria');

const tituloPrincipal = document.querySelector('#titulo-principal');

const botonAgregar = document.querySelectorAll('.producto-agregar');


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


