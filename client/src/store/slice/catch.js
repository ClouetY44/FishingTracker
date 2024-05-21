import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Action asynchrone pour récupérer la liste des prises
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

// Action asynchrone pour récupérer les détails d'une prise spécifique
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

// État initial du slice
const initialState = {
  detail: [],
  list: [],
  loading: false,
  error: null,
};

// Définition du slice Redux pour gérer les données des prises
const catchSlice = createSlice({
  name: "catch",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Gestion des actions asynchrones
    builder
    // Action de chargement en cours
    .addCase(fetchCatch.pending, (state) => {
      state.loading = true;
    })
    // Action de chargement en cours
    .addCase(fetchCatchDetail.pending, (state) => {
      state.loading = true;
    })
    // Action de récupération réussie
    .addCase(fetchCatch.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload;
    })
    // Action de récupération réussie
    .addCase(fetchCatchDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.detail = action.payload;
    })
    // Action de récupération échouée
    .addCase(fetchCatch.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    })
    // Action de récupération échouée
    .addCase(fetchCatchDetail.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    });
  },
});

export { fetchCatch, fetchCatchDetail };
export default catchSlice.reducer;
