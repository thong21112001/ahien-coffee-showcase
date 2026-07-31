export interface {Module} {
  id: string;
  name: string;
  // Add other fields
  createdAt?: string;
  updatedAt?: string;
}

export interface Create{Module}Dto {
  name: string;
  // Add other fields
}

export interface Update{Module}Dto {
  name?: string;
  // Add other fields
}
