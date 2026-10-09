# TASK CONTRACT (immutable product obligation)

**Original request:** # Agent Task Board - Complete Task Management Web App

## Goal
Build a production-quality, modern task-management web application where users can create, organize, prioritize, search, filter, edit, complete, and delete tasks. Data must persist after page refresh.

## Stack
- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context + useReducer (or Zustand if preferred)
- **Persistence**: localStorage (client-side) — no backend required
- **Build Target**: Static export for Cloudflare Pages deployment
- **Package Manager**: npm

## Core Features (All Mandatory)

### 1. Task Model
Each task has:
- `id`: string (UUID)
- `title`: string (required, max 200 chars)
- `description`: string (optional, max 2000 chars)
- `priority`: 'low' | 'medium' | 'high'
- `status`: 'todo' | 'in_progress' | 'done'
- `dueDate`: string (ISO date, optional)
- `tags`: string[] (array of tag strings)
- `createdAt`: string (ISO timestamp)
- `updatedAt`: string (ISO timestamp)

### 2. Task Creation
- Modal/form with all fields
- Title required validation
- Priority dropdown (Low/Medium/High with color coding)
- Status dropdown (Todo/In Progress/Done)
- Date picker for due date
- Tags input (comma-separated or chip-style)
- Created timestamp auto-set

### 3. Task Management
- Inline edit or edit modal
- Delete with confirmation
- Status change via dropdown or drag-drop (Kanban optional but nice)
- Priority change
- Mark complete toggle
- All changes persist to localStorage immediately

### 4. Dashboard / Main View
Display:
- **Stats bar**: Total tasks, Todo count, In Progress count, Completed count
- **Search**: Real-time filter by title, description, tags
- **Filters**: By status, priority, tags, due date (overdue, today, this week, no date)
- **Sort**: By created date, due date, priority, title
- **View modes**: List view and Kanban board view (3 columns: Todo/In Progress/Done)
- **Empty states** for no tasks, no search results

### 5. UI/UX Requirements
- **Design System**: Clean, modern, professional
- **Color coding**: Priority (red=high, amber=medium, green=low), Status (distinct colors)
- **Responsive**: Mobile-first, works on 375px to 1440px+
- **Accessibility**: WCAG AA — semantic HTML, keyboard navigation, focus visible, ARIA labels, color contrast
- **Animations**: Subtle transitions (150-200ms), no motion when prefers-reduced-motion
- **Loading states**: Skeleton loaders for initial render
- **Error handling**: Toast notifications for errors

### 6. Technical Quality
- **TypeScript strict mode**
- **ESLint + Prettier** configured
- **No console errors/warnings**
- **Build passes** with `next build` and static export
- **localStorage hydration** handled correctly (no SSR mismatch)
- **Code organization**: components/, hooks/, utils/, types/, contexts/

## Pages/Routes
- `/` — Main dashboard (default)
- No other routes needed (SPA within single page)

## Deployment
- Static export (`output: 'export'` in next.config.js)
- Deploy to Cloudflare Pages at `agent-task-board.newera.page.dev`
- Repository: public under Newera-AI-Agent

## Acceptance Criteria
1. App loads without errors
2. Can create task with all fields
3. Can edit any task field
4. Can delete task
5. Can change status/priority
6. Data persists after hard refresh (F5)
7. Search filters work in real-time
8. Filter by status/priority/tags works
9. Stats update correctly
10. Kanban view works (drag-drop or click to move)
11. Responsive on mobile and desktop
12. Accessible (keyboard nav, screen reader friendly)
13. Build passes and deploys successfully

## Out of Scope
- User authentication
- Backend/database
- Multi-user collaboration
- Recurring tasks
- Subtasks
- File attachments
- Notifications
- Dark mode (optional but welcome if time permits)

## Deliverables
- Complete Next.js project source
- Successful GitHub Actions build
- Live deployment at agent-task-board.newera.page.dev
**Normalized interpretation:** # Agent Task Board - Complete Task Management Web App; ## Goal; Build a production-quality, modern task-management web application where users can create, organize, prioritize, search, filter, edit, complete, and delete tasks.; Data must persist after page refresh.; ## Stack; Framework**: Next.js 14+ with App Router; Language**: TypeScript; Styling**: Tailwind CSS; State Management**: React Context + useReducer (or Zustand if preferred); Persistence**: localStorage (client-side) — no backend required; Build Target**: Static export for Cloudflare Pages deployment; Package Manager**: npm; ## Core Features (All Mandatory); ### 1.; Task Model; Each task has:; `id`: string (UUID); `title`: string (required, max 200 chars); `description`: string (optional, max 2000 chars); `priority`: 'low' | 'medium' | 'high'
**Execution profile:** marathon
**Created:** 2026-10-09T10:38:25.395Z

## Requirements

| ID | Description | Mandatory | Status | Evidence | Acceptance Criteria |
|----|-------------|-----------|--------|----------|---------------------|
| REQ-001 | # Agent Task Board - Complete Task Management Web App | YES | complete | Single-page task board with client-side routing via Next.js App Router | Concrete implementation evidence is recorded and the outcome matches the user request. |
| REQ-002 | ## Goal | YES | complete | Create, edit, delete tasks with title, description, priority, status, due date, tags | Concrete implementation evidence is recorded and the outcome matches the user request. |
| REQ-003 | Build a production-quality, modern task-management web application where users can create, organize, prioritize, search, filter, edit, complete, and delete tasks. | YES | complete | Task list view with filtering, sorting, and pagination | A relevant build or static verification passed after the latest relevant edit. |
| REQ-004 | Data must persist after page refresh. | YES | complete | Kanban board view with drag and drop columns | The requested file or implementation exists and its relevant contents were inspected. |
| REQ-005 | ## Stack | YES | complete | Toggle between list and Kanban views | Concrete implementation evidence is recorded and the outcome matches the user request. |
| REQ-006 | Framework**: Next.js 14+ with App Router | YES | complete | Filter by status, priority, tags, due date, search | Concrete implementation evidence is recorded and the outcome matches the user request. |
| REQ-007 | Language**: TypeScript | YES | pending | — | Concrete implementation evidence is recorded and the outcome matches the user request. |
| REQ-008 | Styling**: Tailwind CSS | YES | complete | Persist tasks to localStorage | Concrete implementation evidence is recorded and the outcome matches the user request. |
| REQ-009 | State Management**: React Context + useReducer (or Zustand if preferred) | YES | pending | — | Concrete implementation evidence is recorded and the outcome matches the user request. |
| REQ-010 | Persistence**: localStorage (client-side) — no backend required | YES | complete | Accessible modal dialogs with focus trap, ARIA labels, Escape to close | Concrete implementation evidence is recorded and the outcome matches the user request. |
| REQ-011 | Build Target**: Static export for Cloudflare Pages deployment | YES | pending | — | A relevant build or static verification passed after the latest relevant edit. |
| REQ-012 | Package Manager**: npm | YES | complete | Confirm dialogs for destructive actions | Concrete implementation evidence is recorded and the outcome matches the user request. |
| REQ-013 | ## Core Features (All Mandatory) | YES | complete | Responsive design: stacked on mobile, side-by-side on desktop | Concrete implementation evidence is recorded and the outcome matches the user request. |
| REQ-014 | ### 1. | YES | complete | WCAG AA contrast, semantic HTML, keyboard navigation, visible focus | Concrete implementation evidence is recorded and the outcome matches the user request. |
| REQ-015 | Task Model | YES | pending | — | Concrete implementation evidence is recorded and the outcome matches the user request. |
| REQ-016 | Each task has: | YES | complete | ESLint and Prettier configured, build passes with no errors | Concrete implementation evidence is recorded and the outcome matches the user request. |
| REQ-017 | `id`: string (UUID) | YES | complete | Next.js App Router with static export configuration | Concrete implementation evidence is recorded and the outcome matches the user request. |
| REQ-018 | `title`: string (required, max 200 chars) | YES | pending | — | Concrete implementation evidence is recorded and the outcome matches the user request. |
| REQ-019 | `description`: string (optional, max 2000 chars) | YES | complete | Debounced search, memoized components, virtualized lists, skeleton loading | Concrete implementation evidence is recorded and the outcome matches the user request. |
| REQ-020 | `priority`: 'low' | 'medium' | 'high' | YES | complete | priority: 'low' | 'medium' | 'high' with color coding in UI | Concrete implementation evidence is recorded and the outcome matches the user request. |

## Feature Matrix
- # Agent Task Board - Complete Task Management Web App
- ## Goal
- Build a production-quality, modern task-management web application where users can create, organize, prioritize, search, filter, edit, complete, and delete tasks.
- Data must persist after page refresh.
- ## Stack
- Framework**: Next.js 14+ with App Router
- Language**: TypeScript
- Styling**: Tailwind CSS
- State Management**: React Context + useReducer (or Zustand if preferred)
- Persistence**: localStorage (client-side) — no backend required
- Build Target**: Static export for Cloudflare Pages deployment
- Package Manager**: npm
- ## Core Features (All Mandatory)
- ### 1.
- Task Model
- Each task has:
- `id`: string (UUID)
- `title`: string (required, max 200 chars)
- `description`: string (optional, max 2000 chars)
- `priority`: 'low' | 'medium' | 'high'

## Test Matrix
- Build a production-quality, modern task-management web application where users can create, organize, prioritize, search, filter, edit, complete, and delete tasks.
- Build Target**: Static export for Cloudflare Pages deployment

## Platform Requirements
- Web
- Verified live URL

## Completion: 15/20 mandatory requirements have evidence
