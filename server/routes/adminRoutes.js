const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/analytics', adminController.getAnalytics);
router.get('/users', adminController.getUsers);
router.get('/logs', adminController.getSystemLogs);

module.exports = router;
