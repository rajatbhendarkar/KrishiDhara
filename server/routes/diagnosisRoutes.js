const express = require('express');
const router = express.Router();
const diagnosisController = require('../controllers/diagnosisController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.post('/detect', diagnosisController.detectDisease);
router.get('/history', diagnosisController.getHistory);
router.get('/:id', diagnosisController.getDiagnosisById);
router.patch('/:id/status', diagnosisController.updateStatus);

module.exports = router;
