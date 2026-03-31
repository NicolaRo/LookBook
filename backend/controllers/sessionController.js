/* Responsabibilità del file: sessionController

1. Creare una sessione nel DB
    1.1 Quando il client invia una query crea una nuova sessione nel DB.
    1.2 Valida i dati controllo errori
    1.3 Crea la sessione nel DB
    1.4 Conferma che la sessione è stata salvata HTTP 201

2. Leggere i dati dell'articolo per passarli all'LLM
    2.1 Recupera tutte le sessioni salvate nel DB
    2.2 Filtro per "argomento", "data", "stato"
    2.3 Restituisce array sessioni -> HTTP 200
    2.4 Recupera sessione specifica ->findById(req.params.id)
    2.5 Restituisce sessione

3. Eliminare sessioni concluse per mantenere DB pulito e leggero
    3.1 Ottengo sessionID da query 
    3.2 Valido i dati 
    3.3 Aggiorna la sessione -> Session.findByIdAndDelete(req.params.id);
    3.4 Conferma eliminazione HTTP Status code (200)
*/

//Importo l'oggetto dal model
const Session = require("../models/Session");

// ### --- CREO UNA SESSIONE --- ###
//1. Quando il client invia una query crea una nuova sessione nel DB.
const createSession = async (req, res) => {
    try {
        const {sessionId, name, messages} = req.body;

        //1.2 Valida i dati controllo errori
        if (!sessionId || !name || !messages)

            return res.status(400).json({message: "Dati sessione mancanti"});
        const session = await Session.create({
            sessionId,
            name,
            messages,
        }); 

        //1.3 Crea la sessione nel DB
        //1.4 Conferma che la sessione è stata salvata HTTP 201
        return res.status(201).json(session);
    } catch (error) {
        return res.status(500).json ({message: error.message});
    }
}

//### --- LEGGO UNA SESSIONE -- ###
// 2. Recupera tutte le sessioni salvate nel DB

//2.1 Recupera tutte le sessioni salvate nel DB
const getSession = async (req, res) => {
    try {
        const session = await Session.find();

        //2.2 Filtro per "argomento", "data", "stato"

        //2.3 Restituisce array sessioni -> HTTP 200
        return res.status(200).json(session);
    } catch (error) {
        return res.status(500).json ({message: error.message});
    }
};

//2.4 Recupera sessione specifica ->findOne({sessionId: req.params.id})
const getSessionById = async (req, res) => {
    try {
        //Leggo sessionId da localStorage non quello di MongoDB
        const session = await Session.findOne({sessionId: req.params.id});

        if(!session) {
            return res.status(404).json({message: "ID Sessione non trovato"});
        }
        //2.5 Restituisce sessione
        return res.status(200).json(session);
    } catch (error) {
        //Controllo errori con HTTP status code
        res.status(500).json({message: error.message});
    }
};

//### --- ELIMINO UNA SESSIONE --- ###
//3 Eliminare sessioni concluse per mantenere DB pulito e leggero

//3.1 Ottengo sessionID da query 
const deleteSession = async (req, res) => {
    try {
        //3.3 Aggiorna la sessione -> Session.findByIdAndDelete(req.params.id);
        const session = await Session.findOneAndDelete({sessionId: req.params.id});
        
        //3.2 Valido i dati 
        if(!session)
            return res.status(404).json({message: "Impossibile eliminare, sessione non trovata"});
        return res.status(200).json({message: "Sessione eliminata con successo"});
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};

module.exports = {
    createSession,
    getSession,
    getSessionById,
    deleteSession
};