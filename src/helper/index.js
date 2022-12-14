const axios = require('axios')

module.exports = {
    traerGeneros: async () => {
        return await axios.get(`https://api.rawg.io/api/genres?key=9f66ff818d524f568275bc55ca2257c4`, { headers: { "Accept-Encoding": "gzip,deflate,compress" }, })
            .then(datos => datos.data.results.map(dato => ({ nombre: dato.name })))
    },
    traerJuegos: async () => {
        const paginaUno = await axios.get(`https://api.rawg.io/api/games?key=9f66ff818d524f568275bc55ca2257c4&page_size=40`, { headers: { "Accept-Encoding": "gzip,deflate,compress" }, })
            .then(ele => ele.data.results)
        const paginaDos = await axios.get(`https://api.rawg.io/api/games?key=9f66ff818d524f568275bc55ca2257c4&page_size=40&page=3`, { headers: { "Accept-Encoding": "gzip,deflate,compress" }, })
            .then(ele => ele.data.results)
        const paginaTres = await axios.get(`https://api.rawg.io/api/games?key=9f66ff818d524f568275bc55ca2257c4&page_size=20&page=4`, { headers: { "Accept-Encoding": "gzip,deflate,compress" }, })
            .then(ele => ele.data.results)
        return [...paginaUno, ...paginaDos, ...paginaTres].map(ele => ({
            id: ele.id,
            name: ele.name,
            background_image: ele.background_image,
            genres: ele.genres.map(gene => gene.name),
            platforms: ele.platforms.map(plat => plat.platform.name),
            rating: ele.rating,
        }))
    },
    traerJuego: async (id) => {
        const juego = await axios.get(`https://api.rawg.io/api/games/${id}?key=9f66ff818d524f568275bc55ca2257c4`, { headers: { "Accept-Encoding": "gzip,deflate,compress" }, })
        let arrayObj = [juego.data].map(ele => ({
            id: ele.id,
            name: ele.name,
            background_image: ele.background_image,
            genres: ele.genres.map(gen => gen.name),
            description_raw: ele.description_raw,
            released: ele.released,
            rating: ele.rating,
            platforms: ele.platforms.map(plat => plat.platform.name)
        }))
        return arrayObj[0]
    }
}