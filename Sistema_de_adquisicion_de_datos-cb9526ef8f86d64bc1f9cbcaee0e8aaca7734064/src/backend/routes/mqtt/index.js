const express = require('express')
const mqtt = require('mqtt');

//Enviar datos a la base de datos por medio de la comunicacion mqtt
// Nombre del topic para la comunicación
const WebSocket_URL = 'mqtt://localhost';
const topic = '201/#'; // Por ejemplo, un topic para controlar la iluminación de la sala en una casa
const options = {
    port:8083,
    clean: true, // retain session
    host:'172.20.0.3',
    connectTimeout: 4000, // Timeout period
    // Authentication information
    clientId: 'emqx_test',
    //username: 'emqx_test',
    //password: 'emqx_test',
    keepalive: 60,
}
var client = mqtt.connect('ws://172.20.0.3:8083/mqtt', options);
//Manejar la conexion

client.on('connect', () =>{
    console.log("Conectado al broker MQTT por WS con exito");
    client.subscribe('Bateadora');
});

client.on('reconnect', (error) => {
    console.log('reconnecting:', error)
})

client.on('error', (error) => {
    console.log('Connection failed:', error)
})

client.on('message', (topic, message) => {
    console.log(`Mensaje recibido en el tema ${topic}: ${message.toString()}`);
    // Aquí puedes procesar los datos recibidos y realizar acciones en función del tema y el mensaje recibido
    // Por ejemplo, guardar los datos en la base de datos MySQL
});

module.exports.client = client;