const express = require('express');
const router = express.Router();
const classController = require('../controllers/classController');

router.post('/createclass', classController.createClass);
router.get('/getclasses', classController.getClasses);

module.exports = router;