const express = require('express')

const routerLogin = express.Router()

var pool = require('../../mysql-connector');


routerLogin.post('/datos', function (req, res) {
    const valor = req.body;
    console.log("llego el valor",valor);
    const sqlQuery = "SELECT nombre, apellido FROM Usuario WHERE legajo = ? AND clave =?"
    pool.query(sqlQuery, [valor.legajo, valor.clave], function(error,results){
        if (error) {
            res.send(error).status(400);
            return;
        }
        console.log("el resultado es",results);
        res.send(results).status(200);
    });
});

module.exports=routerLogin;




// const express = require('express');
// const routerLogin = express.Router();
// const jwt = require('jsonwebtoken');
// var pool = require('../../mysql-connector');

// // Obtén la clave secreta desde una variable de entorno
// const secretKey = process.env.JWT_SECRET || 'clave_secreta';

// routerLogin.post('/datos', function (req, res) {
//   const valor = req.body;
//   console.log("llego el valor", valor);
//   const sqlQuery = "SELECT nombre, apellido FROM Usuario WHERE legajo = ? AND clave = ?";
//   pool.query(sqlQuery, [valor.legajo, valor.clave], function(error, results) {
//     if (error) {
//       res.status(400).send(error);
//       return;
//     }
//     console.log("el resultado es", results);
//     if (results.length > 0) {
//       const user = results[0];
//       const token = jwt.sign(
//         { legajo: valor.legajo,
//            nombre: user.nombre,
//           apellido: user.apellido },
//         secretKey,
//         { expiresIn: '1h' }
//       );
//       res.status(200).send({ token: token, user: user });
//     } else {
//       res.status(401).send({ message: 'Credenciales incorrectas' });
//     }
//   });
// });

// routerLogin.post('/logout', function (req, res) {
//   res.clearCookie('authToken');
//   res.status(200).send({ message: 'Sesión cerrada' });
// });

// module.exports = routerLogin;