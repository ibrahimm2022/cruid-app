import { configureStore } from "@reduxjs/toolkit";
import Post from "./PostSlice";
import auth from "./authSlice";
const store = configureStore({
  reducer: { Post, auth },
});
export default store;
