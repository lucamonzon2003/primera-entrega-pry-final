const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');


const Contenedor = require('../Contenedor');

const Carrito = new Contenedor('carrito')

router.get('/:id/productos', async (req, res, next) => {
    try{
        const { id } = req.params
        const carrito = await Carrito.getById(id)
        res.status(200).json(carrito.productos)
    }catch(err){
        next(err)
    }
})

router.post('/', async (req, res, next) => {
    try{
        const { body } = req
        const carrito = {
            productos: [body],
            timestamp: Date.now() / 1000
        }
        const id = await Carrito.save(carrito)
        res.status(200).json({
            id: id
        })
    }catch(err){
        next(err)
    }
})

router.post('/:id/productos', async (req, res, next) => {
    try{
        const { id } = req.params
        const { body } = req
        const carrito = await Carrito.getById(id)
        carrito.productos.push(body)
        await Carrito.updateById(carrito, id)
        res.status(200).send('Producto incoporado!')
    }catch(err){
        next(err)
    }
})

router.delete('/:id', async (req, res, next) => {
    try{
        const { id } = req.params
        await Carrito.deleteById(id)
        res.status(200).send('Eliminado!')
    }catch(err){
        next(err)
    }
})

router.delete('/:id/productos/:id_prod', async (req, res, next) => {
    try{
        const { id } = req.params
        const { id_prod } = req.params
        const carrito = await Carrito.getById(id)
        const newData = []
        carrito.productos.forEach(i => {
            if(i.id != id_prod){
                newData.push(i)
            }
        });
        carrito.productos = newData;
        await Carrito.updateById(carrito, id);
        res.status(200).send('Producto eliminado');
    }catch(err){
        next(err)
    }
})

module.exports = router;