const express = require('express');
const channelController = require('./channel.controller');
const authMiddleware = require('../../middlewares/auth');

const router = express.Router();

// All channel routes require authentication
router.use(authMiddleware);

router.post('/', channelController.create);
router.get('/workspace/:workspaceId', channelController.getByWorkspace);
router.get('/:id', channelController.getById);
router.put('/:id', channelController.update);
router.delete('/:id', channelController.delete);

module.exports = router;
