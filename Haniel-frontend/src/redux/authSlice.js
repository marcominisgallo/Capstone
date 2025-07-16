import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token") || null, // Recupera il token da localStorage al refresh
  user: null,
  isAuthenticated: !!localStorage.getItem("token"), // Verifica se il token esiste
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.token = action.payload.token; // Aggiorna il token
      state.user = action.payload.user; // Aggiorna i dati dell'utente
      state.isAuthenticated = true; // Imposta l'utente come autenticato
      localStorage.setItem("token", action.payload.token); // Salva il token in localStorage
    },
    logout(state) {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false; // Imposta l'utente come non autenticato
      localStorage.removeItem("token"); // Rimuovi il token da localStorage
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;

export default authSlice.reducer;
