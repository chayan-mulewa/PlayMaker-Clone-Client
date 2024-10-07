// src/api/endpoints/material/overcoat.material.endpoints.js
import { overcoatMaterialApiSlice } from "../../slices";

export const overcoatMaterialApi = overcoatMaterialApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOvercoatMaterials: builder.query({
      query: ({ skip, limit }) => `?limit=${limit}&skip=${skip}`,
      providesTags: (result, error) =>
        result
          ? [
              ...result.data.materials.map(({ _id }) => ({
                type: "Materials",
                id: _id,
              })),
              { type: "Materials", id: "LIST" },
            ]
          : [{ type: "Materials", id: "LIST" }],
    }),
    updateOvercoatMaterial: builder.mutation({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: "PUT",
        credentials: "include",
        body: data,
      }),
      onQueryStarted: async (
        { id, data, skip },
        { dispatch, queryFulfilled }
      ) => {
        const patchResult = dispatch(
          overcoatMaterialApi.util.updateQueryData(
            "getOvercoatMaterials",
            { skip, limit: 6 },
            (draft) => {
              const index = draft.data.materials.findIndex(
                (material) => material._id === id
              );
              if (index !== -1) {
                draft.data.materials[index] = {
                  ...draft.data.materials[index],
                  ...data,
                };
              }
            }
          )
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: (result, error, { id }) => [{ type: "Materials", id }],
    }),
    deleteOvercoatMaterial: builder.mutation({
      query: ({ id }) => ({
        url: `/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      onQueryStarted: async ({ id, skip }, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          overcoatMaterialApi.util.updateQueryData(
            "getOvercoatMaterials",
            { skip, limit: 6 },
            (draft) => {
              draft.data.materials = draft.data.materials.filter(
                (material) => material._id !== id
              );
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
    createOvercoatMaterial: builder.mutation({
      query: ({ data }) => {
        const formData = new FormData();
        formData.append("material", data.materialImage);
        formData.append("materialPreview", data.materialPreview);
        formData.append("materialName", data.materialName);
        formData.append("materialCode", data.materialCode);
        formData.append("materialFabric", data.materialFabric);
        formData.append("materialColor", data.materialColor);
        formData.append("materialType", data.materialType);
        formData.append("materialDescription", data.materialDescription);
        formData.append("materialPricePerMeter", data.materialPricePerMeter);
        formData.append("materialGSM", data.materialGSM);
        formData.append("materialPattern", data.materialPattern);
        formData.append("weavePattern", data.weavePattern);
        formData.append("threadCount", data.threadCount);
        data.materialProperties.forEach((property) =>
          formData.append("materialProperties[]", property)
        );
        data.materialSeasonability.forEach((property) =>
          formData.append("materialSeasonability[]", property)
        );
        data.materialTags.forEach((property) =>
          formData.append("tags[]", property)
        );

        return {
          url: "/",
          method: "POST",
          credentials: "include",
          body: formData,
        };
      },
      onQueryStarted: async ({ data, skip }, { dispatch, queryFulfilled }) => {
        // Generate a temporary ID for the new material
        const tempId = nanoid();

        // Optimistically update the cache
        const patchResult = dispatch(
          overcoatMaterialApi.util.updateQueryData(
            "getOvercoatMaterials",
            { skip, limit: 6 },
            (draft) => {
              // Add the new material to the beginning of the list
              draft.data.materials.unshift({
                ...data,
                _id: tempId, // Temporary ID
              });
              draft.data.totalCount += 1;
            }
          )
        );

        try {
          // Wait for the server response
          const { data: serverData } = await queryFulfilled;

          // Replace the temporary ID with the real ID from the server
          dispatch(
            overcoatMaterialApi.util.updateQueryData(
              "getOvercoatMaterials",
              { skip, limit: 6 },
              (draft) => {
                const index = draft.data.materials.findIndex(
                  (material) => material._id === tempId
                );
                if (index !== -1) {
                  draft.data.materials[index]._id = serverData._id;
                }
              }
            )
          );
        } catch {
          // If the server request fails, undo the optimistic update
          patchResult.undo();
        }
      },
      invalidatesTags: [{ type: "Materials", id: "LIST" }],
    }),
  }),
});
