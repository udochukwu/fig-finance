import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import eventServices from './eventServices';

const initialState = {
  events: [],
  error: null,
  loading: false,
};

export const fetchAllEvents = createAsyncThunk(
  '/events',
  async (query, thunkAPI) => {
    try {
      return await eventServices.fetchAllEvents(query);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const eventSlice = createSlice({
  name: 'events',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllEvents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload.events;
      })
      .addCase(fetchAllEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.events = null;
      });
  },
});

export const { reset } = eventSlice.actions;
export default eventSlice.reducer;
