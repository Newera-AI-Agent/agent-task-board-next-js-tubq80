# CONTRACTS

AUTO-GENERATED after every successful file write. Do not edit by hand - your edits will be overwritten.

This is the authoritative list of what exists in this project. If a symbol is not listed here and not in a file you have read during this run, IT DOES NOT EXIST. Do not reference it. Read the file or write the symbol first.

## Dependencies (package.json)

- `@types/node` `^20.12.0`
- `@types/react` `^18.3.0`
- `@types/react-dom` `^18.3.0`
- `@types/uuid` `^10.0.0`
- `@typescript-eslint/eslint-plugin` `^7.18.0`
- `@typescript-eslint/parser` `^7.18.0`
- `autoprefixer` `^10.4.19`
- `eslint` `^8.57.0`
- `eslint-config-next` `14.2.0`
- `next` `^14.2.0`
- `postcss` `^8.4.38`
- `prettier` `^3.2.0`
- `prettier-plugin-tailwindcss` `^0.5.0`
- `react` `^18.3.0`
- `react-dom` `^18.3.0`
- `tailwindcss` `^3.4.0`
- `typescript` `^5.4.0`
- `uuid` `^10.0.0`

Scripts: `dev`, `build`, `start`, `lint`, `format`

## Files and public API

### `next-env.d.ts` - 6 lines
- exports: (nothing public)

### `next.config.js` - 11 lines
- exports: (nothing public)

### `postcss.config.js` - 7 lines
- exports: (nothing public)

### `src/app/globals.css` - 71 lines
- exports: (nothing public)

### `src/app/layout.tsx` - 20 lines
- imports: `src/app/globals.css`
- `RootLayout` (function)
- default export: `RootLayout`

### `src/app/page.tsx` - 271 lines
- `Page` (function)
- default export: `Page`

### `src/components/EmptyStates.tsx` - 96 lines
- `EmptyState` (function)
- `KanbanColumnEmpty` (function)

### `src/components/index.ts` - 10 lines
- imports: `src/components/TaskForm.tsx`, `src/components/TaskCard.tsx`, `src/components/TaskList.tsx`, `src/components/KanbanBoard.tsx`, `src/components/StatsBar.tsx`, `src/components/SearchFilter.tsx`, `src/components/EmptyStates.tsx`, `src/components/Modal.tsx`, `src/components/Toast.tsx`
- exports: (nothing public)

### `src/components/KanbanBoard.tsx` - 144 lines
- imports: `src/types/task.ts`, `src/components/TaskCard.tsx`, `src/utils/helpers.tsx`
- `KanbanBoard` (function)
- `KanbanBoardSkeleton` (function)

### `src/components/Modal.tsx` - 152 lines
- `Modal` (function)
- `ConfirmDialog` (function)

### `src/components/SearchFilter.tsx` - 242 lines
- imports: `src/types/task.ts`, `src/utils/helpers.tsx`
- `SearchFilter` (function)

### `src/components/StatsBar.tsx` - 73 lines
- imports: `src/types/task.ts`
- `StatsBar` (function)
- `StatsBarSkeleton` (function)

### `src/components/TaskCard.tsx` - 150 lines
- imports: `src/types/task.ts`, `src/utils/helpers.tsx`
- `TaskCard` (function)

### `src/components/TaskForm.tsx` - 245 lines
- imports: `src/types/task.ts`
- `TaskForm` (function)

### `src/components/TaskList.tsx` - 58 lines
- imports: `src/types/task.ts`, `src/components/TaskCard.tsx`, `src/utils/helpers.tsx`
- `TaskList` (function)
- `TaskListSkeleton` (function)

### `src/components/Toast.tsx` - 115 lines
- `ToastProvider` (function)
- `useToast` (function)

### `src/contexts/TaskContext.tsx` - 309 lines
- imports: `src/types/task.ts`
- `TaskProvider` (function)
- `useTaskContext` (function)
- `TaskContext` (const)

### `src/types/task.ts` - 70 lines
- `Task` (interface): createdAt, description, dueDate, id, priority, status, tags, title, updatedAt
- `TaskFormData` (interface): description, dueDate, priority, status, tags, title
- `FilterState` (interface): dueDate, priority, search, sortBy, sortOrder, status, tags
- `Stats` (interface): done, inProgress, todo, total
- `PRIORITY_OPTIONS` (const)
- `STATUS_OPTIONS` (const)
- `DUE_DATE_FILTER_OPTIONS` (const)
- `SORT_OPTIONS` (const)
- `Priority` (type)
- `Status` (type)
- `ViewMode` (type)

### `src/utils/helpers.tsx` - 110 lines
- imports: `src/types/task.ts`
- `formatDate` (function)
- `formatDateTime` (function)
- `isOverdue` (function)
- `isDueToday` (function)
- `isDueThisWeek` (function)
- `getPriorityColor` (function)
- `getStatusColor` (function)
- `getPriorityIcon` (function)
- `truncate` (function)
- `generateId` (function)
- `getAllTags` (function)

### `tailwind.config.ts` - 44 lines
- exports: (nothing public)

## Unresolved references

- `src/app/page.tsx:4` imports `../../types/task` - **this file does not exist yet**
- `src/app/page.tsx:5` imports `../../contexts/TaskContext` - **this file does not exist yet**
- `src/app/page.tsx:6` imports `../../components` - **this file does not exist yet**
