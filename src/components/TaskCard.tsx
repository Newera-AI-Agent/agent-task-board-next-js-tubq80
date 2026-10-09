'use client'

import React from 'react'
import { Task, Priority, Status } from '@/types/task'
import { formatDate, isOverdue, isDueToday, getPriorityColor, getStatusColor, truncate, getPriorityIcon } from '@/utils/helpers'

interface TaskCardProps {
  task: Task
  onEdit: (task: Task) => void
  onDelete: (id: string) => void
  onToggleStatus: (id: string) => void
  viewMode: 'list' | 'kanban'
}

export function TaskCard({ task, onEdit, onDelete, onToggleStatus, viewMode }: TaskCardProps) {
  const isTaskOverdue = isOverdue(task.dueDate)
  const isTaskDueToday = isDueToday(task.dueDate)

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onToggleStatus(task.id)
    }
  }

  return (
    <article
      className={`card p-4 transition-all duration-200 ${viewMode === 'kanban' ? 'w-full' : ''}`}
      role="listitem"
      aria-label={`Task: ${task.title}, Priority: ${task.priority}, Status: ${task.status}`}
    >
      <div className="flex items-start gap-3">
        <button
          onClick={() => onToggleStatus(task.id)}
          onKeyDown={handleKeyDown}
          className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors focus-ring ${
            task.status === 'done'
              ? 'bg-green-500 border-green-500 text-white'
              : 'border-gray-300 text-transparent hover:border-primary-500'
          }`}
          aria-label={task.status === 'done' ? 'Mark as incomplete' : 'Mark as complete'}
          aria-pressed={task.status === 'done'}
        >
          {task.status === 'done' && (
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className={`font-medium text-gray-900 truncate ${task.status === 'done' ? 'line-through text-gray-500' : ''}`}>
              {task.title}
            </h3>
            <div className="flex items-center gap-1 flex-shrink-0">
              <span
                className={`badge ${getPriorityColor(task.priority)}`}
                aria-label={`Priority: ${task.priority}`}
              >
                {getPriorityIcon(task.priority)}
                <span className="ml-1 capitalize">{task.priority}</span>
              </span>
              <span
                className={`badge ${getStatusColor(task.status)}`}
                aria-label={`Status: ${task.status.replace('_', ' ')}`}
              >
                <span className="capitalize">{task.status.replace('_', ' ')}</span>
              </span>
            </div>
          </div>

          {task.description && (
            <p
              className={`mt-2 text-sm text-gray-600 line-clamp-2 ${task.status === 'done' ? 'line-through text-gray-400' : ''}`}
            >
              {truncate(task.description, 150)}
            </p>
          )}

          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-gray-500">
            {task.dueDate && (
              <span
                className={`flex items-center gap-1 px-2 py-0.5 rounded ${
                  isTaskOverdue
                    ? 'bg-red-50 text-red-700'
                    : isTaskDueToday
                    ? 'bg-amber-50 text-amber-700'
                    : 'bg-gray-50 text-gray-700'
                }`}
                aria-label={`Due: ${formatDate(task.dueDate)}${isTaskOverdue ? ' (Overdue)' : isTaskDueToday ? ' (Due today)' : ''}`}
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {formatDate(task.dueDate)}
                {isTaskOverdue && <span className="font-medium">(Overdue)</span>}
                {isTaskDueToday && !isTaskOverdue && <span className="font-medium">(Today)</span>}
              </span>
            )}

            {task.tags.length > 0 && (
              <div className="flex flex-wrap gap-1" aria-label="Tags">
                {task.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
                {task.tags.length > 3 && (
                  <span className="px-2 py-0.5 bg-gray-100 text-gray-500 rounded text-xs">
                    +{task.tags.length - 3}
                  </span>
                )}
              </div>
            )}

            <span className="ml-auto" aria-label={`Created ${formatDate(task.createdAt)}`}>
              Created {formatDate(task.createdAt)}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-1 flex-shrink-0">
          <button
            onClick={() => onEdit(task)}
            className="btn-ghost p-2 text-gray-500 hover:text-gray-700 focus-ring rounded"
            aria-label={`Edit task: ${task.title}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="btn-ghost p-2 text-gray-500 hover:text-red-600 focus-ring rounded"
            aria-label={`Delete task: ${task.title}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </article>
  )
}
