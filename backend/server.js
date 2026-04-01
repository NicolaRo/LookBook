/* Responsabilità di server.js
1. Entry point del backend
2. Importa tutti gli strumenti e le dipendenze installate
3. Avvia Express (virtualizza un server)
4. Gestisce la connessione al DB 
 */

//Importo variabili d'ambiente
require ('dotenv').config();

//Importo ed avvio Express
const express = require ('express');
const app = express();

//Importo mongoose
const mongoose = require ('mongoose');

//Importo i Middleware
app.use(express.json());

//Connetto DB ed avvio il server
const connectDB = async () => {
    try {
        //Tenta la connessione
        const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log(`📦 MongoDB connesso: ${conn.connection.host}`);
    console.log(`🗄️  Database: ${conn.connection.name}`);
    } catch (error) {
        console.error('❌ Errore connessione MongoDB:', error.message);

        // In caso di errore, termina il processo
        // (meglio crashare subito che continuare senza DB)
        process.exit(1);
    }
};

process.on('SIGINT', async () => {
    await mongoose.connection.close();
    console.log('🔌 Connessione MongoDB chiusa');
    process.exit(0);
});

module.exports = connectDB;

//Chiama connectDB e avvia il server
connectDB().then(() => {
    app.listen(process.env.PORT || 3000, () => {
        console.log('🚀 Server in ascolto sulla porta 3000');
    });
});