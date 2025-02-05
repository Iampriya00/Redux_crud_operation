import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [
    {
      id: "22574b6f-ce3a-4d9b-992f-0cac4a10fdee",
      name: "John Doe",
      email: "john.doe@example.com",
    },
  ],
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action) => {
      if (!state.users) state.users = []; // Ensure users array exists
      state.users.push(action.payload);
    },
    editUser: (state, action) => {
      const index = state.users.findIndex(
        (user) => user.id === action.payload.id
      );
      if (index !== -1) {
        state.users[index] = { ...state.users[index], ...action.payload };
      }
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
  },
});

export const { addUser, editUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;
