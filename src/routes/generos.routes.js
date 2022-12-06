const { Router } = require('express');
const mostrarGeneros = require('../controllers/genero.js')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const routerGen = Router();

routerGen.get('/', mostrarGeneros)

module.exports = routerGen;