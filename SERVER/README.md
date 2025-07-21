# Tasky Backend

A Node.js/Express.js backend for the Tasky task management application.

## Features

- User authentication with JWT
- Task CRUD operations
- User profile management
- Avatar upload functionality with Cloudinary
- PostgreSQL database with Prisma ORM

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory with the following variables:
```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/tasky_db"

# JWT
JWT_SECRET="your-super-secret-jwt-key-here"

# Server
PORT=5000
NODE_ENV=development

# Client URL for CORS
CLIENT_URL="http://localhost:3000"

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
```

3. Set up the database:
```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Or run migrations
npm run db:migrate
```

4. Start the development server:
```bash
npm run dev
```

## Cloudinary Setup

1. Create a free account at [Cloudinary](https://cloudinary.com/)
2. Get your credentials from the Dashboard
3. Add them to your `.env` file:
   - `CLOUDINARY_CLOUD_NAME`: Your cloud name
   - `CLOUDINARY_API_KEY`: Your API key
   - `CLOUDINARY_API_SECRET`: Your API secret

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `PATCH /api/auth/password` - Update password

### Tasks
- `POST /api/tasks` - Create a new task
- `GET /api/tasks` - Get all tasks (with status filter)
- `GET /api/tasks/:id` - Get a specific task
- `PATCH /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task (soft delete)
- `PATCH /api/tasks/complete/:id` - Mark task as complete
- `PATCH /api/tasks/incomplete/:id` - Mark task as incomplete
- `PATCH /api/tasks/restore/:id` - Restore a deleted task

### User Profile
- `GET /api/user` - Get current user details
- `PATCH /api/user` - Update user profile
- `POST /api/user/avatar` - Upload avatar to Cloudinary
- `DELETE /api/user/avatar` - Remove avatar from Cloudinary

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema to database
- `npm run db:migrate` - Run database migrations
- `npm run db:studio` - Open Prisma Studio 