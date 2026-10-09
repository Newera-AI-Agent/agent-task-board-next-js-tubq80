'use client'

import React, { useState } from 'react'
import { Task, Status } from '../types/task'
import { TaskCard } from './TaskCard'
import { getAllTags } from '../utils/helpers'

interface KanbanBoardProps {
  tasks: Task[]
  onEdit: (task: Task) => void
  onDelete: (id: string) => void
  onToggleStatus: (id: string) => void
}

const STATUS_COLUMNS: { id: Status; label: string }[] = [
  { id: 'todo', label: 'Todo' },
  { id: 'in_progress', label: 'In Progress' },
  { id: 'done', label: 'Done' },
]

export function KanbanBoard({ tasks, onEdit, onDelete, onToggleStatus }: KanbanBoardProps) {
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null)

  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    setDraggedTaskId(taskId)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (e: React.DragEvent, targetStatus: Status) => {
    e.preventDefault()
    if (draggedTaskId) {
      const task = tasks.find((t) => t.id === draggedTaskId)
      if (task && task.status !== targetStatus) {
        onToggleStatus(draggedTaskId)
        // If we need to move multiple steps, we'd need additional logic
        // For now, toggleStatus cycles through statuses
      }
    }
    setDraggedTaskId(null)
  }

  const handleDragEnd = () => {
    setDraggedTaskId(null)
  }

  const getTasksByStatus = (status: Status) => {
    return tasks.filter((task) => task.status === status)
  }

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-3 gap-4"
      role="region"
      aria-label="Kanban board"
    >
      {STATUS_COLUMNS.map((column) => {
        const columnTasks = getTasksByStatus(column.id)
        return (
          <div
            key={column.id}
            className="bg-gray-50 rounded-xl border border-gray-200 flex flex-col min-h-[500px]"
            role="list"
            aria-label={`${column.label} tasks`}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, column.id)}
          >
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-gray-900 capitalize">{column.label}</h2>
                <span
                  className="badge bg-primary-100 text-primary-700"
                  aria-label={`${columnTasks.length} tasks`}
                >
                  {columnTasks.length}
                </span>
              </div>
            </div>
            <div
              className="flex-1 overflow-y-auto p-3 space-y-3"
              role="list"
            >
              {columnTasks.length === 0 ? (
                <div
                  className="text-center py-8 text-gray-400 text-sm"
                  role="status"
                  aria-label={`No tasks in ${column.label}`}
                >
                  <svg className="w-12 h-12 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                  <p>No tasks</p>
                  <p className="text-xs">Drop tasks here</p>
                </div>
              ) : (
                columnTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onToggleStatus={onToggleStatus}
                    viewMode="kanban"
                  />
                ))
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

// Skeleton loader for KanbanBoard
export function KanbanBoardSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4" aria-busy="true" aria-label="Loading Kanban board">
      {STATUS_COLUMNS.map((column) => (
        <div key={column.id} className="bg-gray-50 rounded-xl border border-gray-200 flex flex-col min-h-[500px]">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="h-5 bg-gray-200 rounded w-24 animate-pulse" />
              <div className="h-5 bg-gray-200 rounded w-12 animate-pulse" />
            </div>
          </div>
          <div className="flex-1 p-3 space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="card p-4 animate-pulse">
                <div className="h-5 bg-gray-200 rounded w-3/4 mb-2" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
