import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./features/api/apiSlice";
import authSlice, { userLoggedOut } from "./features/auth/authSlice";

// reducers
const reducers = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: authSlice,
});

// store configure
export const store = configureStore({
  reducer: (state, action) => {
    if (userLoggedOut.match(action)) {
      state = undefined;
    }
    return reducers(state, action);
  },

  // middlewares
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),

  // devtools hide in production mode
  devTools: import.meta.env.DEV,
});
