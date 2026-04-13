//Importo Mongoose, imposta lo schema con cui vengono salvati i dati nel DB
const mongoose = require("mongoose");

//Definisco i parametri del DB "Session"
const sessionSchema = new mongoose.Schema({
    
    sessionId :{
        type: String,
        unique: true,
        required: true
    },

    name: {
        type: String,
    },
    messages: [
        {
        role:{
            type: String,
            enum: ["user", "assistant"]
            },
        content:{
            type: String
            }
        }
    ]
}, {timestamps: true});

const Session = mongoose.model("Session", sessionSchema);

module.exports = Session;