export type Priority = 'low' | 'medium' | 'high'
export type Status = 'todo' | 'in_progress' | 'done'

export interface Task {
  id: string
  title: string
  description: string
  priority: Priority
  status: Status
  dueDate: string | null
  tags: string[]
  createdAt: string
  updatedAt: string
}

export interface TaskFormData {
  title: string
  description: string
  priority: Priority
  status: Status
  dueDate: string
  tags: string
}

export interface FilterState {
  search: string
  status: Status | 'all'
  priority: Priority | 'all'
  tags: string[]
  dueDate: 'all' | 'overdue' | 'today' | 'this_week' | 'no_date'
  sortBy: 'createdAt' | 'dueDate' | 'priority' | 'title'
  sortOrder: 'asc' | 'desc'
}

export interface Stats {
  total: number
  todo: number
  inProgress: number
  done: number
}

export const PRIORITY_OPTIONS: { value: Priority; label: string; color: string }[] = [
  { value: 'low', label: 'Low', color: 'bg-priority-low' },
  { value: 'medium', label: 'Medium', color: 'bg-priority-medium' },
  { value: 'high', label: 'High', color: 'bg-priority-high' },
]

export const STATUS_OPTIONS: { value: Status; label: string; color: string }[] = [
  { value: 'todo', label: 'Todo', color: 'bg-status-todo' },
  { value: 'in_progress', label: 'In Progress', color: 'bg-status-in_progress' },
  { value: 'done', label: 'Done', color: 'bg-status-done' },
]

export const DUE_DATE_FILTER_OPTIONS = [
  { value: 'all', label: 'All Dates' },
  { value: 'overdue', label: 'Overdue' },
  { value: 'today', label: 'Today' },
  { value: 'this_week', label: 'This Week' },
  { value: 'no_date', label: 'No Date' },
] as const

export type ViewMode = 'list' | 'kanban'

export const SORT_OPTIONS = [
  { value: 'createdAt', label: 'Created Date' },
  { value: 'dueDate', label: 'Due Date' },
  { value: 'priority', label: 'Priority' },
  { value: 'title', label: 'Title' },
] as const
