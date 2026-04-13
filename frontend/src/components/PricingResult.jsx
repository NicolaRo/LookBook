/* Mostra il risultato del pricing.

Legge da Redux:
-pricing.data
che ottiene da pricingSlice via Redux store.

Mostra: 
-prezzo
-range
-motivazione
-tips
 */

//Importo i componenti
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {resetApp} from '../features/appSlice';
import {resetArticle} from  '../features/article/articleSlice';
import {resetChat} from '../features/chat/chatSlice';


//Funzione principale del componente
function PricingResult() {

    //Prendo PricingResult ed articleStatus
    const pricingResult = useSelector ((state)=> state.pricing.pricingResult);
    const articleStatus = useSelector ((state)=> state.article.status);

    //dispatch lancia le azioni verso lo store per aggiornare lo stato globale
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);

    //Con handleReset ripristino gli stati di default dei sub-componenti
    const handleReset = () => {
        dispatch(resetApp());
        dispatch(resetArticle());
        dispatch(resetChat());
        setShowModal(false);
    };

    if(articleStatus === 'IDLE') return null; 

    //Controllo la presenza di un pricing, se non ancora disponibile restituisco un messaggio
    if(!pricingResult || !pricingResult.article?.pricing) {
        return <p>Valutando l'articolo...</p>
    }
    const {suggested_price, range, motivation, selling_tips} = pricingResult.article.pricing;
    
    return (
        <>
        <div className="container-pricing-result">
            <button className="button-red" onClick ={() => setShowModal (true)}>❮ Torna al form</button>
            <h2 className="pricing-result-title">Ecco la tua valutazione di vendita</h2>
            <div className="pricing-result-content">
                <p><strong>💰 Prezzo suggerito: </strong>€{suggested_price}</p>
                <p><strong>🧭 Range: </strong>€{range.min} - €{range.max}</p>
                <p><strong>🕵🏻‍♂️ Motivazione: </strong>{motivation}</p>
                {selling_tips && selling_tips.length > 0 && (
                    <>
                    <p><strong>Consigli per la vendita 💬</strong></p>
                    <ul>
                        {selling_tips.map((tip, index) => (
                            <li key={index}>{tip}</li>
                        ))}
                    </ul>
                    </>
                )}
            </div>
        </div>
        {showModal && (
            <div className= "modal-overlay">
                <div className = "modal">
                    <p>⚠️ Tornando al form perderai la valutazione ricevuta. Continuare?</p>
                    <button className = "button" onClick = {handleReset}>Si, torna al form</button>
                    <button className="button-red" onClick = {() => setShowModal(false)}>Annulla</button>
                </div>
            </div>
        )}
        </>
    )
}

export default PricingResult;