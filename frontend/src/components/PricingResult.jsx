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
        return <p>Checking your article...</p>
    }
    const {suggested_price, range, motivation, selling_tips} = pricingResult.article.pricing;
    
    return (
        <>
        <div className="container-pricing-result">
            <button className="button-red" onClick ={() => setShowModal (true)}>❮ Back to form</button>
            
            <div className="pricing-result-content">
                <h2 className="pricing-result-title">Here is the article pricing</h2>
                    <h3>Selling price: € </h3> <p className = "price-hero">{suggested_price}</p>
                    <h3>Range: €</h3> <p className = "UI-text">{range.min} - €{range.max}</p>
                    <h3>Reason: </h3>  <p className = "UI-text">{motivation}</p>
                    {selling_tips && selling_tips.length > 0 && (
                        <>
                        <h3>Selling tips:</h3> 
                        <ul>
                        {selling_tips.map((tip, index) => (
                                <li key={index}>
                                    <p className = "UI-text"> {tip}</p>
                                    </li>
                            ))}
                        </ul>
                        </>
                    )}
            </div>
        </div>
        {showModal && (
            <div className= "modal-overlay">
                <div className = "modal">
                    <h4 className = "modal-text">Received price will be lost, continue?</h4>
                    <div className = "modal-buttons-container">
                    <button className = "button-confirm" onClick = {handleReset}>Yes, go back</button>
                    <button className="button-red" onClick = {() => setShowModal(false)}>Cancel</button>
                    </div>
                    
                </div>
            </div>
        )}
        </>
    )
}

export default PricingResult;