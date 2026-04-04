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
    const pricingResult = useSelector ((state)=> state.pricing.pricingResult)
    
    return (
        <div className="container-pricing-result">
            <h1 className="pricing-result-title">Ecco la tua valutazione di vendita</h1>
            <div className="pricing-result-content">
                {pricingResult && (
                    <div>
                        <p>{pricingResult.suggested_price}</p>
                        <p>{pricingResult.motivation}</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default PricingResult;