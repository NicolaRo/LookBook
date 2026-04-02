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
const Session = require ("../models/Session")//***
    

// ### --- CREO UN PRICING --- ###

//2. Creo callLLM funzione asincrona i cui params sono categoria, brand, stato e foto
const callLLM = async ({categoria, brand, stato, foto }) => {
    return {
        suggested_price: 50,
        range: {min: 45, max: 55},
        motivation: "Marca famosa, condizioni ottime",
        selling_tips: `Pubblica con questi tags: ${brand}, ${stato}`
    };
}

//3. Creo il pricing
const createPricing = async (req, res) => {

    //Estraggo i dati dalla request
    const  {articleId}= req.params;
    const {categoria, brand, stato, foto} = req.body;
    const {sessionId, name, messages} = req.body; //*** 
 
    let session; //***

    try {
        //Recupero sessionId
        session = await Session.findOne({sessionId});//***

        if(!session) //***
            return res.status(404).json({message: "Session non trovata"});//***
    } catch (error) {//***
        return res.status(500).json({message: error.message});//***
    };

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
            foto,
            messages: session.messages//***
        };

        //Simulazione chiamata LLM: restituisce prezzo, range, motivazione e selling_tips
        const llmResponse = await callLLM(llmInput);

        //Aggiorno l'articolo 
        article.pricing = llmResponse;

        session.messages.push( {//***
            role: "user",
            content: `Valuta questo articolo: ${categoria}, ${brand}, ${stato}`
        });
        session.messages.push({//***
            role: "assistant",
            content: JSON.stringify(llmResponse)
        });
        
        //Salvo gli aggiornamenti sul DB
        await article.save();
        await session.save();//***
    
        //Rispondo al frontend
        res.status(200).json ({article, session});//***
    
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "DB failure"});
    };
    
};
module.exports = {
    callLLM,
    createPricing
};