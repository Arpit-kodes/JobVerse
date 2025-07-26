import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  user: JSON.parse(localStorage.getItem("user")) || null,
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
      localStorage.setItem("user", JSON.stringify(action.payload));
      state.loading = false; // ✅ Important to stop loading spinner
    },
    logout: (state) => {
      state.user = null;
      state.loading = false;
      localStorage.removeItem("user");
    },
  },
});

export const { setLoading, setUser, logout } = authSlice.actions;
export default authSlice.reducer;
