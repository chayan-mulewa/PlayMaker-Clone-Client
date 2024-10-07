// src/api/slices/cart.api.slice.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SERVER } from "../../../config";

export const cartApiSlice = createApi({
  reducerPath: "cartApi",
  baseQuery: fetchBaseQuery({ baseUrl: SERVER.USER_CART }),
  endpoints: (builder) => ({
    // Define endpoints here
  }),
});
