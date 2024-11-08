import { createSlice } from "@reduxjs/toolkit";

//!Initial State
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("userInfo")) || null,
  },
  //1 Reducers
  reducers: {
    loginAction: (state, action) => {
      state.user = action.payload;
    },
    //Logout
    logoutAction: (state, action) => {
      state.user = null;
      localStorage.removeItem("userInfo");
    },
  },
});

export const { loginAction, logoutAction } = authSlice.actions;

const authReducer = authSlice.reducer;
export default authReducer;