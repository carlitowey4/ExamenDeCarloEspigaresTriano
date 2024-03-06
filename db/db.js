const mongoose = require('mongoose');

const uri = "mongodb+srv://usuario:12345678abc@cluster0.ulerm98.mongodb.net/rickandmorty?retryWrites=true&w=majority";

mongoose.connect(uri, {});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error de conexión'));

db.once('open', () => {
    const dbName = db.name;
    console.log(`Conectado a la base de datos ${dbName}`)
});