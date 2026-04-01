//Importo mongoose, definisce i parametri del DB
const mongoose = require("mongoose");

//Definisco i paramtri del DB "Article"
const articleSchema = new mongoose.Schema({
    sessionId: {
        type: String,
        required: true
    },
    categoria:{
        genere: {
            type: String,
            enum: ["Abbigliamento uomo", "Abbigliamento donna", "Abbigliamento bambino", "Abbigliamento bambina"],
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
    pricing: {
        suggested_price: {
            type: Number,
            min: 0
        },
        range: {
            min:{
                type: Number,
                min: 0
            },
            max: {
                type: Number,
                min: 0
            }
        },
        motivation: {
            type: String,
            minlength: 2,
            trim: true
        },
        selling_tips:{
            type: String,
            minlength: 2,
            trim: true
        }
    }
}, {timestamps: true});

//Creo il model
const Article = mongoose.model("Article", articleSchema);

//Esporto il model
module.exports = Article;