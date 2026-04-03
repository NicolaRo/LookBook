/* Funzione pura per convertire files immagine in base64.

Relazioni:
-usata da ArticleForm.jsx

NON conosce React o Redux */

//Creo la funzione per convertire l'immagine
const fileToBase64 = (file) => {
    return new Promise((resolve,reject)=> {
        //Uso FileReader: una API nativa del browser
        const reader = new FileReader()

        //Quando la lettura è completata, resolve la Promise col risultato
        reader.onload = () => resolve(reader.result)

        //Se ci sono errori, reject la Promise
        reader.onerror = () => reject(new Error("Errore lettura file"))

        //Avvia la lettura - converte il file in stringa base64
        reader.readAsDataURL(file)
    })
}
//Esporto la funzione così da poterla utilizzare anche all'esterno del file
export default fileToBase64