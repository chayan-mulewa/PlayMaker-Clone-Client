// // src/api/api.slice.js
// import { combineReducers } from "redux";
// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { authApiSlice } from "./auth.api.slice";
// import { shirtMaterialApiSlice } from "./shirt.material.api.slice";
// import { SERVER } from "../config";

// const apiSlice = createApi({
//   reducerPath: "api",
//   baseQuery: fetchBaseQuery({ baseUrl: SERVER.BASE }),
//   endpoints: (builder) => ({}), // No main endpoints here, as we are nesting
  
// });

// // Combine reducers from authApiSlice and others
// const apiReducer = combineReducers({
//   authApi: authApiSlice.reducer,
//   shirtMaterialApi: shirtMaterialApiSlice,
// });

// const mainApiSlice = {
//   apiSlice,
//   apiReducer,
// };

// export { mainApiSlice };
