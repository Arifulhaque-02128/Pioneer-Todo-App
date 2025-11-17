'use client';

import React, { useState, useEffect } from 'react';
import { Todo, CreateTodoDTO } from '@/lib/types/todo';
import { validateTodo } from '@/lib/utils/validation';

interface TodoFormProps {
  todo?: Todo | null;
  onSubmit: (data: CreateTodoDTO) => Promise<void>;
  onCancel: () => void;
}

export const TodoForm: React.FC<TodoFormProps> = ({ todo, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<CreateTodoDTO>({
    title: '',
    description: '',
    todo_date: '',
    priority: 'low',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (todo) {
      setFormData({
        title: todo.title,
        description: todo.description,
        todo_date: todo.todo_date,
        priority: todo.priority,
      });
    }
  }, [todo]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validateTodo(formData);
    if (validationErrors.length > 0) {
      const errorMap: Record<string, string> = {};
      validationErrors.forEach(err => {
        errorMap[err.field] = err.message;
      });
      setErrors(errorMap);
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      setFormData({ title: '', description: '', todo_date: '', priority: 'low' });
      setErrors({});
    } catch (error) {
      console.error('Failed to submit todo:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 mb-6">
      <div className='flex flex-row justify-between'>

        <h3 className="text-xl font-bold border-b-2 border-blue-500 pb-2 mb-8 inline-block">
            {todo ? 'Edit Task' : 'Create New Task'}
        </h3>
        <h3 className="text-xl font-bold border-b-2 border-gray-500 pb-2 mb-8 inline-block cursor-pointer"
            onClick={onCancel}
        >
            Go Back
        </h3>

      </div>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <label className="block text-md font-medium mb-2">Title</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
          {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
        </div>
        
        <div>
            <label className="block text-md font-medium mb-2">Date</label>
            <input
                type="date"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer"
                value={formData.todo_date}
                onChange={(e) => setFormData({ ...formData, todo_date: e.target.value })}
            />
            {errors.todo_date && (
                <p className="text-red-500 text-xs mt-1">{errors.todo_date}</p>
            )}
        </div>

        <div>
            <label className="block text-md font-medium mb-2">Priority</label>

            <div className="flex items-center gap-6">
                {/* Low */}
                <label className="inline-flex items-center gap-2 cursor-pointer">
                <span className="h-4 w-4 rounded-full bg-yellow-500 inline-block"></span>
                <span>Low</span>
                <input
                    type="checkbox"
                    checked={formData.priority === 'low'}
                    onChange={() => setFormData({ ...formData, priority: 'low' })}
                    className="form-checkbox h-4 w-4 text-blue-500 border-gray-300 focus:ring-2 focus:ring-blue-500"
                />
                </label>

                {/* Moderate */}
                <label className="inline-flex items-center gap-2 cursor-pointer">
                <span className="h-4 w-4 rounded-full bg-green-500 inline-block"></span>
                <span>Moderate</span>
                <input
                    type="checkbox"
                    checked={formData.priority === 'moderate'}
                    onChange={() => setFormData({ ...formData, priority: 'moderate' })}
                    className="form-checkbox h-4 w-4 text-blue-500 border-gray-300 focus:ring-2 focus:ring-blue-500"
                />
                </label>

                {/* Extreme */}
                <label className="inline-flex items-center gap-2 cursor-pointer">
                <span className="h-4 w-4 rounded-full bg-red-500 inline-block"></span>
                <span>Extreme</span>
                <input
                    type="checkbox"
                    checked={formData.priority === 'extreme'}
                    onChange={() => setFormData({ ...formData, priority: 'extreme' })}
                    className="form-checkbox h-4 w-4 text-blue-500 border-gray-300 focus:ring-2 focus:ring-blue-500"
                />
                </label>
            </div>

            {errors.priority && (
                <p className="text-red-500 text-xs mt-1">{errors.priority}</p>
            )}
        </div>

        

        <div>
          <label className="block text-md font-medium mb-2">Task Description</label>
          <textarea
            placeholder="Task Description"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
          {errors.description && (
            <p className="text-red-500 text-xs mt-1">{errors.description}</p>
          )}
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Saving...' : 'Done'}
          </button>
          
        </div>
      </form>
    </div>
  );
};