import { createSlice } from "@reduxjs/toolkit";

import { createAsyncThunk } from "@reduxjs/toolkit";

const fetchHome = createAsyncThunk("home/fetchHome", async () => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/app/home`, {
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

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHome.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchHome.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchHome.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
  },
});

export { fetchHome };
export default homeSlice.reducer;