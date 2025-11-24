const workspaceService = require('./workspace.service');

const workspaceController = {
  async create(req, res, next) {
    try {
      const { name, description } = req.body;
      const userId = req.user.userId;

      if (!name) {
        return res.status(400).json({ message: 'Workspace name is required' });
      }

      const workspace = await workspaceService.create({
        name,
        description,
        ownerId: userId
      });

      res.status(201).json(workspace);
    } catch (error) {
      next(error);
    }
  },

  async getAll(req, res, next) {
    try {
      const userId = req.user.userId;
      const workspaces = await workspaceService.getUserWorkspaces(userId);
      res.status(200).json(workspaces);
    } catch (error) {
      next(error);
    }
  },

  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const workspace = await workspaceService.getById(id);
      
      if (!workspace) {
        return res.status(404).json({ message: 'Workspace not found' });
      }

      res.status(200).json(workspace);
    } catch (error) {
      next(error);
    }
  },

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const { name, description } = req.body;

      const workspace = await workspaceService.update(id, {
        name,
        description
      });

      res.status(200).json(workspace);
    } catch (error) {
      next(error);
    }
  },

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      await workspaceService.delete(id);
      res.status(200).json({ message: 'Workspace deleted successfully' });
    } catch (error) {
      next(error);
    }
  },

  async addMember(req, res, next) {
    try {
      const { id } = req.params;
      const { userId, role } = req.body;

      if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
      }

      const member = await workspaceService.addMember(id, userId, role);
      res.status(201).json(member);
    } catch (error) {
      next(error);
    }
  },

  async removeMember(req, res, next) {
    try {
      const { id, userId } = req.params;
      await workspaceService.removeMember(id, userId);
      res.status(200).json({ message: 'Member removed successfully' });
    } catch (error) {
      next(error);
    }
  }
};

module.exports = workspaceController;
