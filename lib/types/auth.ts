export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  address?: string;
  contact_number?: string;
  birthday?: string;
  profile_image?: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface SignupDTO {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthResponse {
  access: string;
  user: User;
}