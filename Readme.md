# Multi-Platform Chat Workspace - Backend

A Node.js/Express backend API for a multi-platform chat workspace application with authentication, workspaces, channels, and real-time messaging support.

##  Project Structure

```
backend/
├── prisma/
│   └── schema.prisma           # Database schema
│
├── src/
│   ├── app.js                  # Express app configuration
│   ├── server.js               # Server entry point
│   │
│   ├── config/
│   │   └── cors.js             # CORS configuration
│   │
│   ├── db/
│   │   └── client.js           # Prisma client instance
│   │
│   ├── middlewares/
│   │   ├── auth.js             # JWT authentication middleware
│   │   └── errorHandler.js    # Global error handler
│   │
│   └── modules/
│       ├── auth/
│       │   ├── auth.controller.js
│       │   ├── auth.service.js
│       │   └── auth.routes.js
│       │
│       ├── workspace/
│       │   ├── workspace.controller.js
│       │   ├── workspace.service.js
│       │   └── workspace.routes.js
│       │
│       ├── channel/
│       │   ├── channel.controller.js
│       │   ├── channel.service.js
│       │   └── channel.routes.js
│       │
│       ├── message/
│       │   ├── message.controller.js
│       │   ├── message.service.js
│       │   └── message.routes.js
│       │
│       └── user/
│           ├── user.controller.js
│           ├── user.service.js
│           └── user.routes.js
│
├── .env                        # Environment variables
├── .env.example                # Environment variables template
├── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- PostgreSQL database
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Then edit `.env` with your actual configuration.

4. Run Prisma migrations:
   ```bash
   npm run prisma:migrate
   ```

5. Generate Prisma Client:
   ```bash
   npm run prisma:generate
   ```

### Running the Server

**Development mode (with hot reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

## 📡 API Endpoints

### Authentication (`/api/auth`)
- `POST /register` - Register new user
- `POST /login` - Login user
- `POST /refresh` - Refresh access token
- `POST /logout` - Logout user (protected)

### Users (`/api/users`)
- `GET /me` - Get current user profile (protected)
- `PUT /me` - Update current user profile (protected)
- `PUT /me/status` - Update user status (protected)
- `GET /search?query=` - Search users (protected)
- `GET /:id` - Get user by ID (protected)

### Workspaces (`/api/workspaces`)
- `POST /` - Create workspace (protected)
- `GET /` - Get all user workspaces (protected)
- `GET /:id` - Get workspace by ID (protected)
- `PUT /:id` - Update workspace (protected)
- `DELETE /:id` - Delete workspace (protected)
- `POST /:id/members` - Add member to workspace (protected)
- `DELETE /:id/members/:userId` - Remove member (protected)

### Channels (`/api/channels`)
- `POST /` - Create channel (protected)
- `GET /workspace/:workspaceId` - Get channels by workspace (protected)
- `GET /:id` - Get channel by ID (protected)
- `PUT /:id` - Update channel (protected)
- `DELETE /:id` - Delete channel (protected)

### Messages (`/api/messages`)
- `POST /` - Create message (protected)
- `GET /channel/:channelId` - Get messages by channel (protected)
- `GET /:id` - Get message by ID (protected)
- `PUT /:id` - Update message (protected)
- `DELETE /:id` - Delete message (protected)

## 🔧 Available Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run prisma:generate` - Generate Prisma Client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:studio` - Open Prisma Studio

## 🏗️ Architecture

### Modular Structure
Each feature module contains:
- **Controller**: Handles HTTP requests/responses
- **Service**: Contains business logic and database operations
- **Routes**: Defines API endpoints

### Middleware
- **auth.js**: Validates JWT tokens for protected routes
- **errorHandler.js**: Centralized error handling with Prisma error support

### Database
- **Prisma ORM** for type-safe database access
- **PostgreSQL** as the database

## 🔐 Authentication

JWT-based authentication with:
- Access tokens (short-lived)
- Refresh tokens (long-lived)
- Secure password hashing with bcrypt

## 🌐 CORS Configuration

Configurable CORS settings in `src/config/cors.js` with environment variable support.

## 📝 Environment Variables

See `.env.example` for required environment variables:
- Database connection
- JWT secrets
- Server configuration
- CORS settings

## 🤝 Contributing

1. Follow the modular structure
2. Keep controllers thin, services fat
3. Use Prisma for all database operations
4. Add proper error handling
5. Document new endpoints

## 📄 License

ISC
