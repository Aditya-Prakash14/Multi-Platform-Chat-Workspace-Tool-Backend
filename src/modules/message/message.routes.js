const express = require('express');
const messageController = require('./message.controller');
const authMiddleware = require('../../middlewares/auth');

const router = express.Router();

// All message routes require authentication
router.use(authMiddleware);

router.post('/', messageController.create);
router.get('/channel/:channelId', messageController.getByChannel);
router.get('/:id', messageController.getById);
router.put('/:id', messageController.update);
router.delete('/:id', messageController.delete);

module.exports = router;
