import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "/dm/",
  }),
  tagTypes: [
    "AuthUser",
    "ExtendedProfile",
    "BusinessProfile",
    "Contact",
    "Employee",
    "Signature",
    "Email",
    "Job",
  ],
  endpoints: () => ({}),
});
