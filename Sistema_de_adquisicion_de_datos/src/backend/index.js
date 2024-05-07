//=======[ Settings, Imports & Data ]==========================================

var PORT    = 3000;

const cors = require('cors');

var express = require('express');
const bodyParser = require('body-parser'); // Importa el módulo body-parser
var app = express();
app.use(bodyParser.json()); // Agrega el middleware bodyParser.json()
var pool = require('./mysql-connector');
const routerRegistrar = require('./routes/registrar');
const routerTrabajo = require('./routes/trabajo');
const routerCargarTrabajo = require('./routes/cargar-trabajo');
const routerMedicion = require('./routes/medicion');
const routerMqtt = require('./routes/mqtt');
var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

const myLogger = function(req, res, next) {
    console.log('Logged')
    next()
}

const authenticator = function(req, res, next) {
    // si el usuario tiene permiso
    next()
    // si el usuario no tiene permiso
    res.send('No tenes permiso para acceder al recurso').status(401)
}

app.use(myLogger)
// to parse application/json
app.use(express.json()); 
// to serve static files
app.use(express.static('/home/node/app/static/'));
// to enable corss
app.use(cors(corsOptions));
app.use('/registrar', routerRegistrar); 
app.use('/trabajo', routerTrabajo);
app.use('/cargar-trabajo', routerCargarTrabajo);
app.use('/medicion', routerMedicion);

//=======[ Main module code ]==================================================

app.get('/', function(req, res, next) {
    res.send({'mensaje': 'Hola Mundo'}).status(200);
});

app.listen(PORT, function(req, res) {
    console.log("NodeJS API running correctly");
});

//=======[ End of file ]=======================================================
