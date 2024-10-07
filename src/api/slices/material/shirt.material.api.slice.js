// src/api/slices/shirt.material.api.slice.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SERVER } from "../../../config";

export const shirtMaterialApiSlice = createApi({
  reducerPath: "shirtMaterialApi",
  baseQuery: fetchBaseQuery({ baseUrl: SERVER.SHIRTS_MATERIALS }),
  endpoints: (builder) => ({
    // Define endpoints here
  }),
});
