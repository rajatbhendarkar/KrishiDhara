const express = require('express');
const router = express.Router();
const schemesController = require('../controllers/schemesController');

router.get('/', schemesController.getSchemes);
router.post('/:id/bookmark', schemesController.toggleBookmark);

module.exports = router;
