const userService = require('./user.service');

const userController = {
  async getProfile(req, res, next) {
    try {
      const userId = req.user.userId;
      const user = await userService.getById(userId);
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  },

  async updateProfile(req, res, next) {
    try {
      const userId = req.user.userId;
      const { displayName, bio, avatarUrl } = req.body;

      const user = await userService.update(userId, {
        displayName,
        bio,
        avatarUrl
      });

      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  },

  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const user = await userService.getById(id);
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  },

  async search(req, res, next) {
    try {
      const { query } = req.query;

      if (!query) {
        return res.status(400).json({ message: 'Search query is required' });
      }

      const users = await userService.search(query);
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  },

  async updateStatus(req, res, next) {
    try {
      const userId = req.user.userId;
      const { status } = req.body;

      if (!status) {
        return res.status(400).json({ message: 'Status is required' });
      }

      const user = await userService.updateStatus(userId, status);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
};

module.exports = userController;
