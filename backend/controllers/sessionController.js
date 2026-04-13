/* Responsabibilità del file: sessionController

1. Creare una sessione nel DB
    1.1 Quando il client invia una query crea una nuova sessione nel DB.
    1.2 Valida i dati controllo errori
    1.3 Crea la sessione nel DB
    1.4 Conferma che la sessione è stata salvata HTTP 201

2. Leggere i dati dell'articolo per passarli all'LLM
    2.1 Recupera sessione specifica ->findById(req.params.id)
    2.2 Restituisce sessione
*/

//Importo l'oggetto dal model
const Session = require("../models/Session");

// ### --- CREO UNA SESSIONE --- ###
//1. Quando il client invia una query crea una nuova sessione nel DB.
const createSession = async (req, res) => {
    try {
        const {sessionId, name, messages} = req.body;

        //1.2 Valida i dati controllo errori
        //1.3 Crea la sessione nel DB
        //1.4 Conferma che la sessione è stata salvata HTTP 201
        if (!sessionId || !name )

            return res.status(400).json({message: "Dati sessione mancanti"});
        const session = await Session.create({
            sessionId,
            name,
            messages,
        }); 

        
        return res.status(201).json(session);
    } catch (error) {
        return res.status(500).json ({message: error.message});
    }
}

//### --- LEGGO UNA SESSIONE -- ###
// 2. Recupera la sessione salvata nel DB

const getSessionById = async (req, res) => {
    try {
        //Leggo getSessionId da sessionStorage api.js NON l'_id di MongoDB
        const session = await Session.findOne({sessionId: req.params.id});

        if(!session) {
            return res.status(404).json({message: "ID Sessione non trovato"});
        }
        //2.1 Restituisce sessione
        return res.status(200).json(session);
    } catch (error) {
        //Controllo errori con HTTP status code
        res.status(500).json({message: error.message});
    }
};

module.exports = {
    createSession,
    getSessionById,
};