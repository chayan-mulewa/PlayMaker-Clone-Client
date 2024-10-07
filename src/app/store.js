// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import {
  authApiSlice,
  userApiSlice,
  cartApiSlice,
  addressApiSlice,
  shirtMaterialApiSlice,
  poloShirtMaterialApiSlice,
  coatMaterialApiSlice,
  overcoatMaterialApiSlice,
  pantMaterialApiSlice,
  jeansMaterialApiSlice,
  chinosMaterialApiSlice,
} from "../api/slices";
import { authSlice } from "../features";

// Configure the Redux store
export const store = configureStore({
  reducer: {
    // Add the API reducer to the store
    [authApiSlice.reducerPath]: authApiSlice.reducer,
    [userApiSlice.reducerPath]: userApiSlice.reducer,
    [cartApiSlice.reducerPath]: cartApiSlice.reducer,
    [addressApiSlice.reducerPath]: addressApiSlice.reducer,
    [shirtMaterialApiSlice.reducerPath]: shirtMaterialApiSlice.reducer,
    [poloShirtMaterialApiSlice.reducerPath]: poloShirtMaterialApiSlice.reducer,
    [coatMaterialApiSlice.reducerPath]: coatMaterialApiSlice.reducer,
    [overcoatMaterialApiSlice.reducerPath]: overcoatMaterialApiSlice.reducer,
    [pantMaterialApiSlice.reducerPath]: pantMaterialApiSlice.reducer,
    [jeansMaterialApiSlice.reducerPath]: jeansMaterialApiSlice.reducer,
    [chinosMaterialApiSlice.reducerPath]: chinosMaterialApiSlice.reducer,

    auth: authSlice.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling, and other features of RTK Query
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApiSlice.middleware)
      .concat(userApiSlice.middleware)
      .concat(cartApiSlice.middleware)
      .concat(addressApiSlice.middleware)
      .concat(shirtMaterialApiSlice.middleware)
      .concat(poloShirtMaterialApiSlice.middleware)
      .concat(coatMaterialApiSlice.middleware)
      .concat(overcoatMaterialApiSlice.middleware)
      .concat(pantMaterialApiSlice.middleware)
      .concat(jeansMaterialApiSlice.middleware)
      .concat(chinosMaterialApiSlice.middleware),

  devTools: process.env.NODE_ENV !== "production", // Enable Redux DevTools in development
});
