//Importo mongoose, definisce i parametri del DB
const mongoose = require("mongoose");

//Definisco i paramtri del DB "Article"
const articleSchema = new mongoose.Schema({

    sessionId: {
        type: String,
        ref: "Session", //Non serve importare tutto Session, uso "ref" che fa riferimento al DB
        required: true
    },
    categoria:{
        genere: {
            type: String,
            enum: ["Abbigliamento uomo", "Abbigliamento donna"],
            required: true
        },
        tipo: {
            type: String,
            enum: ["Pantaloni", "Jeans", "T-shirt", "Abito", "Giacca", "Calzature", "Accessori"],
            required: true
        }
    },
    brand: {
        type: String,
        required: true
    },
    stato: {
        type: String,
        enum: ["nuovo", "buono", "usato"],
        required: true
    },
    foto: {
        type: String,
    },
    valutazione: { 
        prezzo: {
         type: Number,
         min: 0.00,
         required: true
       }, 
        motivazione: { 
         type: String,
         minlength: 2,
         required: true}
       }
},{timestamps: true});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;