/* Responsabibilità del file: pricingController

1. createPricing
    1.1 Recupera l'articolo dal DB usando articleId
    1.2 Passa dati e foto all'LLM
    1.3 Riceve pricing suggerito, motivazione e selling tips
    1.4 Aggiorna l'articolo con il pricing e salva
    1.5 Risponde al frontend con l'articolo aggiornato
*/

//Import l'oggetto dal modello
const Article = require("../models/Article");

// ### --- CREO UN PRICING --- ###

//1. Creo callLLM funzione asincrona i cui params sono categoria, brand, stato e foto
const callLLM = async ({categoria, brand, stato, foto }) => {
    return {
        suggested_price: 50,
        range: {min: 45, max: 55},
        motivation: "Marca famosa, condizioni ottime",
        selling_tips: `Pubblica con questi tags: ${brand}, ${stato}`
    };
}

//2. Creo il pricing
const createPricing = async (req, res) => {

    //Dichiaro variabile artiche visibile in tutto il try
    let article;

    try {
        //Recupero articolo dl DB
        article = await Article.findById(articleId);

        if(!article)
            return res.status(404).json({message: "Articolo non trovato"});
        
    } catch (error) {
        return res.status(500).json({message: error.message});
    };

    try {
        //Preparo input per LLM
        const llmInput = {
            categoria,
            brand,
            stato,
            foto
        };

        //Simulazione chiamata LLM: restituisce prezzo, range, motivazione e selling_tips
        const llmResponse = await callLLM(llmInput);

        //Aggiorno l'articolo 
        article.pricing = llmResponse
        
        //Salvo gli aggiornamenti sul DB
        await article.save();
    
        //Rispondo al frontend
        res.status(200).json ({article});
    
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "DB failure"});
    };
    
};