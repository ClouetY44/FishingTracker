import { createSlice } from "@reduxjs/toolkit";

import { createAsyncThunk } from "@reduxjs/toolkit";


const fetchCatch = createAsyncThunk("catch/fetchCatch", async () => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/app/catch`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
});
  const data = await response.json();
  return data;
});

const fetchCatchDetail = createAsyncThunk("catch/fetchCatchDetail", async (id) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/app/catch/${id}`, {
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

const catchSlice = createSlice({
  name: "catch",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchCatch.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchCatchDetail.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchCatch.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload;
    })
    .addCase(fetchCatchDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.detail = action.payload;
    })
    .addCase(fetchCatch.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    })
    .addCase(fetchCatchDetail.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    });
  },
});

export { fetchCatch, fetchCatchDetail };
export default catchSlice.reducer;
