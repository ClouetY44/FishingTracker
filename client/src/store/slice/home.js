import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Action asynchrone pour récupérer les données de la page d'accueil
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

// État initial du slice
const initialState = {
  list: [],
  loading: false,
  error: null,
};

// Définition du slice Redux pour gérer les données de la page d'accueil
const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Gestion des actions asynchrones
    builder
      // Action de chargement en cours
      .addCase(fetchHome.pending, (state) => {
        state.loading = true;
      })
      // Action de récupération réussie
      .addCase(fetchHome.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      // Action de récupération échouée
      .addCase(fetchHome.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export { fetchHome };
export default homeSlice.reducer;
