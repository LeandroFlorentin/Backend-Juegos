const { traerGeneros } = require('../helper')
const { Genero } = require('../db.js')

module.exports = async () => {
    let generos = await traerGeneros()
    Genero.bulkCreate(generos)
}