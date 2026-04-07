/* Centralizzo qui tutte le chiamate HTTP al backend.

Funzioni:
createArticle(data)
getPricing(articleId)

NON gestisce stato (lo fa REDUX)

Relazioni:
-app.jsx  */

//Leggo la variabile d'ambiente VITE_API_URL dal file .env
//VITE_ è il prefisso obbligatorio per esporre variabili al browser con Vite
const BASE_URL = import.meta.env.VITE_API_URL // da .en del frontend

//Creo l'articolo da.. 
/* export const createArticle = async (formData) => {
    //Attendo risposta dal "POST" invio articles
    const response = await fetch (`${BASE_URL}/api/articles`, {
        method: "POST",
        headers: {
            body: JSON.stringify(formData)
        });
    })

    //Se response.ok === true se status HTTP è 200-299
    //Se response.ok === false fetch NON lancia errori automaticamente per 4xx/5xx
    //Quindi includo un controllo manuale per lanciare errori 4xx - 5xx
    if(!response.ok) throw new Error ("Errore creazione articolo")

        //Altrimenti ottiene in risposta un json con i dati
        return (response.json()) //Ritorna {_id, categoria, brand}
} */

const sessionId = localStorage.getItem('sessionId');

export const createArticle = async (formData) => {
    const response = await fetch(`${BASE_URL}/api/articles`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json', // ✅ Serve a far capire a Express che è JSON
            'x-session-id': sessionId //✅ Aggiungo sessionId da passare a pricingController
        },
        body: JSON.stringify(formData) // ✅ Serialize JSON
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
            'x-session-id': sessionId //✅ Aggiungo sessionId da passare a pricingController
        }
    })

    if(!response.ok) throw new Error ("Errore pricing")
        //Altrimenti ottiene in risposta un json con i dati
        return response.json() //Ritorna {suggested_price, range, motivation, selling_tips}
}