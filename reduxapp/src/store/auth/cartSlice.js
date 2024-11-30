import { createSlice } from "@reduxjs/toolkit";

// Define the initial state of the cart
const initialState = {
  items: [], // Example state, you can customize it as needed
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Example reducer for adding an item to the cart
    addItem(state, action) {
      state.items.push(action.payload);
    },
    // Example reducer for removing an item from the cart
    removeItem(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
  },
});

// Export actions for use in components
export const { addItem, removeItem } = cartSlice.actions;

// Export the reducer as the default export
export default cartSlice.reducer;
