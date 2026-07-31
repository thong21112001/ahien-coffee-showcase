export interface Permission {
  resource: string;
  action: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  roleId?: string;
  roleName?: string;
  roleLabel?: string;
  permissions?: Permission[];
  isActive: boolean;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
}

export interface LoginDto {
  email: string;
  password?: string;
}
