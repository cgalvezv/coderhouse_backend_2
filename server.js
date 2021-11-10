const File = require('./src/classes/File.js');
const http = require('http');
const express = require('express');

const app = express();
const PORT = 8080;
const filePath = './productos.txt';

const file = new File(filePath)
app.get('/productos', async (req, res) => {
    const allProducts = await file.getAll();
    res.json(allProducts)
})

app.get('/productoRandom', async (req, res) => {
    const randomProduct = await file.getRandom();
    res.send(randomProduct)
})

// pongo a escuchar el servidor en el puerto indicado
const server = app.listen(PORT, () => {
    console.log(`servidor escuchando en http://localhost:${PORT}`);
});

// Manejo de errores
server.on('error', error => {
    console.error('error en el servidor:', error);
});

