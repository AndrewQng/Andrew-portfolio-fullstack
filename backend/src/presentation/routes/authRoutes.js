const express = require('express');
const container = require('../../container/container');
const { authLimiter } = require('../middlewares/rateLimiter');

const router = express.Router();
const authController = container.resolve('authController');

router.post('/login', authLimiter, authController.login);
router.post('/refresh', authController.refresh);
router.post('/logout', authController.logout);

module.exports = router;