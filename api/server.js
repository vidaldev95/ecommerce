//Pacotes
const compression = require("compression");
const express = require("express");
const ejs = require("ejs");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");

//Start
const app = express();

//Ambiente
const isProduction =  process.env.NODE_ENV === "production";
const PORT = process.env.PORT || 3000;

// Arquivos estaticos
app.use("/public", express.static(__dirname + "/public"))
app.use("/public/images", express.static(__dirname + "/public/images"))

//Setuo MongoDB
const dbs = require("./config/database");
const dbURI = isProduction ? dbs.dbProduction : dbs.dbTest;
mongoose.connect(dbURI, {useNewUrlParser: true});

//Setup EJS
app.set("view engine", "ejs");

//Configurações
if(!isProduction) app.use(morgan("dev"));
app.use(cors());
app.disable('x-powered-by');
app.use(compression());

//Setup body parser
app.use(bodyparser.urlencoded({extended: false, limit: 1.5*1024*1024}));
app.use(bodyparser.json({limit: 1.5*1024*1024}))

//Models
require("./models");

//Rotas
app.use("/", require("./routes"));

//404 - rota
app.use((req, res, next) => {
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
});

//Rota demais erros
app.use((req, res, next) => {
    res.status(err.status || 500);
    if(err.status !== 404) console.warn("Error: ", err.message, new Date());
    res.json(err);
});

//Listen
app.listen(PORT, (err) => {
    if(err) throw err;
    console.log(`Rodando na //localhost:${PORT}`);
});