const prisma = require('../../db/client');

const messageService = {
  async create({ content, channelId, userId }) {
    const message = await prisma.message.create({
      data: {
        content,
        channelId,
        userId
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            displayName: true,
            avatarUrl: true
          }
        },
        channel: {
          select: {
            id: true,
            name: true,
            workspaceId: true
          }
        }
      }
    });

    return message;
  },

  async getByChannel(channelId, limit = 50, beforeId = null) {
    const messages = await prisma.message.findMany({
      where: {
        channelId,
        ...(beforeId && {
          id: {
            lt: beforeId
          }
        })
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            displayName: true,
            avatarUrl: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: limit
    });

    return messages.reverse();
  },

  async getById(messageId) {
    const message = await prisma.message.findUnique({
      where: { id: messageId },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            displayName: true,
            avatarUrl: true
          }
        },
        channel: {
          select: {
            id: true,
            name: true,
            workspaceId: true
          }
        }
      }
    });

    return message;
  },

  async update(messageId, content, userId) {
    // First check if the user owns the message
    const existingMessage = await prisma.message.findUnique({
      where: { id: messageId }
    });

    if (!existingMessage) {
      throw new Error('Message not found');
    }

    if (existingMessage.userId !== userId) {
      throw new Error('Unauthorized to update this message');
    }

    const message = await prisma.message.update({
      where: { id: messageId },
      data: {
        content,
        updatedAt: new Date()
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            displayName: true,
            avatarUrl: true
          }
        }
      }
    });

    return message;
  },

  async delete(messageId, userId) {
    // First check if the user owns the message
    const existingMessage = await prisma.message.findUnique({
      where: { id: messageId }
    });

    if (!existingMessage) {
      throw new Error('Message not found');
    }

    if (existingMessage.userId !== userId) {
      throw new Error('Unauthorized to delete this message');
    }

    await prisma.message.delete({
      where: { id: messageId }
    });
  }
};

module.exports = messageService;
