'use client';

import React, { useState } from 'react';
import { Plus, Search, ArrowUpDown } from 'lucide-react';
import { useTodos } from '@/lib/hooks/useTodos';
import { TodoCard } from '@/components/todos/TodoCard';
import { TodoForm } from '@/components/todos/TodoForm';
import { Todo, CreateTodoDTO } from '@/lib/types/todo';
import Modal from '@/components/ui/Modal';

export default function TodosPage() {
  const { todos, loading, createTodo, updateTodo, deleteTodo, 
    reorderTodos 
} = useTodos();
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [draggedTodo, setDraggedTodo] = useState<string | null>(null);

  const handleCreateTodo = async (data: CreateTodoDTO) => {
    await createTodo(data);
    setIsCreating(false);
  };

  const handleUpdateTodo = async (data: CreateTodoDTO) => {
    if (editingTodo) {
      await updateTodo(editingTodo.id, data);
      setEditingTodo(null);
    }
  };

  const handleDragStart = (id: string) => {
    setDraggedTodo(id);
  };

  const handleDragOver = (e: React.DragEvent, id: string) => {
    e.preventDefault();
    if (draggedTodo && draggedTodo !== id) {
      const draggedIndex = todos.findIndex((t) => t.id === draggedTodo);
      const targetIndex = todos.findIndex((t) => t.id === id);

      const newTodos = [...todos];
      const [removed] = newTodos.splice(draggedIndex, 1);
      newTodos.splice(targetIndex, 0, removed);

      reorderTodos(newTodos);
    }
  };

  const handleDragEnd = () => {
    setDraggedTodo(null);
  };

  const filteredTodos = todos.filter(
    (todo) =>
      todo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      todo.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-8 text-black">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold border-b-2 border-blue-500 pb-2">Todos</h1>
        <button
          onClick={() => setIsCreating(true)}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 cursor-pointer"
        >
          <Plus size={20} />
          New Task
        </button>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="flex-1 relative">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search your task here..."
            className="w-full pl-10 pr-4 py-3 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button className="px-6 py-3 border border-gray-400 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
          Sort by
          <ArrowUpDown size={18} />
        </button>
      </div>

      {(isCreating || editingTodo) && (
        <Modal
            onClose={() => {
            setIsCreating(false);
            setEditingTodo(null);
            }}
        >
            <TodoForm
            todo={editingTodo}
            onSubmit={editingTodo ? handleUpdateTodo : handleCreateTodo}
            onCancel={() => {
                setIsCreating(false);
                setEditingTodo(null);
            }}
            />
        </Modal>
      )}

      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Loading todos...</p>
        </div>
      ) : (
        <>
          {
            filteredTodos.length !== 0 && <h2 className="text-xl font-semibold mb-4">Your Tasks</h2>
          }
          <div className="grid grid-cols-3 gap-6">
            
            {filteredTodos.map((todo) => (
              <TodoCard
                key={todo.id}
                todo={todo}
                onEdit={setEditingTodo}
                onDelete={deleteTodo}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDragEnd={handleDragEnd}
              />
            ))}
          </div>

          {filteredTodos.length === 0 && !loading && (
            <div className="text-center py-12 text-gray-500 space-y-6">
                <img
                    src="/images/no-todo.png"
                    alt="No Todo"
                    className="mx-auto"
                />
                <div>
                    {searchQuery
                    ? 'No todos match your search.'
                    : 'No todos yet'}
                </div>
                
            </div>
          )}
        </>
      )}
    </div>
  );
}