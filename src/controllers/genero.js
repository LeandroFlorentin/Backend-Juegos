const { GeneroVal } = require('../db.js')
const { traerGeneros } = require('../helper')

const mostrarGeneros = async (req, res, next) => {
    try {
        const genero = await GeneroVal.findAll()
        if (!genero.length) {
            let arrayGenero = await traerGeneros()
            const arrayNuevo = await GeneroVal.bulkCreate(arrayGenero)
            res.status(200).json(arrayNuevo.map(gen => gen.nombre))
        }
        else {
            res.status(200).json(genero.map(gen => gen.nombre))
        }
    } catch (error) {
        next(error)
    }
}

module.exports = mostrarGeneros;