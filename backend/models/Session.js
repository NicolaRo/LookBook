//Importo Mongoose: definisce i parametri del DB
const mongoose = require("mongoose");

//Definisco i parametri del DB "Session"
const sessionSchema = new mongoose.Schema({
    
    //parametri session
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