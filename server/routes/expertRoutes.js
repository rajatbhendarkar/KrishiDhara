const express = require('express');
const router = express.Router();
const expertController = require('../controllers/expertController');

router.get('/pending', expertController.getPendingReports);
router.post('/verify/:id', expertController.verifyReport);

module.exports = router;
