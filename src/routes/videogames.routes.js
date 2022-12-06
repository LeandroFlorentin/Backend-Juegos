const { Router } = require('express');
const {
    mostrarTodo,
    mostrarUno,
    crearUno,
    eliminarUno
} = require('../controllers/videogame.js')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/', mostrarTodo)
router.get('/:id', mostrarUno)
router.post('/', crearUno)
router.delete('/:id', eliminarUno)

module.exports = router;