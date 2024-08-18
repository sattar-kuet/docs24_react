import { apiSlice } from "../api/apiSlice";

export const profileApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // extend profile create
    extendedProfileCreate: builder.mutation({
      query: (credential) => ({
        url: "extended_profile/create",
        method: "POST",
        body: credential,
      }),
      invalidatesTags: ["ExtendedProfile", "AuthUser"],
    }),

    // get extend profile
    getExtendedProfile: builder.query({
      query: (url) => ({
        url: url,
        method: "POST",
        body: {},
      }),
      providesTags: ["ExtendedProfile"],
    }),

    // extend profile update
    extendedProfileUpdate: builder.mutation({
      query: (credential) => ({
        url: "extended_profile/edit",
        method: "POST",
        body: credential,
      }),
      invalidatesTags: ["ExtendedProfile"],
    }),

    // business profile create
    businessProfileCreate: builder.mutation({
      query: (credential) => ({
        url: "company/create",
        method: "POST",
        body: credential,
      }),
      invalidatesTags: ["BusinessProfile", "AuthUser"],
    }),

    // get business profile
    getBusinessProfile: builder.query({
      query: (url) => ({
        url: url,
        method: "POST",
        body: {},
      }),
      providesTags: ["BusinessProfile"],
    }),

    // business profile update
    businessProfileUpdate: builder.mutation({
      query: (credential) => ({
        url: "company/edit",
        method: "POST",
        body: credential,
      }),
      invalidatesTags: ["BusinessProfile"],
    }),

    // get personal profile
    getPersonalProfile: builder.query({
      query: (url) => ({
        url: url,
        method: "POST",
        body: {},
      }),
      providesTags: ["BusinessProfile"],
    }),

    // personal profile update
    personalProfileUpdate: builder.mutation({
      query: (credential) => ({
        url: "user/edit",
        method: "POST",
        body: credential,
      }),
      invalidatesTags: ["BusinessProfile"],
    }),
  }),
});

export const {
  useExtendedProfileCreateMutation,
  useGetExtendedProfileQuery,
  useExtendedProfileUpdateMutation,
  useBusinessProfileCreateMutation,
  useGetBusinessProfileQuery,
  useBusinessProfileUpdateMutation,
  useGetPersonalProfileQuery,
  usePersonalProfileUpdateMutation,
} = profileApi;
