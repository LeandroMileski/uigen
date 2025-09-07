# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

UIGen is an AI-powered React component generator with live preview capabilities. Users can describe components in chat, view real-time previews, and edit generated code. The application supports both authenticated users (with project persistence) and anonymous users with session-based component generation.

## Core Architecture

### Technology Stack
- **Frontend**: Next.js 15 with App Router, React 19, TypeScript
- **Styling**: Tailwind CSS v4 with Radix UI components
- **Backend**: Next.js API routes with Prisma ORM
- **Database**: SQLite (development)
- **AI Integration**: Anthropic Claude via Vercel AI SDK
- **Testing**: Vitest with React Testing Library

### Key Architectural Patterns

**Virtual File System**: Core abstraction (`src/lib/file-system.ts`) that manages component files in memory without writing to disk. Files are serialized/deserialized for persistence and passed to AI for code generation.

**Context-based State Management**: React contexts manage global state:
- `FileSystemContext`: Virtual file system operations and file management
- `ChatContext`: Chat messages and AI interaction state

**Tool-based AI Integration**: AI uses structured tools to manipulate files:
- `str_replace_editor`: Edit file contents using find/replace operations
- `file_manager`: Create, list, and manage files in the virtual file system

**Component Generation Pipeline**:
1. User describes component in chat
2. AI receives system prompt with React/TypeScript patterns
3. AI uses tools to create/modify files in virtual file system
4. Preview system renders components using Monaco Editor and Babel compilation
5. Changes are persisted to database for authenticated users

## Development Commands

### Setup and Development
```bash
# Complete project setup (install deps, generate Prisma client, run migrations)
npm run setup

# Start development server with Turbopack
npm run dev

# Start development server in background with logging
npm run dev:daemon

# Build production bundle
npm run build

# Start production server
npm start
```

### Code Quality and Testing
```bash
# Run ESLint
npm run lint

# Run all tests
npm test

# Run tests in watch mode
npm run test -- --watch
```

### Database Operations
```bash
# Reset database (drops all data and re-runs migrations)
npm run db:reset

# Generate Prisma client (run after schema changes)
npx prisma generate

# Run database migrations
npx prisma migrate dev
```

## File Organization

### Core Directories
- `src/app/` - Next.js App Router pages and API routes
- `src/components/` - Reusable UI components organized by domain
- `src/lib/` - Core business logic, utilities, and services
- `src/actions/` - Server actions for database operations
- `prisma/` - Database schema and migrations

### Key Components
- `ChatInterface` - Main chat UI with message handling
- `PreviewFrame` - Component preview with live reloading  
- `CodeEditor` - Monaco-based code editor with syntax highlighting
- `FileTree` - Virtual file system browser
- `AuthDialog` - Authentication forms and user management

### Core Services
- `file-system.ts` - Virtual file system implementation
- `auth.ts` - JWT-based authentication
- `provider.ts` - AI model provider configuration
- `tools/` - AI tool implementations for file operations

## Important Implementation Details

### AI System Prompt Location
The main generation prompt is in `src/lib/prompts/generation.tsx`. This defines how the AI understands the project structure and generates React components.

### Environment Variables
- `ANTHROPIC_API_KEY` - Required for AI functionality (optional, falls back to mock responses)
- Database automatically uses SQLite file in development

### File System Persistence
- Anonymous users: Files stored in memory only
- Authenticated users: Files serialized as JSON in database `Project.data` field
- Virtual file system handles path normalization and tree structure

### Component Preview System
Preview uses in-browser Babel compilation with preset configurations for React and TypeScript. Components are rendered in isolated iframe with proper error boundaries.

### Testing Approach
- Unit tests for core business logic (file system, transformers, utilities)
- Component tests using React Testing Library
- Test files located alongside source files in `__tests__/` directories

## Development Notes

When making changes to database schema, always run `npx prisma generate` followed by `npm run setup` to apply migrations.

The application gracefully handles missing API keys by providing static responses, making it easy to develop UI features without AI integration.

Virtual file system changes are automatically reflected in the preview - no manual refresh needed due to React context integration.
- Use comments sparingly. Only comment complext code.
- The database is defined in the @prisma\schema.prisma file. Reference it anytime you need to understand the structure of data stored in the database.