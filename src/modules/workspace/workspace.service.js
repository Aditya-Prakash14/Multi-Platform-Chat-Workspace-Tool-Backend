const prisma = require('../../db/client');

const workspaceService = {
  async create({ name, description, ownerId }) {
    const workspace = await prisma.workspace.create({
      data: {
        name,
        description,
        ownerId,
        members: {
          create: {
            userId: ownerId,
            role: 'OWNER'
          }
        }
      },
      include: {
        owner: {
          select: {
            id: true,
            username: true,
            displayName: true,
            email: true
          }
        },
        members: {
          include: {
            user: {
              select: {
                id: true,
                username: true,
                displayName: true,
                email: true
              }
            }
          }
        }
      }
    });

    return workspace;
  },

  async getUserWorkspaces(userId) {
    const workspaces = await prisma.workspace.findMany({
      where: {
        members: {
          some: {
            userId
          }
        }
      },
      include: {
        owner: {
          select: {
            id: true,
            username: true,
            displayName: true
          }
        },
        _count: {
          select: {
            members: true,
            channels: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return workspaces;
  },

  async getById(workspaceId) {
    const workspace = await prisma.workspace.findUnique({
      where: { id: workspaceId },
      include: {
        owner: {
          select: {
            id: true,
            username: true,
            displayName: true,
            email: true
          }
        },
        members: {
          include: {
            user: {
              select: {
                id: true,
                username: true,
                displayName: true,
                email: true
              }
            }
          }
        },
        channels: {
          orderBy: {
            createdAt: 'asc'
          }
        }
      }
    });

    return workspace;
  },

  async update(workspaceId, data) {
    const workspace = await prisma.workspace.update({
      where: { id: workspaceId },
      data: {
        ...(data.name && { name: data.name }),
        ...(data.description !== undefined && { description: data.description })
      },
      include: {
        owner: {
          select: {
            id: true,
            username: true,
            displayName: true
          }
        }
      }
    });

    return workspace;
  },

  async delete(workspaceId) {
    await prisma.workspace.delete({
      where: { id: workspaceId }
    });
  },

  async addMember(workspaceId, userId, role = 'MEMBER') {
    const member = await prisma.workspaceMember.create({
      data: {
        workspaceId,
        userId,
        role
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            displayName: true,
            email: true
          }
        }
      }
    });

    return member;
  },

  async removeMember(workspaceId, userId) {
    await prisma.workspaceMember.delete({
      where: {
        workspaceId_userId: {
          workspaceId,
          userId
        }
      }
    });
  }
};

module.exports = workspaceService;
