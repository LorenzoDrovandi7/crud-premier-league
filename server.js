const express = require("express");
const puerto = 8080;
const app = express();

app.get("/", (req, res) => {
  res.end("Hola Mundo desde Express");
});

app.listen(puerto);
console.log(`Servidor escuchando en el puerto ${puerto}`);
