// src/api/slices/chinos.material.api.slice.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SERVER } from "../../../config";

export const chinosMaterialApiSlice = createApi({
  reducerPath: "chinosMaterialApi",
  baseQuery: fetchBaseQuery({ baseUrl: SERVER.CHINOS_MATERIALS }),
  endpoints: (builder) => ({
    // Define endpoints here
  }),
});
