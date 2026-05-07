const express = require('express');
const container = require('../../container/container');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();
const projectController = container.resolve('projectController');

router.get('/', projectController.getAll);
router.get('/:id', projectController.getById);

router.post('/', authMiddleware, projectController.create);
router.put('/:id', authMiddleware, projectController.update);
router.delete('/:id', authMiddleware, projectController.remove);

module.exports = router;
