'use client'

import React, { useState, useCallback } from 'react'
import { Task, TaskFormData, FilterState, ViewMode } from '../types/task'
import { TaskProvider, useTaskContext } from '../contexts/TaskContext'
import {
  TaskForm,
  TaskList,
  TaskListSkeleton,
  KanbanBoard,
  KanbanBoardSkeleton,
  StatsBar,
  StatsBarSkeleton,
  SearchFilter,
  EmptyState,
  Modal,
  ConfirmDialog,
  ToastProvider,
  useToast,
} from '../components'

function DashboardContent() {
  const { tasks, filter, viewMode, isLoading, isHydrated, addTask, updateTask, deleteTask, toggleTaskStatus, setFilter, setViewMode, getFilteredTasks, getStats } = useTaskContext()
  const { addToast } = useToast()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<TaskFormData | null>(null)
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null)
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null)

  const filteredTasks = getFilteredTasks()
  const stats = getStats()

  const handleOpenCreateModal = useCallback(() => {
    setEditingTask(null)
    setIsModalOpen(true)
  }, [])

  const handleEditTask = useCallback((task: Task) => {
    const formData: TaskFormData = {
      title: task.title,
      description: task.description,
      priority: task.priority,
      status: task.status,
      dueDate: task.dueDate || '',
      tags: task.tags.join(', '),
    }
    setEditingTask(formData)
    setEditingTaskId(task.id)
    setIsModalOpen(true)
  }, [])

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false)
    setEditingTask(null)
    setEditingTaskId(null)
  }, [])

  const handleSubmitTask = useCallback(
    (formData: TaskFormData) => {
      if (editingTaskId) {
        updateTask(editingTaskId, formData)
        addToast({ type: 'success', message: 'Task updated successfully' })
      } else {
        addTask(formData)
        addToast({ type: 'success', message: 'Task created successfully' })
      }
      handleCloseModal()
    },
    [editingTaskId, addTask, updateTask, addToast, handleCloseModal]
  )

  const handleDeleteTask = useCallback(
    (id: string) => {
      setDeleteConfirmId(id)
    },
    []
  )

  const handleConfirmDelete = useCallback(() => {
    if (deleteConfirmId) {
      deleteTask(deleteConfirmId)
      addToast({ type: 'success', message: 'Task deleted successfully' })
      setDeleteConfirmId(null)
    }
  }, [deleteConfirmId, deleteTask, addToast])

  const handleCancelDelete = useCallback(() => {
    setDeleteConfirmId(null)
  }, [])

  const handleToggleStatus = useCallback(
    (id: string) => {
      toggleTaskStatus(id)
      addToast({ type: 'info', message: 'Task status updated' })
    },
    [toggleTaskStatus, addToast]
  )

  const handleFilterChange = useCallback(
    (filterChange: Partial<FilterState>) => {
      setFilter(filterChange)
    },
    [setFilter]
  )

  const handleClearFilters = useCallback(() => {
    setFilter({
      search: '',
      status: 'all',
      priority: 'all',
      dueDate: 'all',
      tags: [],
      sortBy: 'createdAt',
      sortOrder: 'desc',
    })
  }, [setFilter])

  const handleViewModeChange = useCallback(
    (mode: ViewMode) => {
      setViewMode(mode)
    },
    [setViewMode]
  )

  // Loading skeleton while not hydrated
  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <h1 className="text-2xl font-bold text-gray-900">Agent Task Board</h1>
          </div>
        </header>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <StatsBarSkeleton />
          <div className="mt-6">
            <div className="card p-4 animate-pulse h-32" />
          </div>
          <div className="mt-6">
            {viewMode === 'list' ? <TaskListSkeleton /> : <KanbanBoardSkeleton />}
          </div>
        </main>
      </div>
    )
  }

  const viewModeButtons = [
    { mode: 'list' as ViewMode, icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg> },
    { mode: 'kanban' as ViewMode, icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" /></svg> },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Agent Task Board</h1>
              <p className="text-sm text-gray-500 mt-1">Manage your tasks efficiently</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2">
                <span className="text-sm text-gray-500">View:</span>
                <div className="flex bg-gray-100 rounded-lg p-1" role="radiogroup" aria-label="View mode">
                  {viewModeButtons.map(({ mode, icon }) => (
                    <button
                      key={mode}
                      onClick={() => handleViewModeChange(mode)}
                      className={
                        'px-3 py-1.5 rounded-md text-sm font-medium transition-colors ' +
                        (viewMode === mode
                          ? 'bg-white text-gray-900 shadow-sm'
                          : 'text-gray-500 hover:text-gray-700')
                      }
                      role="radio"
                      aria-checked={viewMode === mode}
                      aria-label={mode === 'list' ? 'List view' : 'Kanban view'}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </div>
              <button
                onClick={handleOpenCreateModal}
                className="btn-primary flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span className="hidden sm:inline">New Task</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Bar */}
        <StatsBar stats={stats} />

        {/* Search & Filters */}
        <div className="mt-6">
          <SearchFilter
            filter={filter}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
            allTags={Array.from(new Set(tasks.flatMap((t) => t.tags))).sort()}
          />
        </div>

        {/* Task List / Kanban Board */}
        <div className="mt-6" role="main" aria-label="Tasks">
          {filteredTasks.length === 0 ? (
            <EmptyState
              type={filter.search || filter.status !== 'all' || filter.priority !== 'all' || filter.dueDate !== 'all' || filter.tags.length > 0 ? 'no-results' : 'no-tasks'}
              onCreateTask={handleOpenCreateModal}
            />
          ) : viewMode === 'list' ? (
            <TaskList
              tasks={filteredTasks}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
              onToggleStatus={handleToggleStatus}
            />
          ) : (
            <KanbanBoard
              tasks={filteredTasks}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
              onToggleStatus={handleToggleStatus}
            />
          )}
        </div>
      </main>

      {/* Modals */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={editingTaskId ? 'Edit Task' : 'Create Task'} size="lg">
        <TaskForm
          initialData={editingTask || undefined}
          onSubmit={handleSubmitTask}
          onCancel={handleCloseModal}
          isEditing={!!editingTaskId}
        />
      </Modal>

      <ConfirmDialog
        isOpen={!!deleteConfirmId}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="Delete Task"
        message="Are you sure you want to delete this task? This action cannot be undone."
        confirmLabel="Delete"
        variant="danger"
      />
    </div>
  )
}

export default function Page() {
  return (
    <ToastProvider>
      <TaskProvider>
        <DashboardContent />
      </TaskProvider>
    </ToastProvider>
  )
}
