import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: [{ id: 1, name: "John Doe", email: "john.doe@example.com" }],
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.user.push(action.payload);
    },
    editUser: (state, action) => {
      const index = state.user.findIndex(
        (user) => user.id === action.payload.id
      );
      if (index !== -1) {
        state.user[index] = action.payload;
      }
    },
    deleteUser: (state, action) => {
      state.user = state.user.filter((user) => user.id !== action.payload);
    },
  },
});

export const { addUser, editUser, deleteUser } = userSlice.actions;
export default userSlice.reducer; // This is the reducer you will import
