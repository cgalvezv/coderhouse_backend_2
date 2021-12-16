socket.on('messages', function(data) { 
    render(data);
});

function render(data) { 
    var html = data.map(function(elem, index){
        console.log(elem)
    return(`
            <div>
                <b style="color:blue;">${elem.email || 'Anónimo'}</b> 
                [<span style="color:brown;">${elem.fecha}</span>] : 
                <i style="color:green;">${elem.mensaje || 'Sin Mensaje'}</i>
            </div>
        `) 
    }).join(" "); 
    document.getElementById('messages').innerHTML = html; 
}
  
const userCentroMensajes = document.getElementById('user-input')
const textoCentroMensajes = document.getElementById('msj-input')
const botonCentroMensajes = document.getElementById('send-button')

function addMessage(e) { 
    var mensaje = { 
        author: userCentroMensajes.value, 
        fyh: getChatDate(),
        text: textoCentroMensajes.value
    }; 
    socket.emit('new-message', mensaje); 

    textoCentroMensajes.value = ''
    textoCentroMensajes.focus()

    botonCentroMensajes.disabled = true

    return false;
}

function getChatDate() {
    const dt = new Date();
    return `${dt.getDate().toString().padStart(2, '0')}/${
        (dt.getMonth()+1).toString().padStart(2, '0')}/${
        dt.getFullYear().toString().padStart(4, '0')} ${
        dt.getHours().toString().padStart(2, '0')}:${
        dt.getMinutes().toString().padStart(2, '0')}:${
        dt.getSeconds().toString().padStart(2, '0')}`;
}

userCentroMensajes.addEventListener('input', () => {
    let hayEmail = userCentroMensajes.value.length
    let hayTexto = textoCentroMensajes.value.length
    textoCentroMensajes.disabled = !hayEmail
    botonCentroMensajes.disabled = !hayEmail || !hayTexto
})

textoCentroMensajes.addEventListener('input', () => {
    let hayTexto = textoCentroMensajes.value.length
    botonCentroMensajes.disabled = !hayTexto
})