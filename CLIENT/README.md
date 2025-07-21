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