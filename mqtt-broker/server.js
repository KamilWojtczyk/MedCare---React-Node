var mongoose  = require('mongoose');
var mongodb  = require('mongodb');
var mqtt     = require('mqtt');
var config   = require('./config');

var mqttUri  = 'mqtt://' + config.mqtt.user + ':' + config.mqtt.password + '@' + config.mqtt.hostname + ':' + config.mqtt.port;
var client   = mqtt.connect(mqttUri);

client.on('connect', function () {
    client.subscribe(config.mqtt.namespace);
});

var mongoUri = 'mongodb+srv://padifu:Limak2107!@media.clgvz.mongodb.net/MedCare?retryWrites=true&w=majority';
mongoose.connect(mongoUri, function(error, database) {
    if(error != null) {
        throw error;
    }

    var collection = database.collection(config.mongodb.collection);
    collection.createIndex( { "topic" : 1 } );

    client.on('message', function (topic, message) {
        var messageObject = {
            topic: topic,
            message: JSON.parse(message),
        };
  
        collection.insertMany(messageObject, function(error, result) {
            if(error != null) {
                console.log("ERROR: " + error);
            }
        });
    });
});
