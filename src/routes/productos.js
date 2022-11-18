const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');


const Contenedor = require('../Contenedor')

const Productos = new Contenedor('productos')


router.get('/', async (_req, res, next) => {
    try{
        res.status(200).json(await Productos.getAll());
    }catch(err){
        next(err);
    }
})

router.get('/:id', async (req, res, next) => {
    try{
        const { id } = req.params
        res.status(200).json(await Productos.getById(id));
    }catch(err){
        next(err);
    }
})

router.post('/', async (req, res, next) => {
    try{
        const { body } = req
        body.timestamp = Date.now() / 1000
        body.uuid = uuidv4()
        await Productos.save(body);

        res.status(200).send('Guardado!')
    }catch(err){
        next(err);
    }
})

router.put('/:id', async (req, res, next) => {
    try{
        const { id } = req.params
        const { body } = req
        await Productos.updateById(body, id)
        res.status(200).send('Actualizado!')
    }catch(err){
        next(err);
    }
})

router.delete('/:id', async (req, res, next) => {
    try{
        const { id } = req.params
        await Productos.deleteById(id)
        res.status(200).send('Eliminado!')
    }catch(err){
        next(err);
    }
})

module.exports = router;