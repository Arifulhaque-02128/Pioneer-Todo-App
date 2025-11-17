'use client';

import React from 'react';
import { Todo } from '@/lib/types/todo';
import { Edit2, Trash2, Logs } from 'lucide-react';

interface TodoCardProps {
  todo: Todo;
  onEdit: (todo: Todo) => void;
  onDelete: (id: string) => void;
  onDragStart: (id: string) => void;
  onDragOver: (e: React.DragEvent, id: string) => void;
  onDragEnd: () => void;
}

export const TodoCard: React.FC<TodoCardProps> = ({
  todo,
  onEdit,
  onDelete,
  onDragStart,
  onDragOver,
  onDragEnd,
}) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'extreme':
        return 'bg-red-100 text-red-600';
      case 'moderate':
        return 'bg-green-100 text-green-600';
      case 'low':
        return 'bg-yellow-100 text-yellow-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const getPriorityBorder = (priority: string) => {
    switch (priority) {
      case 'extreme':
        return 'border-1 border-red-200';
      case 'moderate':
        return 'border-1 border-green-200';
      case 'low':
        return 'border-1 border-yellow-200';
      default:
        return 'border-1 border-gray-200';
    }
  };

  const capitalize = (str: string) => str[0].toUpperCase() + str.slice(1);

  return (
    <div
      draggable
      onDragStart={() => onDragStart(todo.id)}
      onDragOver={(e) => onDragOver(e, todo.id)}
      onDragEnd={onDragEnd}
      className={`bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-move ${getPriorityBorder(todo.priority)}`}
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-semibold text-lg">{todo.title}</h3>
        <div className="flex items-center gap-2">
          <span
            className={`px-3 py-2 rounded-md text-xs font-medium ${getPriorityColor(
              todo.priority
            )}`}
          >
            {capitalize(todo.priority)}
          </span>
          <Logs size={18} className="text-gray-400" />
        </div>
      </div>
      <p className="text-gray-600 text-sm mb-4">{todo.description}</p>
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500">
          Due {new Date(todo.todo_date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(todo)}
            className="p-2 bg-blue-50 hover:bg-blue-100 rounded transition-colors cursor-pointer"
          >
            <Edit2 size={16} className="text-blue-600" />
          </button>
          <button
            onClick={() => onDelete(todo.id)}
            className="p-2 bg-blue-50 hover:bg-blue-100 rounded transition-colors cursor-pointer"
          >
            <Trash2 size={16} className="text-red-600" />
          </button>
        </div>
      </div>
    </div>
  );
};