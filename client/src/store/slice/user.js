import { createSlice } from "@reduxjs/toolkit";

// État initial du slice
const initialState = {
    username: "",
    isLogged: false,
    role: "",
};

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
        }
    },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;