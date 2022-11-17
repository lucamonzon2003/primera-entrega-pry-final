const express = require('express');
require ('dotenv').config();

const errorHandler = require('./middlewares/errorHandler');
const router = require('./routes/index.routes');

const app = express()

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api',router);


app.get('/health', (_req, res, next) => {
    try{
        res.status(200).json({
        succes: true,
        enviroment: process.env.ENVIROMENT,
        health: 'Up!'
    })}catch(err){
        next(err)
    }
});

app.use(errorHandler);

module.exports = app;