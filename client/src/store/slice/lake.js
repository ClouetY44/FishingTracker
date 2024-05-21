import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Action asynchrone pour récupérer la liste des lacs
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

// Action asynchrone pour récupérer les détails d'un lac spécifique
const fetchLakeDetail = createAsyncThunk("lake/fetchLakeDetail", async (id) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/app/lake/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
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

// Définition du slice Redux pour gérer les données des lacs
const lakeSlice = createSlice({
  name: "lake",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Gestion des actions asynchrones
    builder
      // Action de chargement en cours
      .addCase(fetchLake.pending, (state) => {
        state.loading = true;
      })
      // Action de chargement en cours
      .addCase(fetchLakeDetail.pending, (state) => {
        state.loading = true;
      })
      // Action de récupération réussie
      .addCase(fetchLake.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      // Action de récupération réussie
      .addCase(fetchLakeDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.detail = action.payload;
      })
      // Action de récupération échouée
      .addCase(fetchLake.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      // Action de récupération échouée
      .addCase(fetchLakeDetail.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export { fetchLake, fetchLakeDetail };
export default lakeSlice.reducer;
