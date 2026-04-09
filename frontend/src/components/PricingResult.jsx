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
        return <p>Nessun pricing disponinbile.</p>
    }
    const {suggested_price, range, motivation, selling_tips} = pricingResult.article.pricing;
    
    return (
        <div className="container-pricing-result">
            <h1 className="pricing-result-title">Ecco la tua valutazione di vendita</h1>
            <div className="pricing-result-content">
                <h4>Prezzo suggerito: ${suggested_price}</h4>
                <h4>Range: ${range.min} - €{range.max}</h4>
                <h4>Motivazione: {motivation}</h4>
                {selling_tips && selling_tips.length > 0 && (
                    <>
                    <h4>Consigli per la vendita</h4>
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