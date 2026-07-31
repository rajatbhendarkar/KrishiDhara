const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');

router.post('/transcribe', aiController.transcribeSpeech);
router.post('/chat', aiController.chatWithAI);
router.post('/tts', aiController.generateTTS);

module.exports = router;
