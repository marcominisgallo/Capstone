import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import navbarReducer from "./navbarSlice"; // Importa il reducer della navbar

const store = configureStore({
  reducer: {
    auth: authReducer, // autenticazione
    navbar: navbarReducer, // navbar
  },
});

export default store;
