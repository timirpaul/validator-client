import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false
};
const loginSlice = createSlice({
  name: "loginChecker",
  initialState,
  reducers: {
    login: (state) => {
      state.value = true;
    },
    logout: (state) => {
      state.value = false;
    }
  }
});

export const { login, logout } = loginSlice.actions;

export default loginSlice.reducer;
