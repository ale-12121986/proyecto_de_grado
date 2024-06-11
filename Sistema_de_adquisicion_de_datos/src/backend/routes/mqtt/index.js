process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const express = require('express');
console.log("Entro a la configuracionMqtt");
const routerMqtt = express.Router();
const mqtt = require('mqtt');
var pool = require('../../mysql-connector');

const fs = require('fs');
// const io = require('/..');
//Enviar datos a la base de datos por medio de la comunicacion mqtt
// Nombre del topic para la comunicación

var resultado;
var idTrabajo;
var mqttMessage;
var topic2;
var mainTopic;
var subTopic;
var distancia1, alineacion1, peralte1, nivel_izquierdo1, nivel_derecho1;
const topic = 'Bateadora/#'; 

const options = {
    // port:8083,
    port:8084,
    clean: true, // retain session
    host:'192.168.54.8',//  192.168.2.4 192.168.54.8    54.232.196.184   
    connectTimeout: 4000, // Timeout period
    // Authentication information
    clientId: `emqx_test_${Math.random().toString(16).slice(3)}`,
    username: 'BateadorasVyO',
    // passwvord: 'Trenes_Argentinos',
    // protocol: 'wss',
    // keepalive: 60,
    // key: fs.readFileSync('./certificados/client.key'), // Ajusta la ruta    ./certificados/ESP32_1.key
    // cert: fs.readFileSync('./certificados/client.crt'), // Ajusta la ruta   ./certificados/ESP32_1.crt
    // ca: fs.readFileSync('./certificados/ca.crt'), // Ajusta la ruta     './certificados/cacert.crt'
    
    key: fs.readFileSync('./certificados/client-key.pem'), // Ajusta la ruta    ./certificados/ESP32_1.key
    cert: fs.readFileSync('./certificados/client-cert.pem'), // Ajusta la ruta   ./certificados/ESP32_1.crt
    ca: fs.readFileSync('./certificados/cacert.pem'), // Ajusta la ruta     './certificados/cacert.crt'
}

var client = mqtt.connect('wss://192.168.54.8/mqtt', options); // 192.168.2.4  192.168.75.8     192.168.241.8   54.232.196.184
//Manejar la conexion



//Comunicacion mqtt
client.on('connect', () =>{
    console.log("Conectado al broker MQTT por WS con exito", topic);
    client.subscribe(topic);
});

client.on('reconnect', (error) => {
    console.log('reconnecting:', error)
})

client.on('error', (error) => {
    console.log('Connection failed:', error)
})

client.on('message', (topic, message) => {
    topic2 = topic;
    console.log(`Mensaje recibido en el tema ${topic}: ${message.toString()}`);
    mainTopic = topic.toString().split("/")[0];
    const strTopic = topic.toString().split("/")[1];
    subTopic = strTopic;
    console.log("en el topic ",topic);
    const mensaje = message.toString().split("/")[0];
    // console.log("El mensaje es ",);
    if(topic === "Bateadora") {
        console.log("entro a insertar datos",message.toString());
        const payload = JSON.parse(message.toString());
        // io.emit('datosDesdeMQTT', dataFromMQTT);
        const { distancia, alineacion, peralte, nivel_izquierdo, nivel_derecho,tipoMedicion, idtrabajo2} = payload;
        distancia1 = payload.distancia;
        alineacion1 = payload.alineacion;
        peralte1 = payload.peralte;
        nivel_izquierdo1 = payload.nivel_izquierdo;
        nivel_derecho1 = payload.nivel_derecho;
        const sql = 'INSERT INTO medicion (distancia, alineacion, peralte, nivel_izquierdo, nivel_derecho, tipoMedicion, idtrabajo2) VALUES (?, ?, ?, ?, ?, ?, ?)';
        pool.query(sql, [distancia, alineacion, peralte, nivel_izquierdo, nivel_derecho, tipoMedicion, idtrabajo2], (err, result) => {
        if (err) {
            console.error('Error al insertar datos en la base de datos MySQL:', err);
        } else {
            console.log('Datos insertados correctamente en la base de datos MySQL.');
        }
        });
    }
    else if (message.toString() === "trabajo") {
        console.log("entro a buscar idTrabajo")
        // const strTopic = JSON.parse(topic.toString().split("/")[1]);
        const sql = 'SELECT idTrabajo FROM trabajo WHERE idbateadora = (SELECT idbateadora FROM bateadora WHERE numeroBateadora = ?) ORDER BY fecha  DESC LIMIT 1';
        pool.query(sql, strTopic, (err, result) => {
            if (err) {
                console.error('Error al buscar datos en la base de datos MySQL:', err);
            } else {
                resultado = result[0];
                idTrabajo = resultado.idTrabajo;
                mqttMessage = idTrabajo.toString();
                console.log('Se encontro el dato correctamente en la base de datos MySQL.',mqttMessage);
                // client.subscribe(topic2);
                client.publish(topic, `idTrabajo/${mqttMessage}`, {qos: 0, retain: false},(error)=>{
                    if(error){
                        console.log(error);
                    }
                    console.log(`Mensaje enviado en el tema: ${topic2}: ${mqttMessage}`);
                });
            }
        });    
    }
});

routerMqtt.get('/', function(req,res){

})
// module.exports = client;
module.exports = routerMqtt;
