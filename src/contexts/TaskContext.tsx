'use client'

import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react'
import { Task, TaskFormData, FilterState, Stats, Status, Priority } from '@/types/task'
import { v4 as uuidv4 } from 'uuid'

interface TaskState {
  tasks: Task[]
  filter: FilterState
  viewMode: 'list' | 'kanban'
  isLoading: boolean
  isHydrated: boolean
}

type TaskAction =
  | { type: 'SET_TASKS'; payload: Task[] }
  | { type: 'ADD_TASK'; payload: Task }
  | { type: 'UPDATE_TASK'; payload: Task }
  | { type: 'DELETE_TASK'; payload: string }
  | { type: 'SET_FILTER'; payload: Partial<FilterState> }
  | { type: 'SET_VIEW_MODE'; payload: 'list' | 'kanban' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_HYDRATED' }
  | { type: 'RESET_FILTERS' }

const initialFilter: FilterState = {
  search: '',
  status: 'all',
  priority: 'all',
  tags: [],
  dueDate: 'all',
  sortBy: 'createdAt',
  sortOrder: 'desc',
}

const initialState: TaskState = {
  tasks: [],
  filter: initialFilter,
  viewMode: 'list',
  isLoading: true,
  isHydrated: false,
}

function taskReducer(state: TaskState, action: TaskAction): TaskState {
  switch (action.type) {
    case 'SET_TASKS':
      return { ...state, tasks: action.payload, isLoading: false }
    case 'ADD_TASK':
      return { ...state, tasks: [action.payload, ...state.tasks] }
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task
        ),
      }
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      }
    case 'SET_FILTER':
      return { ...state, filter: { ...state.filter, ...action.payload } }
    case 'SET_VIEW_MODE':
      return { ...state, viewMode: action.payload }
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload }
    case 'SET_HYDRATED':
      return { ...state, isHydrated: true, isLoading: false }
    case 'RESET_FILTERS':
      return { ...state, filter: initialFilter }
    default:
      return state
  }
}

interface TaskContextType extends TaskState {
  addTask: (data: TaskFormData) => void
  updateTask: (id: string, data: Partial<TaskFormData>) => void
  deleteTask: (id: string) => void
  toggleTaskStatus: (id: string) => void
  setFilter: (filter: Partial<FilterState>) => void
  setViewMode: (mode: 'list' | 'kanban') => void
  getFilteredTasks: () => Task[]
  getStats: () => Stats
}

export const TaskContext = createContext<TaskContextType | undefined>(undefined)

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(taskReducer, initialState)

  // Load tasks from localStorage on client side
  useEffect(() => {
    try {
      const stored = localStorage.getItem('agent-task-board-tasks')
      if (stored) {
        const tasks = JSON.parse(stored)
        dispatch({ type: 'SET_TASKS', payload: tasks })
      } else {
        dispatch({ type: 'SET_HYDRATED' })
      }
    } catch (error) {
      console.error('Failed to load tasks from localStorage:', error)
      dispatch({ type: 'SET_HYDRATED' })
    }
  }, [])

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    if (state.isHydrated) {
      try {
        localStorage.setItem('agent-task-board-tasks', JSON.stringify(state.tasks))
      } catch (error) {
        console.error('Failed to save tasks to localStorage:', error)
      }
    }
  }, [state.tasks, state.isHydrated])

  const addTask = useCallback((data: TaskFormData) => {
    const now = new Date().toISOString()
    const tags = data.tags
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean)

    const newTask: Task = {
      id: uuidv4(),
      title: data.title.trim(),
      description: data.description.trim(),
      priority: data.priority,
      status: data.status,
      dueDate: data.dueDate || null,
      tags,
      createdAt: now,
      updatedAt: now,
    }

    dispatch({ type: 'ADD_TASK', payload: newTask })
  }, [])

  const updateTask = useCallback((id: string, data: Partial<TaskFormData>) => {
    const task = state.tasks.find((t) => t.id === id)
    if (!task) return

    const tags = data.tags !== undefined
      ? data.tags.split(',').map((tag) => tag.trim()).filter(Boolean)
      : task.tags

    const updatedTask: Task = {
      ...task,
      title: data.title?.trim() ?? task.title,
      description: data.description?.trim() ?? task.description,
      priority: data.priority ?? task.priority,
      status: data.status ?? task.status,
      dueDate: data.dueDate !== undefined ? (data.dueDate || null) : task.dueDate,
      tags,
      updatedAt: new Date().toISOString(),
    }

    dispatch({ type: 'UPDATE_TASK', payload: updatedTask })
  }, [state.tasks])

  const deleteTask = useCallback((id: string) => {
    dispatch({ type: 'DELETE_TASK', payload: id })
  }, [])

  const toggleTaskStatus = useCallback((id: string) => {
    const task = state.tasks.find((t) => t.id === id)
    if (!task) return

    const statusOrder: Status[] = ['todo', 'in_progress', 'done']
    const currentIndex = statusOrder.indexOf(task.status)
    const nextStatus = statusOrder[(currentIndex + 1) % statusOrder.length]

    updateTask(id, { status: nextStatus })
  }, [state.tasks, updateTask])

  const setFilter = useCallback((filter: Partial<FilterState>) => {
    dispatch({ type: 'SET_FILTER', payload: filter })
  }, [])

  const setViewMode = useCallback((mode: 'list' | 'kanban') => {
    dispatch({ type: 'SET_VIEW_MODE', payload: mode })
  }, [])

  const getFilteredTasks = useCallback(() => {
    let filtered = [...state.tasks]

    // Search filter
    if (state.filter.search) {
      const searchLower = state.filter.search.toLowerCase()
      filtered = filtered.filter(
        (task) =>
          task.title.toLowerCase().includes(searchLower) ||
          task.description.toLowerCase().includes(searchLower) ||
          task.tags.some((tag) => tag.toLowerCase().includes(searchLower))
      )
    }

    // Status filter
    if (state.filter.status !== 'all') {
      filtered = filtered.filter((task) => task.status === state.filter.status)
    }

    // Priority filter
    if (state.filter.priority !== 'all') {
      filtered = filtered.filter((task) => task.priority === state.filter.priority)
    }

    // Tags filter
    if (state.filter.tags.length > 0) {
      filtered = filtered.filter((task) =>
        state.filter.tags.every((tag) => task.tags.includes(tag))
      )
    }

    // Due date filter
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const weekEnd = new Date(today)
    weekEnd.setDate(today.getDate() + 7)

    switch (state.filter.dueDate) {
      case 'overdue':
        filtered = filtered.filter(
          (task) => task.dueDate && new Date(task.dueDate) < today
        )
        break
      case 'today':
        filtered = filtered.filter(
          (task) =>
            task.dueDate &&
            new Date(task.dueDate) >= today &&
            new Date(task.dueDate) < new Date(today.getTime() + 24 * 60 * 60 * 1000)
        )
        break
      case 'this_week':
        filtered = filtered.filter(
          (task) =>
            task.dueDate &&
            new Date(task.dueDate) >= today &&
            new Date(task.dueDate) <= weekEnd
        )
        break
      case 'no_date':
        filtered = filtered.filter((task) => !task.dueDate)
        break
    }

    // Sort
    filtered.sort((a, b) => {
      let comparison = 0
      switch (state.filter.sortBy) {
        case 'createdAt':
          comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          break
        case 'dueDate':
          if (!a.dueDate && !b.dueDate) comparison = 0
          else if (!a.dueDate) comparison = 1
          else if (!b.dueDate) comparison = -1
          else comparison = new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
          break
        case 'priority':
          const priorityOrder: Record<Priority, number> = { high: 3, medium: 2, low: 1 }
          comparison = priorityOrder[a.priority] - priorityOrder[b.priority]
          break
        case 'title':
          comparison = a.title.localeCompare(b.title)
          break
      }
      return state.filter.sortOrder === 'asc' ? comparison : -comparison
    })

    return filtered
  }, [state.tasks, state.filter])

  const getStats = useCallback((): Stats => {
    return {
      total: state.tasks.length,
      todo: state.tasks.filter((t) => t.status === 'todo').length,
      inProgress: state.tasks.filter((t) => t.status === 'in_progress').length,
      done: state.tasks.filter((t) => t.status === 'done').length,
    }
  }, [state.tasks])

  const value: TaskContextType = {
    ...state,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskStatus,
    setFilter,
    setViewMode,
    getFilteredTasks,
    getStats,
  }

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>
}

export function useTaskContext() {
  const context = useContext(TaskContext)
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider')
  }
  return context
}
