//Importo mongoose per la gestione del DB
const mongoose = require('mongoose');

//Connetto l'applicazione a MongoDB usando mongoose
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);

        console.log(`MongoDB connesso: ${conn.connection.host}`);
        console.log(`Database: ${conn.connection.name}`);
    } catch (error) {
        console.log('Errore connessione MongoDB:', error.message);

        //In caso di errore termina il processo
        process.exit(1);
    }
};

//Gestisco chiusura connessione quando l'app termina
process.on('SIGINT', async () => {
    await mongoose.connection.close();
    console.log('Connessione MongoDB chiusa');
    process.exit(0);
});

module.exports = connectDB;