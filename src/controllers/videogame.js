const { VideogameVal, GeneroVal } = require('../db.js')
const { traerJuegos, traerJuego } = require('../helper')

const mostrarTodo = async (req, res, next) => {
    const { name } = req.query
    try {
        let juegosApi = await traerJuegos();
        let juegos = await VideogameVal.findAll({
            include: [{ model: GeneroVal, attributes: ['nombre'], through: { attributes: [] } }]
        }).map(value => {
            let obj = {}
            for (let i in value) {
                if ([i] === "platforms") obj = { ...obj, [i]: JSON.parse(value[i]) }
                else obj = { ...obj, [i]: value[i] }
            }
        })
        let totalJuegos = juegos.concat(juegosApi)
        if (!name) {
            res.status(200).json(totalJuegos)
        } else {
            let arrayEnviar = []
            let i = 0;
            while (true) {
                if (arrayEnviar.length === 15) break
                if (i === totalJuegos.length - 1) break
                let arrayName = totalJuegos[i].name.split(" ").join("").toLowerCase()
                let busqueda = name.split(" ").join("").toLowerCase()
                if (arrayName.includes(busqueda)) {
                    arrayEnviar.push(totalJuegos[i])
                }
                i++
            }
            res.status(200).json(arrayEnviar)
        }
    } catch (error) {
        next(error)
    }
}

const mostrarUno = async (req, res, next) => {
    const { id } = req.params
    try {
        if (String(Number(id)) === "NaN") {
            let juego = await VideogameVal.findOne({
                where: { id: id },
                include: GeneroVal
            })
            res.status(200).json({ ...juego, platforms: JSON.parse(juego.platforms) })
        } else {
            let unJuego = await traerJuego(id)
            res.status(200).json({ ...unJuego, platforms: JSON.parse(juego.platforms) })
        }
    } catch (error) {
        next(error)
    }
}

const crearUno = async (req, res, next) => {
    let { name, background_image, platforms, genres, rating, released, description_raw } = req.body
    try {
        if (rating === '') rating = null;
        if (released === '') released = null;
        const newProject = await VideogameVal.create({
            name,
            background_image,
            platforms: JSON.stringify(platforms),
            rating,
            released,
            description_raw
        })
        const allGenres = await Val.findAll({ where: { nombre: genres } })
        newProject.addGenero(allGenres)
        res.status(201).json(`Juego ${newProject.dataValues.name} creado`)
    } catch (error) {
        next(error)
    }
}

const eliminarUno = async (req, res, next) => {
    const { id } = req.params
    try {
        let juegosApi = await traerJuegos();
        const nuevoArr = await VideogameVal.destroy({
            where: {
                id: id
            }
        })
        res.status(200).json(juegosApi.concat(nuevoArr))
    } catch (error) {
        next(error)
    }
}

module.exports = {
    mostrarTodo,
    mostrarUno,
    crearUno,
    eliminarUno
}