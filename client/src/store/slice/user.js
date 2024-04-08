import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    username: "",
    isLogged: false,
    role: "",
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login(state, action) {
            state.username = action.payload.username;
            state.isLogged = true;
            state.role = action.payload.role;
        },
        logout(state) {
            state.username = "";
            state.isLogged = false;
            state.role = "";
        }
    },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;