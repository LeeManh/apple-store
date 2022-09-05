import type { RootState } from "./../app/store";
import { createSlice, createSelector } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../typing";

export interface CartState {
  items: Product[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Product>) {
      state.items = [...state.items, { ...action.payload, quantity: 1 }];
    },
    removeFromCart(state, action: PayloadAction<{ id: string }>) {
      const updateCart = state.items.filter(
        (item) => item._id !== action.payload.id
      );

      state.items = updateCart;
    },
    changeQuantity(
      state,
      action: PayloadAction<Pick<Product, "quantity" | "_id">>
    ) {
      state.items = state.items.map((item) =>
        item._id === action.payload._id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
    },
  },
});

//actions
export const { addToCart, removeFromCart, changeQuantity } = cartSlice.actions;

// Selector
export const selectCartItems = (state: RootState) => state.cart.items;

export const selectCartItemById = createSelector(
  [selectCartItems, (state: RootState, id: string) => id],
  (items, id) => {
    return items.find((item) => item._id === id);
  }
);

export const selectCartTotalPrice = createSelector(selectCartItems, (items) => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
});

//reducer
export default cartSlice.reducer;
