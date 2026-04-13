const express = require ("express");
const router = express.Router();

const {explainPricing} = require ("../controllers/explainController");

//GET explainPricing per ottenere la risposta in chat dall'LLM
router.get("/:id/explain", explainPricing);

module.exports = router;