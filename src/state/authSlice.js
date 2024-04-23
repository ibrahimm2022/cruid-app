import { createSlice } from "@reduxjs/toolkit";

const initialState = { id: 1, isLogedIn: false };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    handleLogedIn: (state, action) => {
      const token = action.payload;
      switch (token) {
        case "login":
          return { ...state, isLogedIn: true };
        case "logout":
          return { ...state, isLogedIn: false };
        default:
          return state;
      }
    },
  },
});
export const { handleLogedIn } = authSlice.actions;
export default authSlice.reducer;
