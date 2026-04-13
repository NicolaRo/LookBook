//Importo mongoose, imposta lo schema con cui vengono salvati i dati nel DB
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
            enum: ["Pantaloni", "Jeans", "T-Shirt", "Abito", "Giacca", "Calzature", "Accessori"],
            required: true
        }
    },
    brand: {
        type: String,
        required: true
    },
    stato: {
        type: String,
        enum: ["Nuovo", "Buono", "Usato"],
        required: true
    },
    foto: {
        //Stringa in base64 convertita da fileToBase64.js -> frontend
        type: String,
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
        selling_tips:[{ 
            type: String,
            minlength: 2,
            trim: true}]
    },
    followups : [
        {
            question: {
                type: String,
                required: true,
                trim: true
            },
            answer: {
                type: String,
                required: true,
                trim: true
            }
        }
    ]
}, {timestamps: true});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;