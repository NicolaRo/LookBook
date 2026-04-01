/* Responsabilità di llmService.js
1. Istanziare il client OpenAI con la API key dal .env
2. Costruire un prompt con i dati dell'articolo
3. Chiamare l'API
4. Parsare la risposta e restituire { suggested_price, range, motivation, selling_tips } */

//Importo LLM OpenAI 
const OpenAI = require ('openai');

//Istanzio il client
const openai = new OpenAI ({
    apiKey: process.env.OPENAI_API_KEY
});
