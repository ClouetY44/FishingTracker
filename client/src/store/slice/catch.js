import { createSlice } from "@reduxjs/toolkit";

import { createAsyncThunk } from "@reduxjs/toolkit";

const fetchCatch = createAsyncThunk("catch/fetchCatch", async () => {
  const response = await fetch("http://localhost:9000/api/app/catch", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
});
  const data = await response.json();
  return data;
});

const initialState = {
  list: [],
  loading: false,
  error: null,
};

const catchSlice = createSlice({
  name: "catch",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCatch.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCatch.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchCatch.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export { fetchCatch };
export default catchSlice.reducer;
