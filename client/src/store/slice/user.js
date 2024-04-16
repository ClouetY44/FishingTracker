import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

// État initial du slice
const initialState = {
  username: "",
  isLogged: false,
  role: "",
};

export const checkToken = createAsyncThunk("user/checkToken", async () => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/auth/check-token`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include"
    }
  );
  const data = await response.json();
  return data;
});

// Définition du slice Redux pour gérer l'état de l'utilisateur
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Réducteur pour gérer la connexion de l'utilisateur
    login(state, action) {
      state.username = action.payload.username;
      state.isLogged = true;
      state.role = action.payload.role;
    },
    // Réducteur pour gérer la déconnexion de l'utilisateur
    logout(state) {
      state.username = "";
      state.isLogged = false;
      state.role = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkToken.pending, (state) => {
        state.isLogged = false;
      })
      .addCase(checkToken.fulfilled, (state, action) => {
        state.isLogged = action.payload.isLogged;
        state.username = action.payload.username;
        state.role = action.payload.role;
      })
      .addCase(checkToken.rejected, (state) => {
        state.isLogged = false;
        state.username = "";
        state.role = "";
      });
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
