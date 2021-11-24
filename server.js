//Desafío 5 - Motores de plantilla - EJS
//author: Camilo Gálvez Vidal
const express = require('express');
const fetch = require('node-fetch');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// pongo a escuchar el servidor en el puerto indicado
const puerto = 8080;

// Arreglo que guarda información en relación a los inputs del formulario para agregar productos
const formIngresoProducto = [
    {
        title: 'Titulo',
        name: 'title',
        input_title: 'inputTitle'
    },
    {
        title: 'Precio',
        name: 'price',
        input_title: 'inputPrice'
    },
    {
        title: 'URL',
        name: 'thumbnail',
        input_title: 'inputThumbnail'
    },
];

// seteo el motor de plantilla
app.set('views', './src/views');
app.set('view engine', 'ejs');

//#region LOGICA MIDDLEWARE ERROR HANDLER
app.use((err, req, res, next) => {
    return res.status(500).send(`Error Servidor\n${JSON.stringify(err.message, null, 2)}`);
});
//#endregion

//#region LOGICA ROUTER
const router = require('./src/routes/products');
app.use('/api', router);

//#region HANDLEBAR INDEX IMPLEMENTATION
app.get('/productos/vista', async (req, res) => {
    const responseApi = await fetch(`http://localhost:${puerto}/api/productos`,{
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    })
    const objectResponseApi = JSON.parse(await responseApi.text());
    const data = objectResponseApi.error ? [] : objectResponseApi;
    res.render('get_products', { productos: data, hayProductos: data.length > 0 });
});

app.get('/', async (req, res) => {
    res.render('add_products', { inputs: formIngresoProducto });
});
//#region 

const server = app.listen(puerto, () => {
    console.log(`servidor escuchando en http://localhost:${puerto}`);
});

// en caso de error, avisar
server.on('error', error => {
    console.log('error en el servidor:', error);
});