const express = require('express')

const routerMedicion = express.Router()

var pool = require('../../mysql-connector');


routerMedicion.get('/:buscar', function (req, res) {
    const valor = req.params.buscar;
    console.log("entro al back de medicion con el valor ",valor);
    const sqlQuery = "SELECT * FROM medicion WHERE idtrabajo2 = ?"

    pool.query(sqlQuery, [valor], function(error,results){
        if (error) {
            res.send(error).status(400);
            return;
        }
        console.log("el resultado es" +results);
        res.send(results).status(200);
    });
});




module.exports=routerMedicion;
    