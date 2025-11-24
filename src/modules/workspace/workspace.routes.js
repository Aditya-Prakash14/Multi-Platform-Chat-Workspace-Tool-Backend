const express = require('express');
const workspaceController = require('./workspace.controller');
const authMiddleware = require('../../middlewares/auth');

const router = express.Router();

// All workspace routes require authentication
router.use(authMiddleware);

router.post('/', workspaceController.create);
router.get('/', workspaceController.getAll);
router.get('/:id', workspaceController.getById);
router.put('/:id', workspaceController.update);
router.delete('/:id', workspaceController.delete);

// Member management
router.post('/:id/members', workspaceController.addMember);
router.delete('/:id/members/:userId', workspaceController.removeMember);

module.exports = router;
