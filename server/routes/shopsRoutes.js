const express = require('express');
const router = express.Router();
const shopsController = require('../controllers/shopsController');

router.get('/nearby', shopsController.getNearbyShops);

module.exports = router;
