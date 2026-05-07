const express = require('express');
const container = require('../../container/container');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();
const certificationController = container.resolve('certificationController');

router.get('/', certificationController.getAll);
router.get('/:id', certificationController.getById);

router.post('/', authMiddleware, certificationController.create);
router.put('/:id', authMiddleware, certificationController.update);
router.delete('/:id', authMiddleware, certificationController.remove);

module.exports = router;
