import { createSlice } from "@reduxjs/toolkit";

const navbarSlice = createSlice({
  name: "navbar",
  initialState: {
    expanded: false, // chiusa
  },
  reducers: {
    toggleNavbar(state) {
      state.expanded = !state.expanded; // Alterna lo stato della nav
    },
    closeNavbar(state) {
      state.expanded = false; // Chiude la nav
    },
  },
});

export const { toggleNavbar, closeNavbar } = navbarSlice.actions;

export default navbarSlice.reducer;
