const express = require('express');
const corsMiddleware = require('./config/cors');
const errorHandler = require('./middlewares/errorHandler');

// Import routes
const authRoutes = require('./modules/auth/auth.routes');
const userRoutes = require('./modules/user/user.routes');
const workspaceRoutes = require('./modules/workspace/workspace.routes');
const channelRoutes = require('./modules/channel/channel.routes');
const messageRoutes = require('./modules/message/message.routes');

const app = express();

// Middlewares
app.use(corsMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/workspaces', workspaceRoutes);
app.use('/api/channels', channelRoutes);
app.use('/api/messages', messageRoutes);

// Error handling middleware (must be last)
app.use(errorHandler);

module.exports = app;
