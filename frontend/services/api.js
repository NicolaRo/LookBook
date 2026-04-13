/* Centralizzo qui tutte le chiamate HTTP al backend.

Funzioni:
getSessionId()
createArticle
getArticlePricing
explainPricing

NON gestisce stato (lo fa REDUX)

Relazioni:
-app.jsx  */

//Leggo la variabile d'ambiente VITE_API_URL dal file .env
//VITE_ è il prefisso obbligatorio per esporre variabili al browser con Vite
const BASE_URL = import.meta.env.VITE_API_URL // da .en del frontend

function getSessionId() {
    let sessionId = sessionStorage.getItem('sessionId');

    if(!sessionId) {
        sessionId = crypto.randomUUID();
        sessionStorage.setItem('sessionId', sessionId);
        console.log('🆕 Nuova sessionId creata:', sessionId);
    } else {
        console.log('♻️ sessionId esistente:', sessionId);
    }
    return sessionId;
}

export const createArticle = async (formData) => {
    const response = await fetch(`${BASE_URL}/api/articles`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json', // Serve a far capire a Express che è JSON
            'x-session-id': getSessionId() //Aggiungo sessionId da passare a pricingController
        },
        body: JSON.stringify(formData) 
    });

    if (!response.ok) throw new Error("Errore creazione articolo");
    return response.json();
}
//Creo il pricing
export const getArticlePricing = async (articleId) => {

    //Attendo risposta dal "POST" invio articleIs a pricing
    const response = await fetch(`${BASE_URL}/api/articles/${articleId}/pricing`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'x-session-id': getSessionId() //Aggiungo sessionId da passare a pricingController
        }
    })

    if(!response.ok) throw new Error ("Errore pricing")
        //Altrimenti ottiene in risposta un json con i dati
        return response.json() //Ritorna {suggested_price, range, motivation, selling_tips}
}

export const explainPricing = async (articleId, question) => {
    const res = await fetch(
        `http://localhost:3000/api/articles/${articleId}/explain?question=${encodeURIComponent(question)}`
    );

    const data = await res.json();
    return data;
};