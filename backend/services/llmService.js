/* Responsabilità di llmService.js
1. Istanziare il client OpenAI con la API key dal .env
2. Costruire un prompt con i dati dell'articolo
    2.1 System prompt  — chi è l'LLM e cosa deve fare
    2.2 User message   — i dati dell'articolo + la foto in base64
3. Chiamata API   — openai.chat.completions.create(...)
4. Parsing        — JSON.parse della risposta
*/

//Importo LLM OpenAI 
const OpenAI = require ('openai');

//Funzione per validare l'immagine base64
function isValidBase64Image(data) {
    if(!data || typeof data !== 'string') return false;

    return /^[A-Za-z0-9+/]+={0,2}$/.test(data);
}

const callLLM = async ({categoria, brand, stato, foto, messages}) => { 
    //Validazione foto prima di inviare all'LLM
    if(foto &&!isValidBase64Image(foto)) {
        console.error('❌ LLM call aborted: invalid base64 image');
        throw new Error ('Invalid base64 image format');
    }

    //Istanzio il client OpenAI
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY
    });
    const categoriaStr = `${categoria.genere || ''}, ${categoria.tipo || ''}`;

    try{
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content: "Sei un esperto di moda second hand. Il tuo compito è valutare capi di abbigliamento e restituire una stima di prezzo coerente col mercato. Rispondi SOLO con un oggetto JSON valido, senza testo aggiuntivo, senza markdown, senza backtick. La struttura deve essere esattamente questa: { suggested_price: <numero>, range: { min: <numero>, max: <numero> }, motivation: <stringa>, selling_tips: [<stringa>, <stringa>]}"
                },
                ...messages, //Memoria conversazionale
                {
                    role:"user",
                    content: `Valuta questo articolo: ${categoriaStr}, brand ${brand}, stato ${stato}, Base64 immagine: ${foto}`
                }
            ]
        });
        const raw = response.choices[0].message.content;
        return JSON.parse(raw);
    } catch (error) {
        console.error("LLM ERROR:", error.message);
        throw new Error(`LLM error: ${error.message}`);
    }
};

module.exports = {callLLM};