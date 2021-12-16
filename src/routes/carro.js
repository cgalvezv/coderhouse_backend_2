const express = require('express');
const routerCarro = express.Router();

const carro = require('../api/carro');
carro.init();

//POST: Crea un carrito y devuelve su ID
routerCarro.post('/', (req, res) => {
    const response = carro.add();
    res.status(200).json(response);
})
//DELETE: Vacía un carrito y lo elimina
routerCarro.delete('/:id', (req, res) => {
    const { id } = req.params;
    const response = carro.delete(id);
    if (response.error) res.status(response.codigo).json({ error: -1, descripcion: response.descripcion });
    res.status(200).json(response);
})
//GET: Lista los productos guardados en un carrito
routerCarro.get('/:id/productos', (req, res) => {
    const { id } = req.params;
    const response = carro.getProducts(id);
    if (response.error) res.status(response.codigo).json({ error: -1, descripcion: response.descripcion });
    res.status(200).json(response);
})
//POST: Agregar productos al carrito, en base al ID del producto
routerCarro.post('/:id/productos/:id_productos', (req, res) => {
    const { id, id_productos } = req.params;
    console.log(id_productos.split('_'))
    const response = carro.addProducts(id, id_productos.split('_'));
    if (response.error) res.status(response.codigo).json({ error: -1, descripcion: response.descripcion });
    res.status(200).json(response);
})

//DELETE: Elimina un producto en base a un carrito dado
routerCarro.delete('/:id/productos/:id_producto', (req, res) => {
    const { id, id_producto } = req.params;
    const response = carro.deleteProduct(id, id_producto);
    if (response.error) res.status(response.codigo).json({ error: -1, descripcion: response.descripcion });
    res.status(200).json(response);
})

module.exports = routerCarro;