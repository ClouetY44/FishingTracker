import { createSlice } from "@reduxjs/toolkit";

import { createAsyncThunk } from "@reduxjs/toolkit";

const fetchFish = createAsyncThunk("fish/fetchFish", async () => {
  const response = await fetch("http://localhost:9000/api/app/fish", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
});

const fetchFishDetail = createAsyncThunk("fish/fetchFishDetail", async (id) => {
  const response = await fetch(`http://localhost:9000/api/app/fish/${id}`, {
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

const fishSlice = createSlice({
  name: "fish",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFish.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFishDetail.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFish.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchFishDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.detail = action.payload;
      })
      .addCase(fetchFish.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(fetchFishDetail.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export { fetchFish, fetchFishDetail };
export default fishSlice.reducer;
