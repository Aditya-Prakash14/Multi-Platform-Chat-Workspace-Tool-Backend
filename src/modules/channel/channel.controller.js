const channelService = require('./channel.service');

const channelController = {
  async create(req, res, next) {
    try {
      const { name, description, workspaceId, type } = req.body;

      if (!name || !workspaceId) {
        return res.status(400).json({ 
          message: 'Channel name and workspace ID are required' 
        });
      }

      const channel = await channelService.create({
        name,
        description,
        workspaceId,
        type: type || 'PUBLIC'
      });

      res.status(201).json(channel);
    } catch (error) {
      next(error);
    }
  },

  async getByWorkspace(req, res, next) {
    try {
      const { workspaceId } = req.params;
      const channels = await channelService.getByWorkspace(workspaceId);
      res.status(200).json(channels);
    } catch (error) {
      next(error);
    }
  },

  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const channel = await channelService.getById(id);
      
      if (!channel) {
        return res.status(404).json({ message: 'Channel not found' });
      }

      res.status(200).json(channel);
    } catch (error) {
      next(error);
    }
  },

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const { name, description, type } = req.body;

      const channel = await channelService.update(id, {
        name,
        description,
        type
      });

      res.status(200).json(channel);
    } catch (error) {
      next(error);
    }
  },

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      await channelService.delete(id);
      res.status(200).json({ message: 'Channel deleted successfully' });
    } catch (error) {
      next(error);
    }
  }
};

module.exports = channelController;
