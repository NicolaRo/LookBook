/* Responsabibilità del file: explainController
1. prendere la risposta llm, 
2. prendere l'articolo,
3. prendere la question
4.comporre un nuovo JSON e mandarlo all'LLM perchè possa rispondere con contesto.
*/

const Article = require("../models/Article");
const llmService = require("../services/llmService");

const explainPricing = async (req, res) => {
    const { id } = req.params;

    let article;

    try {
        article = await Article.findById(id);
        if(!article){
            return res.status(404).json({ message: "Articolo non trovato"});
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    const pricing = article.pricing;
    if (!pricing || !pricing.suggested_price) {
        return res.status(400).json ({
            message:"Pricing non disponibile"
        });
    }

    // Fallback: se il frontend non passa una domanda, uso un prompt di default
    const question = req.query.question || "Spiega questo pricing";
    
    try {
        const explaination = await llmService.explainPricing ({
            article,
            pricing,
            question
        });
        return res.status(200).json(explaination);
    } catch (err) {
    
        return res.status(500).json ({message: err.message});
    }
};

module.exports = {explainPricing};