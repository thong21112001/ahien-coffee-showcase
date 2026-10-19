import { {Module}, Create{Module}Dto, Update{Module}Dto } from '../types/{module}.types';

// Dummy data
const dummy{Module}s: {Module}[] = [
  {
    id: '1',
    name: 'Example {Module} 1',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
  },
  // ... more items
];

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

class {Module}Service {
  private items: {Module}[] = [...dummy{Module}s];

  async getAll(): Promise<{Module}[]> {
    await delay(500);
    return [...this.items];
  }

  async getById(id: string): Promise<{Module}> {
    await delay(300);
    const item = this.items.find((i) => i.id === id);
    if (!item) throw new Error('{Module} not found');
    return { ...item };
  }

  async create(data: Create{Module}Dto): Promise<{Module}> {
    await delay(400);
    const newItem: {Module} = {
      id: Date.now().toString(),
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.items.push(newItem);
    return { ...newItem };
  }

  async update(id: string, data: Update{Module}Dto): Promise<{Module}> {
    await delay(400);
    const index = this.items.findIndex((i) => i.id === id);
    if (index === -1) throw new Error('{Module} not found');
    const updatedItem: {Module} = {
      ...this.items[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    this.items[index] = updatedItem;
    return { ...updatedItem };
  }

  async delete(id: string): Promise<void> {
    await delay(300);
    const index = this.items.findIndex((i) => i.id === id);
    if (index === -1) throw new Error('{Module} not found');
    this.items.splice(index, 1);
  }
}

export const {module}Service = new {Module}Service();
