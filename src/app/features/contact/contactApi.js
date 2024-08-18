import { apiSlice } from "../api/apiSlice";

export const contactApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // create contact
    createContact: builder.mutation({
      query: (data) => ({
        url: "contact/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Contact"],
    }),

    // get contact list
    getContactList: builder.query({
      query: (data) => ({
        url: "contact/detail_list",
        method: "POST",
        body: data,
      }),
      providesTags: ["Contact"],
    }),

    // update contact
    updateContact: builder.mutation({
      query: (data) => ({
        url: "contact/edit",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Contact"],
    }),

    // get contact list for select input
    getContacts: builder.query({
      query: (data) => ({
        url: "contact/list",
        method: "POST",
        body: data,
      }),
      providesTags: ["Contact"],
    }),

    // get contact by ids
    getContactsById: builder.query({
      query: (data) => ({
        url: "contact/detail",
        method: "POST",
        body: data,
      }),
      providesTags: ["Contact"],
    }),
  }),
});

export const {
  useCreateContactMutation,
  useGetContactListQuery,
  useUpdateContactMutation,
  useGetContactsQuery,
  useGetContactsByIdQuery,
} = contactApi;
