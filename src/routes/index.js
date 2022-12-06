const { Router } = require('express');
const videoGamesRoute = require('./videogames.routes.js')
const generosRoute = require('./generos.routes.js')
const router = Router()

router.use('/videogames', videoGamesRoute)
router.use('/genres', generosRoute)

module.exports = router;
