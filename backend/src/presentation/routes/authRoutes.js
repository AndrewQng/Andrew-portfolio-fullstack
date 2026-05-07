const express = require('express');
const container = require('../../container/container');

const router = express.Router();
const authController = container.resolve('authController');

router.post('/login', authController.login);
router.post('/refresh', authController.refresh);
router.post('/logout', authController.logout);

module.exports = router;