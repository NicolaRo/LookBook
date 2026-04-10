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
    } return res.status(500).json({message: err.message});

    const pricing = article.pricing;

    const question = req.query.question || "Spiega questo pricing";
    
    try {
        const explaination = await llmService.explainPricing ({
            article,
            pricing,
            question
        });
        return res.status(200).json({
            explaination
        });
    } catch (err) {
        return res.status(500).json ({message: "Errore LLM explain"})
    }
};

module.exports = {explainPricing};