import { useState, useEffect } from 'react';
import { Todo, CreateTodoDTO, UpdateTodoDTO } from '@/lib/types/todo';
import { todosAPI } from '@/lib/api/todos';

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTodos = async () => {
    setLoading(true);
    try {
      const data = await todosAPI.getAll();
    //   console.log("TODDOOO :::", data)
      setTodos(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch todos');
    } finally {
      setLoading(false);
    }
  };

  const createTodo = async (todo: CreateTodoDTO) => {
    try {
      const newTodo = await todosAPI.create(todo);
      setTodos([...todos, newTodo]);
      return newTodo;
    } catch (err: any) {
      setError(err.message || 'Failed to create todo');
      throw err;
    }
  };

  const updateTodo = async (id: string, todo: UpdateTodoDTO) => {
    try {
      const updatedTodo = await todosAPI.update(id, todo);
      setTodos(todos.map(t => t.id === id ? updatedTodo : t));
      return updatedTodo;
    } catch (err: any) {
      setError(err.message || 'Failed to update todo');
      throw err;
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      await todosAPI.delete(id);
      setTodos(todos.filter(t => t.id !== id));
    } catch (err: any) {
      setError(err.message || 'Failed to delete todo');
      throw err;
    }
  };

  const reorderTodos = async (reorderedTodos: Todo[]) => {
    const previousTodos = [...todos];
    setTodos(reorderedTodos);

    // console.log("Prev :::", previousTodos)
    // console.log("Current :::", reorderTodos)
    
    // try {
    //   const reorderData = reorderedTodos.map((todo, index) => ({
    //     id: todo.id,
    //     position: index + 1,
    //   }));
    // //   await todosAPI.reorder(reorderData);
    // } catch (err: any) {
    //   setTodos(previousTodos);
    //   setError(err.message || 'Failed to reorder todos');
    //   throw err;
    // }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return {
    todos,
    loading,
    error,
    fetchTodos,
    createTodo,
    updateTodo,
    deleteTodo,
    reorderTodos,
  };
};