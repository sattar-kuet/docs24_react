import { createSlice } from "@reduxjs/toolkit";

// credential from storage
// const credential = JSON.parse(localStorage.getItem("credential"))
//   ? JSON.parse(localStorage.getItem("credential"))
//   : null;

// userInfo from storage
const userInfo = JSON.parse(localStorage.getItem("userInfo"))
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

// authUser from storage
// const authUser = JSON.parse(localStorage.getItem("authUser"))
//   ? JSON.parse(localStorage.getItem("authUser"))
//   : null;

// authUser from storage
// const resetUser = JSON.parse(sessionStorage.getItem("resetUser"))
//   ? JSON.parse(sessionStorage.getItem("resetUser"))
//   : null;

const authSlice = createSlice({
  name: "auth",
  initialState: {
    userInfo,
    userCheckInfo: null,
    // credential,
    // authUser,
    // resetUser,
  },
  reducers: {
    // userRegisterd: (state, actions) => {
    //   state.credential = actions.payload;
    //   localStorage.setItem("credential", JSON.stringify(state.credential));
    // },
    // userRegisterdVerifiedDone: (state, actions) => {
    //   state.credential.is_verified = actions.payload;
    //   localStorage.setItem("credential", JSON.stringify(state.credential));
    // },

    // user login
    userLoggedIn: (state, actions) => {
      state.userInfo = actions.payload;
    },

    // user checkd
    userCheckedIn: (state, actions) => {
      state.userCheckInfo = actions.payload;
    },

    // userAuthenticated: (state, actions) => {
    //   state.authUser = actions.payload;
    //   localStorage.setItem("authUser", JSON.stringify(state.authUser));
    // },
    // userExtendedProdileDone: (state, actions) => {
    //   state.authUser.is_complete = actions.payload;
    //   localStorage.setItem("authUser", JSON.stringify(state.authUser));
    // },

    // userExtendedBusinessProfileDone: (state, actions) => {
    //   state.authUser.is_complete = actions.payload;
    //   localStorage.setItem("authUser", JSON.stringify(state.authUser));
    // },

    // userExtendedBusinessProfileStatus: (state, actions) => {
    //   state.authUser.status = actions.payload;
    //   localStorage.setItem("authUser", JSON.stringify(state.authUser));
    // },
    // resetUserCredential: (state, actions) => {
    //   state.resetUser = actions.payload;
    //   sessionStorage.setItem("resetUser", JSON.stringify(state.resetUser));
    // },

    // resetUserVerifiedDone: (state, actions) => {
    //   state.resetUser.is_verified = actions.payload;
    //   sessionStorage.setItem("resetUser", JSON.stringify(state.resetUser));
    // },

    // resetUserClear: (state) => {
    //   state.resetUser = null;
    //   sessionStorage.removeItem("resetUser");
    // },

    userLoggedOut: (state) => {
      state.userInfo = null;
      state.userCheckInfo = null;
      localStorage.removeItem("userInfo");
      // localStorage.removeItem("credential");
      // localStorage.removeItem("authUser");
      // sessionStorage.removeItem("resetUser");
    },
  },
});

export const {
  // userRegisterd,
  // userRegisterdVerifiedDone,
  userLoggedIn,
  userCheckedIn,
  // userAuthenticated,
  // userExtendedProdileDone,
  // userExtendedBusinessProfileDone,
  // userExtendedBusinessProfileStatus,
  // resetUserCredential,
  // resetUserVerifiedDone,
  // resetUserClear,
  userLoggedOut,
} = authSlice.actions;
export default authSlice.reducer;
