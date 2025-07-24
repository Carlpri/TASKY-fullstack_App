# Tasky Frontend

A React TypeScript frontend for the Tasky task management application built with Material-UI.

## Features

- **User Authentication**: Register, login, and logout functionality
- **Task Management**: Create, edit, delete, and mark tasks as complete/incomplete
- **Task Organization**: Separate views for active, completed, and deleted tasks
- **Profile Management**: Update personal information and avatar upload
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Modern UI**: Built with Material-UI components for a clean, professional look

## Tech Stack

- **React 18** with TypeScript
- **Material-UI (MUI)** for UI components
- **React Router** for navigation
- **Axios** for API communication
- **Context API** for state management

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

The application will open at `http://localhost:3000`.

## Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App

## Project Structure

```
src/
├── components/          # Reusable components
│   └── Header.tsx      # Navigation header
├── contexts/           # React contexts
│   └── AuthContext.tsx # Authentication context
├── pages/              # Page components
│   ├── LandingPage.tsx
│   ├── LoginPage.tsx
│   ├── RegisterPage.tsx
│   ├── TasksPage.tsx
│   ├── NewTaskPage.tsx
│   ├── CompletedTasksPage.tsx
│   ├── TrashPage.tsx
│   └── ProfilePage.tsx
├── App.tsx             # Main app component
└── index.tsx           # App entry point
```

## Features Overview

### Authentication
- User registration with validation
- Login with email/username and password
- JWT token-based authentication
- Protected routes

### Task Management
- **Active Tasks**: View and manage incomplete tasks
- **Completed Tasks**: View completed tasks with option to mark as incomplete
- **Trash**: Recover or permanently delete removed tasks
- **Task Actions**: Create, edit, delete, mark complete/incomplete

### User Profile
- Update personal information (name, username, email)
- Upload and manage profile avatar
- Change password with current password verification
- Display user initials as fallback avatar

### Navigation
- Responsive header with user menu
- Welcome message with user's first name
- Quick access to all main features

## API Integration

The frontend communicates with the backend API running on `http://localhost:5000` (configured via proxy in package.json).

### Key API Endpoints Used:
- Authentication: `/api/auth/*`
- Tasks: `/api/tasks/*`
- User Profile: `/api/user/*`

## Styling

The application uses Material-UI's theming system with:
- Custom gradient backgrounds
- Consistent color scheme
- Responsive breakpoints
- Hover effects and transitions
- Modern card-based layouts

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development

The project uses:
- **TypeScript** for type safety
- **ESLint** for code linting
- **Prettier** for code formatting
- **Material-UI** for consistent design system 


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
