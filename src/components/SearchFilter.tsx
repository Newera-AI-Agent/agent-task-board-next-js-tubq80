'use client'

import React, { useState, useEffect } from 'react'
import { FilterState, Status, Priority, DUE_DATE_FILTER_OPTIONS, SORT_OPTIONS, STATUS_OPTIONS, PRIORITY_OPTIONS } from '@/types/task'
import { getAllTags } from '@/utils/helpers'

interface SearchFilterProps {
  filter: FilterState
  onFilterChange: (filter: Partial<FilterState>) => void
  onClearFilters: () => void
  allTags: string[]
}

export function SearchFilter({ filter, onFilterChange, onClearFilters, allTags }: SearchFilterProps) {
  const [searchQuery, setSearchQuery] = useState(filter.search)
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      onFilterChange({ search: searchQuery })
    }, 300)
    return () => clearTimeout(timer)
  }, [searchQuery, onFilterChange])

  const handleStatusChange = (status: Status | 'all') => {
    onFilterChange({ status: status === 'all' ? undefined : status })
  }

  const handlePriorityChange = (priority: Priority | 'all') => {
    onFilterChange({ priority: priority === 'all' ? undefined : priority })
  }

  const handleDueDateFilterChange = (dueDate: FilterState['dueDate']) => {
    onFilterChange({ dueDate })
  }

  const handleTagChange = (tag: string) => {
    const newTags = filter.tags.includes(tag)
      ? filter.tags.filter((t) => t !== tag)
      : [...filter.tags, tag]
    onFilterChange({ tags: newTags })
  }

  const handleSortChange = (sortBy: FilterState['sortBy']) => {
    onFilterChange({ sortBy })
  }

  const handleSortOrderChange = (sortOrder: FilterState['sortOrder']) => {
    onFilterChange({ sortOrder })
  }

  const hasActiveFilters = filter.status || filter.priority || filter.dueDate || filter.tags.length > 0

  return (
    <div className="card p-4 space-y-4" role="search" aria-label="Task filters">
      {/* Search Input */}
      <div>
        <label htmlFor="search" className="sr-only">Search tasks</label>
        <div className="relative">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="search"
            id="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tasks by title, description, tags..."
            className="input pl-10"
            aria-label="Search tasks"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus-ring rounded p-1"
              aria-label="Clear search"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Quick Filters */}
      <div className="flex flex-wrap gap-2">
        <fieldset className="flex flex-wrap gap-2" aria-label="Filter by status">
          <legend className="sr-only">Status</legend>
          {['all', 'todo', 'in_progress', 'done'].map((status) => (
            <button
              key={status}
              onClick={() => handleStatusChange(status as Status | 'all')}
              className={`btn-sm px-3 py-1.5 rounded-full text-sm font-medium transition-colors $
                filter.status === status || (!filter.status && status === 'all')
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              aria-pressed={filter.status === status || (!filter.status && status === 'all')}
            >
              {status === 'all' ? 'All' : status.replace('_', ' ')}
            </button>
          ))}
        </fieldset>
      </div>

      {/* Advanced Filters Toggle */}
      <button
        type="button"
        onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
        className={`btn-ghost text-sm font-medium flex items-center gap-1 ${hasActiveFilters ? 'text-primary-600' : 'text-gray-500'}`}
        aria-expanded={showAdvancedFilters}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 18a9 9 0 009-9" />
        </svg>
        {showAdvancedFilters ? 'Hide Filters' : 'Show Filters'}
        {hasActiveFilters && (
          <span className="bg-primary-100 text-primary-700 text-xs px-1.5 py-0.5 rounded-full">
            {([filter.status, filter.priority, filter.dueDate].filter(Boolean).length + filter.tags.length)}
          </span>
        )}
      </button>

      {/* Advanced Filters Panel */}
      {showAdvancedFilters && (
        <div className="space-y-4 pt-4 border-t border-gray-200 animate-slide-down" role="region" aria-label="Advanced filters">
          {/* Priority Filter */}
          <div>
            <label className="label text-sm">Priority</label>
            <div className="flex flex-wrap gap-2">
              {['all', 'high', 'medium', 'low'].map((priority) => (
                <button
                  key={priority}
                  onClick={() => handlePriorityChange(priority as Priority | 'all')}
                  className={`btn-sm px-3 py-1.5 rounded-full text-sm font-medium transition-colors $
                    filter.priority === priority || (!filter.priority && priority === 'all')
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  aria-pressed={filter.priority === priority || (!filter.priority && priority === 'all')}
                >
                  {priority === 'all' ? 'All' : priority.charAt(0).toUpperCase() + priority.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Due Date Filter */}
          <div>
            <label className="label text-sm">Due Date</label>
            <select
              value={filter.dueDate || 'all'}
              onChange={(e) => handleDueDateFilterChange(e.target.value as FilterState['dueDate'])}
              className="input w-full sm:w-auto"
              aria-label="Filter by due date"
            >
              {DUE_DATE_FILTER_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Tags Filter */}
          {allTags.length > 0 && (
            <div>
              <label className="label text-sm">Tags</label>
              <div className="flex flex-wrap gap-2">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => handleTagChange(tag)}
                    className={`btn-sm px-3 py-1.5 rounded-full text-sm transition-colors $
                      filter.tags.includes(tag)
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    aria-pressed={filter.tags.includes(tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Sort Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="sortBy" className="label text-sm">Sort By</label>
              <select
                id="sortBy"
                value={filter.sortBy}
                onChange={(e) => handleSortChange(e.target.value as FilterState['sortBy'])}
                className="input"
                aria-label="Sort tasks by"
              >
                {SORT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="sortOrder" className="label text-sm">Order</label>
              <select
                id="sortOrder"
                value={filter.sortOrder}
                onChange={(e) => handleSortOrderChange(e.target.value as FilterState['sortOrder'])}
                className="input"
                aria-label="Sort order"
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
          </div>

          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="btn-secondary text-sm w-full sm:w-auto"
            >
              Clear All Filters
            </button>
          )}
        </div>
      )}
    </div>
  )
}
