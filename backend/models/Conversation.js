//Importo mongoose, definisce i parametri del DB
const mongoose = require("mongoose");

//Definisco i parametri del DB "Conversation"
const conversationSchema = new mongoose.Schema({
    sessionId:{
        type: String,
        ref: "Session",
        required: true
    },
    riassuntoSession: {
        type: String,
        required: true,
        minlength: 100
    },
},{timestamps:true});

const Conversation = mongoose.model("Conversation", conversationSchema);

module.exports = Conversation;