const express = require("express");
const cors = require("cors");
require("dotenv").config();
// "type": "module",

const app = express();

const router = require("./router");

app.use(cors());
app.use(express.json());
app.use(router);

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
