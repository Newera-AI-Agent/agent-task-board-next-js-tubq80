'use client'

import React from 'react'
import { Task } from '../types/task'
import { TaskCard } from './TaskCard'
import { formatDate, isOverdue, isDueToday } from '../utils/helpers'

interface TaskListProps {
  tasks: Task[]
  onEdit: (task: Task) => void
  onDelete: (id: string) => void
  onToggleStatus: (id: string) => void
}

export function TaskList({ tasks, onEdit, onDelete, onToggleStatus }: TaskListProps) {
  if (tasks.length === 0) {
    return null
  }

  return (
    <div className="space-y-3" role="list" aria-label="Task list">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleStatus={onToggleStatus}
          viewMode="list"
        />
      ))}
    </div>
  )
}

// Skeleton loader for TaskList
export function TaskListSkeleton() {
  return (
    <div className="space-y-3" aria-busy="true" aria-label="Loading tasks">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="card p-4 animate-pulse">
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 rounded border-2 border-gray-300" />
            <div className="flex-1">
              <div className="h-5 bg-gray-200 rounded w-3/4 mb-2" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
              <div className="mt-3 flex gap-2">
                <div className="h-5 bg-gray-200 rounded w-20" />
                <div className="h-5 bg-gray-200 rounded w-24" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
