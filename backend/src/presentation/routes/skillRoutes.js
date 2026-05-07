const express = require('express');
const container = require('../../container/container');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();
const skillController = container.resolve('skillController');

router.get('/', skillController.getAll);
router.get('/:id', skillController.getById);

router.post('/', authMiddleware, skillController.create);
router.put('/:id', authMiddleware, skillController.update);
router.delete('/:id', authMiddleware, skillController.remove);

module.exports = router;
