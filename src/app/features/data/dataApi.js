import { apiSlice } from "../api/apiSlice";

export const dataApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // get position data
    getPositions: builder.query({
      query: () => ({
        url: "position/list",
        method: "POST",
        body: {},
      }),
    }),

    // get countries data
    getCountries: builder.query({
      query: () => ({
        url: "location/country",
        method: "POST",
        body: {},
      }),
    }),

    // get state or city data
    getCity: builder.query({
      query: (url) => ({
        url: url,
        method: "POST",
        body: {},
      }),
    }),

    // get categories data
    getCategories: builder.query({
      query: () => ({
        url: "company/categories",
        method: "POST",
        body: {},
      }),
    }),
  }),
});

export const {
  useGetPositionsQuery,
  useGetCountriesQuery,
  useGetCityQuery,
  useGetCategoriesQuery,
} = dataApi;
