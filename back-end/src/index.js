const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

const app = express();
const server = require("http").Server(app); // dando acesso ao protocolo HTTP para nossa API
const io = require("socket.io")(server); // fazendo nossa API aceitar conexões WebSocket

mongoose.connect(
  "mongodb+srv://dev:123321@cluster0-n1cbc.mongodb.net/test?retryWrites=true&w=majority",
  {
    useNewUrlParser: true
  }
);

app.use((req, res, next) => {
  // deixando que todas nossas rotas tenho acesso ao [io]
  req.io = io;
  next();
});

app.use(cors());

app.use(
  // rota para retornar nossos arquivos estaticos, em nosso caso as imagens
  "/files",
  express.static(path.resolve(__dirname, "..", "uploads", "resized"))
);

app.use(require("./routes"));

server.listen(3333);
