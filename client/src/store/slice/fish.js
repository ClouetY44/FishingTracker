import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Action asynchrone pour récupérer la liste des poissons
const fetchFish = createAsyncThunk("fish/fetchFish", async () => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/app/fish`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
});

// Action asynchrone pour récupérer les détails d'un poisson spécifique
const fetchFishDetail = createAsyncThunk("fish/fetchFishDetail", async (id) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/app/fish/${id}`,
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

// Définition du slice Redux pour gérer les données des poissons
const fishSlice = createSlice({
  name: "fish",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Gestion des actions asynchrones
    builder
      // Action de chargement en cours
      .addCase(fetchFish.pending, (state) => {
        state.loading = true;
      })
      // Action de chargement en cours
      .addCase(fetchFishDetail.pending, (state) => {
        state.loading = true;
      })
      // Action de récupération réussie
      .addCase(fetchFish.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      // Action de récupération réussie
      .addCase(fetchFishDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.detail = action.payload;
      })
      // Action de récupération échouée
      .addCase(fetchFish.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      // Action de récupération échouée
      .addCase(fetchFishDetail.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export { fetchFish, fetchFishDetail };
export default fishSlice.reducer;
