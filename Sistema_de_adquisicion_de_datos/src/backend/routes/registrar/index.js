const express = require('express')

const routerRegistrar = express.Router()

var pool = require('../../mysql-connector');

routerRegistrar.get('/', function(req, res) {   
    console.log("entre en backend");
    pool.query('SELECT * FROM bateadora', function(err, result, fields) {
        if (err) {
            res.send(err).status(400);
            return;
        }
        console.log("resultado ", result);
        res.send(result);
    });
    //res.send({'mensaje':'Estoy en registrar'}).status(200)
})
routerRegistrar.post('/datos',function(req,res){
    console.log("Entro a insertar");
    var parametros= req.body;
    const sqlQuery = 'INSERT INTO bateadora( numeroBateadora, jefeEquipo, supervisor) VALUES (?, ?, ?);'
    pool.query(sqlQuery, [parametros.numeroBateadora, parametros.jefeEquipo, parametros.supervisor], function(error, results)  {    
        if (error) {
            res.send(error).status(400);
            return;
        }
        console.log("se cargo los datos");
        res.send();
    });
})
routerRegistrar.post('/eliminar',function(req,res){
    const valor = req.body;
    console.log("entro a eliminar equipo " , valor);
    const sqlQuery = "DELETE FROM `bateadora` WHERE `bateadora`.`idbateadora` = ?";
    pool.query(sqlQuery, [valor.idBateadora], function(error, results)  {    
        if (error) {
            res.send(error).status(400);
            return;
        }
        console.log("Se elimino el dato");
        res.send();
    });
})
module.exports = routerRegistrar