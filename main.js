// Lista de productos
const productosBase = [
    {name:"producto1", id:"1", cantidad:0, price:"210", color:"rojo"},
    {name:"producto2", id:"2", cantidad:0,  price:"20", color:"azul"},
    {name:"producto3", id:"3", cantidad:0, price:"70", color:"verde"},
    {name:"producto4", id:"4", cantidad:0, price:"300", color:"amarillo"},
    {name:"producto5", id:"5", cantidad:0, price:"150", color:"naranja"},
    {name:"producto6", id:"6", cantidad:0, price:"200", color:"violeta"},
]

let compra = JSON.parse(localStorage.getItem("compra"))|| []

const agregarCompra = (productoComprado)=>{
    // agrega productos al carrito
    compra.push(productoComprado)
    //compraTotalRender()
}

for(let i=1; i<(productosBase.length+1); i++){
    const descripcionPrecio = document.getElementById(`precio${i}`)
    descripcionPrecio.innerHTML=`$ ${productosBase[i-1].price}`

    const descripcionColor = document.getElementById(`color${i}`)
    descripcionColor.innerHTML=`${productosBase[i-1].color}`

    const btn = document.getElementById(`botonProducto${i}`)
    
    btn.addEventListener("click",(e)=>{
    e.preventDefault()

    const cantidadDeProductos = Number(document.getElementById(`contadorDeProductos${i}`).value)

    if(cantidadDeProductos>0){
        agregarCompra({name:productosBase[i-1].name, id:productosBase[i-1].id, price:productosBase[i-1].price, color:productosBase[i-1].color, cantidad:cantidadDeProductos})
        console.log(compra)
    }

    totalAPagar()

})
}

setInterval(()=>{
    fetch("https://criptoya.com/api/dolar")
    .then(response => response.json())
    .then(({blue}) => {
        valorDolar = blue
    })
    .catch(error => console.log("Error al cargar el valor del dolar"))
})

const totalAPagar = ()=>{
    let total = 0
    compra.forEach((elemento)=>{
        total += (elemento.price*elemento.cantidad)
    })
    const compraToralUSD = total/valorDolar
    const compraTotal = document.getElementById("precioFinal")
    compraTotal.innerHTML=`Precio total: $ ${total} o $ ${compraToralUSD.toFixed(2)} USD`
}