const messageService = require('./message.service');

const messageController = {
  async create(req, res, next) {
    try {
      const { content, channelId } = req.body;
      const userId = req.user.userId;

      if (!content || !channelId) {
        return res.status(400).json({ 
          message: 'Content and channel ID are required' 
        });
      }

      const message = await messageService.create({
        content,
        channelId,
        userId
      });

      res.status(201).json(message);
    } catch (error) {
      next(error);
    }
  },

  async getByChannel(req, res, next) {
    try {
      const { channelId } = req.params;
      const { limit = 50, before } = req.query;

      const messages = await messageService.getByChannel(
        channelId, 
        parseInt(limit),
        before
      );

      res.status(200).json(messages);
    } catch (error) {
      next(error);
    }
  },

  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const message = await messageService.getById(id);
      
      if (!message) {
        return res.status(404).json({ message: 'Message not found' });
      }

      res.status(200).json(message);
    } catch (error) {
      next(error);
    }
  },

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const { content } = req.body;
      const userId = req.user.userId;

      if (!content) {
        return res.status(400).json({ message: 'Content is required' });
      }

      const message = await messageService.update(id, content, userId);
      res.status(200).json(message);
    } catch (error) {
      next(error);
    }
  },

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const userId = req.user.userId;

      await messageService.delete(id, userId);
      res.status(200).json({ message: 'Message deleted successfully' });
    } catch (error) {
      next(error);
    }
  }
};

module.exports = messageController;
