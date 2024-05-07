const express = require('express')

const routerCargarTrabajo = express.Router()

var pool = require('../../mysql-connector');

routerCargarTrabajo.get('/', function(req, res) {
    const id = req.params.id;
    console.log("el dato para consultar en la base de datos", id);
    const sqlQuery = 'SELECT `linea` FROM `trabajo`GROUP BY linea HAVING COUNT(*)>1 UNION SELECT `linea` FROM `trabajo`GROUP BY linea HAVING COUNT(*)=1;';

    pool.query(sqlQuery, function(error, results)  {    
        if (error) {
            res.send(error).status(400);
            return;
        }
        console.log("el resultado es" +results);
        res.send(results).status(200);
    });
    // res.send({'mensaje':'Estoy en dispositivo'}).status(200)
})
routerCargarTrabajo.post('/datos', function(req, res) {
    
    const sqlQuery = "INSERT INTO trabajo( fecha, via, idbateadora, ramal, progresivaInicial, progresivaFinal, linea) VALUES (?, ?, ?, ?, ?, ?, ?)";
    valor = req.body;
    console.log("entro a preguntar si cargo a log con estos valores ", valor);
    const formattedFecha = new Date(valor.fecha).toISOString().slice(0, 19).replace('T', ' ');
    pool.query(sqlQuery, [formattedFecha, valor.via, valor.idBateadora, valor.ramal, valor.progresivaInicial, valor.progresivaFinal, valor.linea], function(error, results)  {    
        if (error) {
            res.send(error).status(400);
            return;
        }
        console.log("se cargo los datos");
        res.send();
    });
    //res.send({'mensaje':'Estoy en dispositivo'}).status(200)
})


module.exports = routerCargarTrabajo