import { createAsyncThunk } from '@reduxjs/toolkit';
import { {module}Service } from '../services/{module}Service';
import { Create{Module}Dto, Update{Module}Dto } from '../types/{module}.types';

export const fetch{Module}s = createAsyncThunk(
  '{module}/fetch{Module}s',
  async (_, { rejectWithValue }) => {
    try {
      const items = await {module}Service.getAll();
      return items;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to fetch {module}'
      );
    }
  }
);

export const create{Module} = createAsyncThunk(
  '{module}/create{Module}',
  async (data: Create{Module}Dto, { rejectWithValue }) => {
    try {
      const item = await {module}Service.create(data);
      return item;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to create {module}'
      );
    }
  }
);

export const update{Module} = createAsyncThunk(
  '{module}/update{Module}',
  async ({ id, data }: { id: string; data: Update{Module}Dto }, { rejectWithValue }) => {
    try {
      const item = await {module}Service.update(id, data);
      return item;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to update {module}'
      );
    }
  }
);

export const delete{Module} = createAsyncThunk(
  '{module}/delete{Module}',
  async (id: string, { rejectWithValue }) => {
    try {
      await {module}Service.delete(id);
      return id;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to delete {module}'
      );
    }
  }
);
