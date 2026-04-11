/* Mostra il risultato del pricing.

Legge da Redux:
-pricing.data

Mostra: 
-prezzo
-range
-motivazione
-tips
 */

//Importo

import {useSelector} from 'react-redux';

function PricingResult() {
    const pricingResult = useSelector ((state)=> state.pricing.pricingResult);

    if(!pricingResult || !pricingResult.article?.pricing) {
        return <p>Valutando l'articolo...</p>
    }
    const {suggested_price, range, motivation, selling_tips} = pricingResult.article.pricing;
    
    return (
        <div className="container-pricing-result">
            <h1 className="pricing-result-title">Ecco la tua valutazione di vendita</h1>
            <div className="pricing-result-content">
                <p><strong>Prezzo suggerito: </strong>${suggested_price}</p>
                <p><strong>Range:</strong>${range.min} - €{range.max}</p>
                <p><strong>Motivazione:</strong>{motivation}</p>
                {selling_tips && selling_tips.length > 0 && (
                    <>
                    <p>Consigli per la vendita</p>
                    <ul>
                        {selling_tips.map((tip, index) => (
                            <li key={index}>{tip}</li>
                        ))}
                    </ul>
                    </>
                )}
            </div>
        </div>
    )
}

export default PricingResult;