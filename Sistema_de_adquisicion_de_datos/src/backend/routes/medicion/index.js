const express = require('express')

const routerMedicion = express.Router()

var pool = require('../../mysql-connector');


routerMedicion.post('/buscar', function (req, res) {
    const valor = req.body;
    const sqlQuery = "SELECT distancia, alineacion, peralte, nivel_izquierdo, nivel_derecho FROM medicion WHERE idtrabajo2 = ? AND tipoMedicion =?"
    pool.query(sqlQuery, [valor.idMedicion, valor.tipoMedicion], function(error,results){
        if (error) {
            res.send(error).status(400);
            return;
        }
        console.log("el resultado es" +results);
        res.send(results).status(200);
    });
});


module.exports=routerMedicion;
    