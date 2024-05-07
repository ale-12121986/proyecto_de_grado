const express = require('express')

const routerTrabajo = express.Router()

var pool = require('../../mysql-connector');

routerTrabajo.get('/:id', function(req, res) {
    const id = req.params.id;
    console.log("el dato para consultar en la base de datos", id);
    const sqlQuery = 'SELECT idTrabajo, `fecha`, `via`, `ramal`, `progresivaInicial`, `progresivaFinal`, `linea` FROM `trabajo` WHERE `idbateadora` = ? ORDER BY fecha DESC;';

    pool.query(sqlQuery, [id], function(error, results)  {    
        if (error) {
            res.send(error).status(400);
            return;
        }
        console.log("el resultado es" +results);
        res.send(results).status(200);
    });
    // res.send({'mensaje':'Estoy en dispositivo'}).status(200)
})

routerTrabajo.post('/eliminar', function(req, res) {
    const id = req.body; 
    const sqlQuery = 'DELETE FROM `trabajo` WHERE `trabajo`.`idTrabajo` = ?'
    console.log("el dato para eliminar  en la base de datos", id.idTrabajo);
    pool.query(sqlQuery, [id.idTrabajo], function(error, results)  {    
        if (error) {
            res.send(error).status(400);
            return;
        }
        console.log("el resultado es" +results);
        res.send(results).status(200);
    });
})
module.exports = routerTrabajo