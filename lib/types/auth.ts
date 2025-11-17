export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  address?: string;
  contact_number?: string;
  birthday?: string;
  bio?: string;
  profile_image?: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface ISignup {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthResponse {
  access: string;
  refresh: string;
}

export interface SignupResponse {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
}