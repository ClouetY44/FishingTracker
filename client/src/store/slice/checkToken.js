import { createSlice } from "@reduxjs/toolkit";

import { createAsyncThunk } from "@reduxjs/toolkit";

const checkToken = createAsyncThunk("token/checkToken", async () => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/auth/check-token`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  );
  const data = await response.json();
  return data;
});

const initialState = {
  data: {},
  loading: false,
  error: null,
};

const checkTokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkToken.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkToken.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(checkToken.rejected, (state, action) => {
        state.loading = false;
        state.data = {};
        state.error = action.error.message;
      });
  },
});

export { checkToken };
export default checkTokenSlice.reducer;
