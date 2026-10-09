'use client'

import React from 'react'
import { Stats } from '../types/task'

interface StatsBarProps {
  stats: Stats
}

export function StatsBar({ stats }: StatsBarProps) {
  const statItems = [
    { label: 'Total', value: stats.total, color: 'bg-primary-500', icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ) },
    { label: 'Todo', value: stats.todo, color: 'bg-gray-500', icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ) },
    { label: 'In Progress', value: stats.inProgress, color: 'bg-blue-500', icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
    ) },
    { label: 'Completed', value: stats.done, color: 'bg-green-500', icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ) },
  ]

  return (
    <div
      className="grid grid-cols-2 md:grid-cols-4 gap-4"
      role="region"
      aria-label="Task statistics"
    >
      {statItems.map((item) => (
        <div
          key={item.label}
          className="card p-4 text-center"
        >
          <div
            className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${item.color} text-white mb-3`}
            aria-hidden="true"
          >
            {item.icon}
          </div>
          <div className="text-3xl font-bold text-gray-900" aria-live="polite">{item.value}</div>
          <div className="text-sm text-gray-500 mt-1">{item.label}</div>
        </div>
      ))}
    </div>
  )
}

// Skeleton loader for StatsBar
export function StatsBarSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4" aria-busy="true" aria-label="Loading statistics">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="card p-4 text-center animate-pulse">
          <div className="w-12 h-12 rounded-xl bg-gray-200 mx-auto mb-3" />
          <div className="h-8 bg-gray-200 rounded w-16 mx-auto mb-1" />
          <div className="h-4 bg-gray-200 rounded w-24 mx-auto" />
        </div>
      ))}
    </div>
  )
}
