const express = require('express');
const userController = require('./user.controller');
const authMiddleware = require('../../middlewares/auth');

const router = express.Router();

// All user routes require authentication
router.use(authMiddleware);

router.get('/me', userController.getProfile);
router.put('/me', userController.updateProfile);
router.put('/me/status', userController.updateStatus);
router.get('/search', userController.search);
router.get('/:id', userController.getById);

module.exports = router;
