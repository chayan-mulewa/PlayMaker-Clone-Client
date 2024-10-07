// src/api/endpoints/auth/auth.endpoints.js
import { authApiSlice } from "../../slices";
import { authSlice } from "../../../features";
import { Tokens } from "../../../utils";

export const authApi = authApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (newUser) => ({
        url: "/register",
        method: "POST",
        body: newUser,
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const response = await queryFulfilled;
        const accessToken = response.data.data.accessToken;
        const role = response.data.data.role;

        Tokens.setAccessToken(accessToken);

        dispatch(authSlice.actions.login());
        if (role === "admin") {
          dispatch(authSlice.actions.admin());
        }
      },
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
        credentials: "include",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        Tokens.deleteAccessToken();
        dispatch(authSlice.actions.logout());
      },
    }),
    refreshToken: builder.mutation({
      query: () => ({
        url: "/refresh-token",
        method: "POST",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const response = await queryFulfilled;
        const accessToken = response.data.data.accessToken;
        const role = response.data.data.role;
        Tokens.setAccessToken(accessToken);
        dispatch(authSlice.actions.login(accessToken));
        if (role === "admin") {
          dispatch(authSlice.actions.admin());
        }
      },
    }),
  }),
});
