import { createSlice } from "@reduxjs/toolkit";

import { createAsyncThunk } from "@reduxjs/toolkit";

const fetchLake = createAsyncThunk("lake/fetchLake", async () => {
  const response = await fetch("http://localhost:9000/api/app/lake", {
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

const lakeSlice = createSlice({
  name: "lake",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLake.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLake.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchLake.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export { fetchLake };
export default lakeSlice.reducer;
