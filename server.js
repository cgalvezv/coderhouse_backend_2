//Desafío 6 - WebSockets (Chat)
//author: Camilo Gálvez Vidal
const express = require('express');

const app = express();

const http = require('http').Server(app);
// le pasamos la constante http a socket.io
const io = require('socket.io')(http);

// indicamos donde se encuentran los archivos estaticos
app.use(express.static('./public'));

const productos = [];
const messages = [];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// pongo a escuchar el servidor en el puerto indicado
const puerto = 8080;


app.get('/', (req, res) => {
    res.sendFile('index', { root: __dirname });
});

// cuando se realice la conexion, se ejecutara una sola vez
io.on('connection', socket => {
    io.sockets.emit('productos', productos)
    socket.on('productoSocket', ({ title, price, thumbnail }) => {
        productos.push({ id: socket.id, title, price, thumbnail });
        io.sockets.emit('productos', productos)
    })

    io.sockets.emit('messages', messages)
    socket.on('new-message', async ({ author, fyh, text }) => {
        const newMessage = { id: socket.id, author, fyh, text};
        messages.push(newMessage);
        io.sockets.emit('messages', messages)
    })
});

const server = http.listen(puerto, () => {
    console.log(`servidor escuchando en http://localhost:${puerto}`);
});


// en caso de error, avisar
server.on('error', error => {
    console.log('error en el servidor:', error);
});