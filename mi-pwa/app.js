const productos = [
    { id: 1, nombre: 'Producto 1', precio: 120 },
    { id: 2, nombre: 'Producto 2', precio: 80 },
    { id: 3, nombre: 'Producto 3', precio: 70 },
    { id: 4, nombre: 'Producto 4', precio: 25 }
];
let carrito = [];

function renderMenu() {
    const menuContainer = document.getElementById('product-menu');
    productos.forEach(prod => {
        const btn = document.createElement('button');
        btn.className = 'product-btn';
        btn.innerHTML = `${prod.nombre}<br><b>$${prod.precio.toFixed(2)}</b>`;
        btn.onclick = () => agregarProducto(prod);
        menuContainer.appendChild(btn);
    });
}

function agregarProducto(producto) {
    const existe = carrito.find(item => item.id === producto.id);
    if (existe) existe.cantidad += 1;
    else carrito.push({ ...producto, cantidad: 1 });
    actualizarTicket();
}

function actualizarTicket() {
    const ticketList = document.getElementById('ticket-list');
    const totalAmount = document.getElementById('total-amount');
    const itemCount = document.getElementById('item-count');
    ticketList.innerHTML = '';
    
    if (carrito.length === 0) {
        ticketList.innerHTML = '<p style="color: #777; text-align: center;"><i>Toca un producto abajo para agregarlo</i></p>';
        totalAmount.innerText = '0.00';
        itemCount.innerText = '0 items';
        return;
    }

    let total = 0;
    let totalItems = 0;
    carrito.forEach(item => {
        const subtotal = item.precio * item.cantidad;
        total += subtotal;
        totalItems += item.cantidad;
        ticketList.innerHTML += `<div class="item-row">
            <div class="item-info"><span class="item-qty">${item.cantidad}x</span><span>${item.nombre}</span></div>
            <div><b>$${subtotal.toFixed(2)}</b></div>
        </div>`;
    });
    totalAmount.innerText = total.toFixed(2);
    itemCount.innerText = `${totalItems} items`;
}

// Funciones globales para que el HTML las encuentre
window.limpiarCuenta = () => { carrito = []; actualizarTicket(); };
window.procesarCobro = () => {
    if (carrito.length === 0) return alert("Agrega productos antes de cobrar.");
    alert(`¡Venta realizada!\nTotal cobrado: $${document.getElementById('total-amount').innerText}`);
    limpiarCuenta();
};

renderMenu();

// Registrar Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js');
    });
}
