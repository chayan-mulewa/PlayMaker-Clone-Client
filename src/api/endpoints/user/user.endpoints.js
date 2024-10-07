// src/api/endpoints/user.endpoints.js
import { userApiSlice } from "../../slices";

export const userApi = userApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => ({
        url: "/",
        credentials: "include",
      }),
    }),
    updateProfile: builder.mutation({
      query: ({ data }) => ({
        url: "/",
        method: "PUT",
        credentials: "include",
        body: data,
      }),
      onQueryStarted: async ({ data }, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          userApiSlice.util.updateQueryData(
            "getProfile",
            undefined,
            (draft) => {
              Object.assign(draft.data.userProfile, data);
            }
          )
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    uploadAvatar: builder.mutation({
      query: ({ file }) => {
        const formData = new FormData();
        formData.append("avatar", file);

        return {
          url: "/avatar",
          method: "PUT",
          body: formData,
          credentials: "include",
        };
      },
      onQueryStarted: async ({ file }, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          userApiSlice.util.updateQueryData(
            "getProfile",
            undefined,
            (draft) => {
              const objectUrl = URL.createObjectURL(file);
              draft.data.userProfile.avatar = objectUrl;
            }
          )
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});
