export interface Todo {
  id: string;
  title: string;
  description: string;
  todo_date: string;
  priority: 'low' | 'moderate' | 'extreme';
  position?: number;
  completed?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateTodoDTO {
  title: string;
  description: string;
  todo_date: string;
  priority: 'low' | 'moderate' | 'extreme';
}

export interface UpdateTodoDTO extends Partial<CreateTodoDTO> {
  completed?: boolean;
  position?: number;
}