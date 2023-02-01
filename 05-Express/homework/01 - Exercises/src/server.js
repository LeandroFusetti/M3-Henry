const express = require("express");
const { mainRouter } = require("./routes");


//esta modularizado por eso no andan los tests

const server = express();

server.use(express.json());

server.use(mainRouter)




//NO MODIFICAR EL CODIGO DE ABAJO. SE USA PARA EXPORTAR EL SERVIDOR Y CORRER LOS TESTS
module.exports = { server };
