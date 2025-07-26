import { createSlice } from "@reduxjs/toolkit";
import { REHYDRATE } from "redux-persist";

const initialState = {
  loading: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.loading = false;
    },
    logout: (state) => {
      state.user = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(REHYDRATE, (state, action) => {
      return {
        ...state,
        ...action.payload?.auth,
        loading: false, // prevent stuck spinner
      };
    });
  },
});

export const { setLoading, setUser, logout } = authSlice.actions;
export default authSlice.reducer;
