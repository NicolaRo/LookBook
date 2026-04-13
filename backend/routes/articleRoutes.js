const express = require ('express');
const router = express.Router();
const {createArticle, getArticle, getArticleById, updateArticle} = require ('../controllers/articleController');
const {createPricing} = require ('../controllers/pricingController');

router.post('/',createArticle);
router.get('/',getArticle);
router.post('/:articleId/pricing', createPricing);
router.get('/:id', getArticleById);
router.put('/:id',updateArticle);



module.exports =router;