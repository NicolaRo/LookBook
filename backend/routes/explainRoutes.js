const express = require ("express");
const router = express.Router();

const {explainPricing} = require ("../controllers/explainController");

//GET explaination for article pricing
router.get("/:id/explain", explainPricing);

module.exports = router;