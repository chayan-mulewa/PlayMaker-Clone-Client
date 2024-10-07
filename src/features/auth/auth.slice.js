// src/features/auth/auth.slice.js
import { createSlice } from "@reduxjs/toolkit";
import { Tokens } from "../../utils";

const initialState = {
  isLogin: false,
  isAdmin: false,
};

if (Tokens.isAccessTokenPresent()) {
  if (Tokens.isRolePresent()) {
    const role = Tokens.getRole();
    if (role) {
      initialState.isAdmin = role === "admin";
    } else {
      initialState.isAdmin = false;
    }
  }
  initialState.isLogin = true;
} else {
  initialState.isAdmin = false;
  initialState.isLogin = false;
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state) => {
      state.isLogin = true;
    },
    logout: (state) => {
      state.isLogin = false;
      state.isAdmin = false;
    },
    admin: (state) => {
      state.isAdmin = true;
    },
  },
});
