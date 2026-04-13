/* Responsabibilità del file: articleController

1. Creare un articolo nel DB a partire dall'imput utente
    1.1 Riceve json dal middleware/query dal client
    1.2 Valida i dati controllo errori
    1.3 Crea il prodotto nel DB
    1.4 Conferma dati salvati HTTP 201

2. Leggere i dati dell'articolo per passarli all'LLM
    2.1 Recupera tutti gli articoli -> Article.find()
    2.2 Restituisce array articoli -> HTTP 200
    2.3 Recupera articolo specifico ->findById(req.params.id)

3. Aggiornare il DB Articolo con la valutazione prezzo
    3.1 Riceve Id articolo 
    3.2 Controllo errori -> se l'articolo non esiste HTTP 404
    3.3 Aggiorna l'articolo -> Article.findByIdAndUpdate(id, filtri,{stato: usato});
*/

//Importo l'oggetto dal model 
const Article = require ("../models/Article");

//### --- CREO UN ARTICOLO --- ###
//1. Creare un articolo nel DB a partire dall'imput utente
const createArticle = async (req, res) => {
    const sessionId = req.headers ['x-session-id']; //Legge sessionId
    const { categoria, brand, stato, foto} = req.body;
    if(!sessionId) {
        return res.status(400).json({message: "SessionId mancante"});
    }
    
    try {
        
        if(!categoria || ! brand || !stato)

            //Controllo errori con HTTP Status Code 
            return res.status(400).json({message:"Dati articolo mancanti"});
        
        if(!foto)
            return res.status(400).json({message:"Foto articolo mancante"});

        //1.3 Crea il prodotto nel DB
        const article = await Article.create({
            sessionId,
            categoria,
            brand,
            stato,
            foto
        });

        //1.4 Conferma dati salvati HTTP 201
        return res.status(201).json(article);
    } catch(error) {
        //Controllo errori con HTTP Status Code 
        console.error('ERRORE CREATE ARTICLE:', error);
        return res.status(500).json ({message: error.message});
    }
}

//### --- LEGGO UN ARTICOLO --- ###
// 2. Leggere i dati dell'articolo per passarli all'LLM
const getArticle = async (req, res) => {
    try{
        //2.1 Recupera tutti gli articoli -> Article.find()
        const article = await Article.find();

        //2.2 Filtro per "Categoria", "Brand", "Stato"

        //2.3 Restituisce array articoli -> HTTP 200
        return res.status(200).json(article);
    } catch (error) {

        //Controllo errori con HTTP Status Code 
        return res.status(500).json ({message: error.message});
    }
};
//2.4 Recupera articolo specifico
const getArticleById = async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);

        if(!article) {
            //Controllo errori con HTTP Status Code 
        return res.status(404).json({message: "ID Articolo non trovato"});
        }

        //2.5 Restituisce articolo
        return res.status(200).json(article);
    } catch (error){
        
        //Controllo errori con HTTP Status Code
        res.status(500).json ({message: error.message});
    }
};

//### --- AGGIORNO UN ARTICOLO --- ###
//3. Aggiornare il DB Articolo con la valutazione prezzo
const updateArticle = async (req, res) => {
    try{
        //3.1 Riceve Id articolo
        const article = await Article.findByIdAndUpdate (
            req.params.id,
            req.body,
            {new: true}
        );
        
        //3.2 Controllo errori -> se l'articolo non esiste HTTP 404
        if(!article)
            
            //Controllo errori con HTTP Status Code
            return res.status(404).json({message: "Articolo non trovato"});

            //3.3 Aggiorna l'articolo
            return res.status(200).json(article);
    } catch (error) {

        //Controllo errori con HTTP Status Code
        return res.status(500).json({message: error.message});
    }
};

module.exports= {
    createArticle,
    getArticle,
    getArticleById,
    updateArticle
};