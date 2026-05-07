const express = require('express');
const container = require('../../container/container');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();
const adminProfileController = container.resolve('adminProfileController');

router.use(authMiddleware);

router.get('/profile', adminProfileController.getProfile);
router.patch('/profile', adminProfileController.patchProfile);

module.exports = router;
