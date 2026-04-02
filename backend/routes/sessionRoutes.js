const express = require ('express');
const router = express.Router();
const {createSession, getSession, deleteSession} = require ('../controllers/sessionController');

router.post('/', createSession);
router.get('/', getSession);
router.delete('/',deleteSession);

module.exports = router;