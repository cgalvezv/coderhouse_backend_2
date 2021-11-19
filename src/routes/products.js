const express = require('express');
const router = express.Router();

const products = require('../classes/Products');

//GET: Obtener todo el listado de productos
router.get('/productos', (req, res) => {
    const response = products.get();
    if (response.error) res.status(response.code).json({ error: response.msg });
    res.status(200).json(response);
})
//GET: Obtener un producto en específico, recibiendo el ID desde el uri
router.get('/productos/:id', (req, res) => {
    const { id } = req.params;
    const response = products.get(id);
    if (response.error) res.status(response.code).json({ error: response.msg });
    res.status(200).json(response);
})
//POST: Agregar un nuevo producto al listado de productos
router.post('/productos', (req, res) => {
    const { title, price, thumbnail } = req.body;
    const response = products.add(title, price, thumbnail)
    res.status(200).json(response);
})
//PUT: Agregar un nuevo producto al listado de productos
router.put('/productos/:id', (req, res) => {
    const { id } = req.params;
    const { title, price, thumbnail } = req.body;
    const response = products.edit(id, title, price, thumbnail)
    res.status(200).json(response);
})
//DELETE: Agregar un nuevo producto al listado de productos
router.delete('/productos/:id', (req, res) => {
    const { id } = req.params;
    const response = products.delete(id)
    res.status(200).json(response);
})

module.exports = router;