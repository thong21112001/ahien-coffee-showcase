import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetch{Module}s, create{Module}, update{Module}, delete{Module} } from './{module}Thunks';
import { {Module} } from '../types/{module}.types';

interface {Module}sState {
  items: {Module}[];
  loading: boolean;
  error: string | null;
}

const initialState: {Module}sState = {
  items: [],
  loading: false,
  error: null,
};

const {module}Slice = createSlice({
  name: '{module}',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setItems: (state, action: PayloadAction<{Module}[]>) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetch{Module}s.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetch{Module}s.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetch{Module}s.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to fetch {module}';
      })
      // Create
      .addCase(create{Module}.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(create{Module}.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(create{Module}.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to create {module}';
      })
      // Update
      .addCase(update{Module}.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(update{Module}.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(update{Module}.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to update {module}';
      })
      // Delete
      .addCase(delete{Module}.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(delete{Module}.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(item => item.id !== action.payload);
      })
      .addCase(delete{Module}.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to delete {module}';
      });
  },
});

export const { clearError, setItems } = {module}Slice.actions;
export default {module}Slice.reducer;
