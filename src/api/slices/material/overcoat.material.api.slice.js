// src/api/slices/overcoat.material.api.slice.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SERVER } from "../../../config";

export const overcoatMaterialApiSlice = createApi({
  reducerPath: "overcoatMaterialApi",
  baseQuery: fetchBaseQuery({ baseUrl: SERVER.OVERCOATS_MATERIALS }),
  endpoints: (builder) => ({
    // Define endpoints here
  }),
});
