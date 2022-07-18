const express = require('express');
const router = express.Router();
const help = require('./../Controllers/helpController');

router.get('/help', help.getHelp);
router.get('/help/:id', help.getHelpByUserId);

router.post('/help', help.createHelp);
router.delete('/help/:id', help.deleteHelp);



module.exports = router;