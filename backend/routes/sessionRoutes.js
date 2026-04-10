const express = require ('express');
const router = express.Router();
const {createSession, getSessionById} = require ('../controllers/sessionController');

router.post('/', createSession);
router.get('/:id', getSessionById);

module.exports = router;