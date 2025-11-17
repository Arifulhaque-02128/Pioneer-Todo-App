export interface ValidationError {
  field: string;
  message: string;
}

export const validateSignup = (data: {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirmPassword: string;
}): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (data.first_name.length < 1) {
    errors.push({
      field: 'first_name',
      message: 'Please enter a valid name.',
    });
  }

  if (data.first_name.length < 1) {
    errors.push({
      field: 'last_name',
      message: 'Please enter a valid name.',
    });
  }

  if (!data.email.includes('@') || !data.email.includes('.')) {
    errors.push({
      field: 'email',
      message: 'Please enter a valid email.',
    });
  }

  if (data.password.length < 4) {
    errors.push({
      field: 'password',
      message: '4 characters minimum.',
    });
  }

  if (data.password !== data.confirmPassword) {
    errors.push({
      field: 'confirmPassword',
      message: 'Passwords do not match.',
    });
  }

  return errors;
};

export const validateTodo = (data: {
  title: string;
  description: string;
  todo_date: string;
  priority: string;
}): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (!data.title.trim()) {
    errors.push({ field: 'title', message: 'Title is required' });
  }

  if (!data.description.trim()) {
    errors.push({ field: 'description', message: 'Description is required' });
  }

  if (!data.todo_date) {
    errors.push({ field: 'todo_date', message: 'Todo Date is required' });
  }

  if (!['low', 'moderate', 'extreme'].includes(data.priority)) {
    errors.push({ field: 'priority', message: 'Valid priority is required' });
  }

  return errors;
};