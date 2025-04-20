const http = require("http");

const puerto = 8080;

const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end("<h1>Hola Mundo</h1>");
});

console.log(`Servidor escuchando en el puerto ${puerto}`);
server.listen(puerto);
