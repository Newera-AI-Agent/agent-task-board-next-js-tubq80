'use client'

import React from 'react'

interface EmptyStateProps {
  type: 'no-tasks' | 'no-results' | 'no-tasks-kanban'
  onCreateTask?: () => void
}

export function EmptyState({ type, onCreateTask }: EmptyStateProps) {
  const configs = {
    'no-tasks': {
      icon: (
        <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
      title: 'No tasks yet',
      description: 'Get started by creating your first task. Click the button below to add a new task.',
      actionLabel: 'Create Task',
    },
    'no-results': {
      icon: (
        <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'No tasks found',
      description: 'Try adjusting your search or filters to find what you\'re looking for.',
      actionLabel: 'Clear Filters',
    },
    'no-tasks-kanban': {
      icon: (
        <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      title: 'No tasks in this column',
      description: 'Drag tasks here or create a new one.',
      actionLabel: 'Add Task',
    },
  }

  const config = configs[type]

  return (
    <div
      className="flex flex-col items-center justify-center py-12 px-4 text-center"
      role="status"
      aria-live="polite"
    >
      <div className="mb-4" aria-hidden="true">{config.icon}</div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">{config.title}</h3>
      <p className="text-gray-500 mb-6 max-w-md">{config.description}</p>
      {onCreateTask && (
        <button
          onClick={onCreateTask}
          className="btn-primary"
        >
          {config.actionLabel}
        </button>
      )}
    </div>
  )
}

// Kanban column empty state
export function KanbanColumnEmpty({ onAddTask }: { onAddTask?: () => void }) {
  return (
    <div
      className="flex flex-col items-center justify-center py-8 px-2 text-center h-full"
      role="status"
      aria-live="polite"
    >
      <svg
        className="w-10 h-10 text-gray-300 mb-2"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
      </svg>
      <p className="text-xs text-gray-400">Drop tasks here</p>
      {onAddTask && (
        <button
          onClick={onAddTask}
          className="mt-2 text-xs text-primary-600 hover:text-primary-700 font-medium"
        >
          + Add Task
        </button>
      )}
    </div>
  )
}
