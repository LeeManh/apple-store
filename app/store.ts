import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import cartReducer from "../slices/cartSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

// Export a hook that can be reused to resolve types
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
