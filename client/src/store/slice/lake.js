import { createSlice } from "@reduxjs/toolkit";

import { createAsyncThunk } from "@reduxjs/toolkit";

const fetchLake = createAsyncThunk("lake/fetchLake", async () => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/app/lake`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
});
  const data = await response.json();
  return data;
});

const fetchLakeDetail = createAsyncThunk("lake/fetchLakeDetail", async (id) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/app/lake/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
});

const initialState = {
  detail: [],
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
      .addCase(fetchLakeDetail.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLake.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchLakeDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.detail = action.payload;
      })
      .addCase(fetchLake.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(fetchLakeDetail.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export { fetchLake, fetchLakeDetail };
export default lakeSlice.reducer;
