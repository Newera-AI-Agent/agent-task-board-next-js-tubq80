'use client'

import React, { useState, useEffect } from 'react'
import { TaskFormData, Priority, Status, PRIORITY_OPTIONS, STATUS_OPTIONS } from '../types/task'

interface TaskFormProps {
  initialData?: Partial<TaskFormData>
  onSubmit: (data: TaskFormData) => void
  onCancel: () => void
  isEditing?: boolean
}

export function TaskForm({ initialData, onSubmit, onCancel, isEditing = false }: TaskFormProps) {
  const [formData, setFormData] = useState<TaskFormData>({
    title: '',
    description: '',
    priority: 'medium',
    status: 'todo',
    dueDate: '',
    tags: '',
    ...initialData,
  })
  const [errors, setErrors] = useState<Partial<Record<keyof TaskFormData, string>>>({})
  const [touched, setTouched] = useState<Partial<Record<keyof TaskFormData, boolean>>>({})

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: '',
        description: '',
        priority: 'medium',
        status: 'todo',
        dueDate: '',
        tags: '',
        ...initialData,
      })
      setErrors({})
      setTouched({})
    }
  }, [initialData])

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof TaskFormData, string>> = {}
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required'
    } else if (formData.title.length > 200) {
      newErrors.title = 'Title must be 200 characters or less'
    }
    
    if (formData.description.length > 2000) {
      newErrors.description = 'Description must be 2000 characters or less'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Mark all fields as touched
    setTouched({
      title: true,
      description: true,
      priority: true,
      status: true,
      dueDate: true,
      tags: true,
    })
    
    if (validate()) {
      onSubmit(formData)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    
    // Clear error when user starts typing
    if (errors[name as keyof TaskFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))
    validate()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div>
        <label htmlFor="title" className="label">
          Title <span className="text-red-500" aria-hidden="true">*</span>
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`input ${errors.title && touched.title ? 'border-red-500 focus:ring-red-500' : ''}`}
          placeholder="Enter task title"
          maxLength={200}
          aria-required="true"
          aria-invalid={errors.title && touched.title ? 'true' : 'false'}
          aria-describedby={errors.title && touched.title ? 'title-error' : undefined}
          autoFocus
        />
        {errors.title && touched.title && (
          <p id="title-error" className="mt-1 text-sm text-red-600" role="alert">
            {errors.title}
          </p>
        )}
        <p className="mt-1 text-sm text-gray-500">
          {formData.title.length}/200 characters
        </p>
      </div>

      <div>
        <label htmlFor="description" className="label">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`input ${errors.description && touched.description ? 'border-red-500 focus:ring-red-500' : ''}`}
          placeholder="Enter task description (optional)"
          maxLength={2000}
          rows={4}
          aria-invalid={errors.description && touched.description ? 'true' : 'false'}
          aria-describedby={errors.description && touched.description ? 'description-error' : undefined}
        />
        {errors.description && touched.description && (
          <p id="description-error" className="mt-1 text-sm text-red-600" role="alert">
            {errors.description}
          </p>
        )}
        <p className="mt-1 text-sm text-gray-500">
          {formData.description.length}/2000 characters
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="priority" className="label">Priority</label>
          <select
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            onBlur={handleBlur}
            className="input"
            aria-required="true"
          >
            {PRIORITY_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="status" className="label">Status</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            onBlur={handleBlur}
            className="input"
            aria-required="true"
          >
            {STATUS_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="dueDate" className="label">Due Date</label>
        <input
          type="date"
          id="dueDate"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          onBlur={handleBlur}
          className="input"
          min={new Date().toISOString().split('T')[0]}
        />
        <p className="mt-1 text-sm text-gray-500">Optional</p>
      </div>

      <div>
        <label htmlFor="tags" className="label">Tags</label>
        <input
          type="text"
          id="tags"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          onBlur={handleBlur}
          className="input"
          placeholder="Comma-separated tags (e.g., work, urgent, frontend)"
        />
        <p className="mt-1 text-sm text-gray-500">Separate tags with commas</p>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
        <button
          type="button"
          onClick={onCancel}
          className="btn-secondary"
          disabled={formData.title === initialData?.title && 
            formData.description === initialData?.description &&
            formData.priority === initialData?.priority &&
            formData.status === initialData?.status &&
            formData.dueDate === initialData?.dueDate &&
            formData.tags === initialData?.tags}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn-primary"
        >
          {isEditing ? 'Update Task' : 'Create Task'}
        </button>
      </div>
    </form>
  )
}
