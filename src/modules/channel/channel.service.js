const prisma = require('../../db/client');

const channelService = {
  async create({ name, description, workspaceId, type }) {
    const channel = await prisma.channel.create({
      data: {
        name,
        description,
        workspaceId,
        type
      },
      include: {
        workspace: {
          select: {
            id: true,
            name: true
          }
        }
      }
    });

    return channel;
  },

  async getByWorkspace(workspaceId) {
    const channels = await prisma.channel.findMany({
      where: { workspaceId },
      include: {
        _count: {
          select: {
            messages: true
          }
        }
      },
      orderBy: {
        createdAt: 'asc'
      }
    });

    return channels;
  },

  async getById(channelId) {
    const channel = await prisma.channel.findUnique({
      where: { id: channelId },
      include: {
        workspace: {
          select: {
            id: true,
            name: true
          }
        },
        _count: {
          select: {
            messages: true
          }
        }
      }
    });

    return channel;
  },

  async update(channelId, data) {
    const channel = await prisma.channel.update({
      where: { id: channelId },
      data: {
        ...(data.name && { name: data.name }),
        ...(data.description !== undefined && { description: data.description }),
        ...(data.type && { type: data.type })
      },
      include: {
        workspace: {
          select: {
            id: true,
            name: true
          }
        }
      }
    });

    return channel;
  },

  async delete(channelId) {
    await prisma.channel.delete({
      where: { id: channelId }
    });
  }
};

module.exports = channelService;
