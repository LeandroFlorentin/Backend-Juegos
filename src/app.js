const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');
const { Genero } = require('./db.js')
const { traerGeneros } = require('./helper')
require('pg')

require('./db.js');

const server = express();


server.name = 'API';

server.use(express.json())
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

/* server.use('/', routes); */
server.get('/', async (req, res, next) => {
  try {
    const genero = await Genero.findAll()
    if (!genero.length) {
      let arrayGenero = await traerGeneros()
      const arrayNuevo = await Genero.bulkCreate(arrayGenero)
      const enviar = arrayNuevo.map(gen => gen.nombre)
      res.status(200).json(enviar)
    }
    else {
      const enviar = genero.map(gen => gen.nombre)
      res.status(200).json(enviar)
    }
  } catch (error) {
    next(error)
  }
})
// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
