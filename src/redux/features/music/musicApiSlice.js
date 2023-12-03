import { apiSlice } from "../../api/apiSlice";

export const musicApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMusic: builder.query({
      query: ({ search, genre, page }) => ({
        url: `/music/get-music?search=${search}&genre=${genre}&page=${page}`,
      }),
    }),
    getMusicById: builder.query({
      query: (id) => ({
        url: `/music/get-music/${id}`,
      }),
    }),
    addMusic: builder.mutation({
      query: (data) => {
        return {
          url: "/music/upload",
          method: "POST",
          body: data,
        };
      },
    }),
    editMusic: builder.mutation({
      query: ({ tableRowId, formData }) => {
        return {
          url: `/music/edit-music/${tableRowId}`,
          method: "PUT",
          body: formData,
        };
      },
    }),
    deleteMusic: builder.mutation({
      query: (id) => ({
        url: `/music/delete-music/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useLazyGetMusicQuery,
  useLazyGetMusicByIdQuery,
  useAddMusicMutation,
  useDeleteMusicMutation,
  useEditMusicMutation,
} = musicApiSlice;
