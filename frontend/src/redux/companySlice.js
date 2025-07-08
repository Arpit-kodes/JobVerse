import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ✅ Set the correct base URL for your backend running on port 8000
axios.defaults.baseURL = "http://localhost:8000/api/v1";

// ✅ Async thunk to delete a company
export const deleteCompanyById = createAsyncThunk(
  "company/deleteCompanyById",
  async (companyId, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth?.token;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      };

      await axios.delete(`/company/delete/${companyId}`, config);
      return companyId;
    } catch (err) {
      const message = err.response?.data?.message || "Error deleting company";
      return rejectWithValue(message);
    }
  }
);

const companySlice = createSlice({
  name: "company",
  initialState: {
    singleCompany: null,
    companies: [],
    searchCompanyByText: "",
    loading: false,
    error: null,
  },
  reducers: {
    setSingleCompany: (state, action) => {
      state.singleCompany = action.payload;
    },
    setCompanies: (state, action) => {
      state.companies = action.payload;
    },
    setSearchCompanyByText: (state, action) => {
      state.searchCompanyByText = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteCompanyById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCompanyById.fulfilled, (state, action) => {
        state.loading = false;
        state.companies = state.companies.filter(
          (company) => company._id !== action.payload
        );
      })
      .addCase(deleteCompanyById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setSingleCompany,
  setCompanies,
  setSearchCompanyByText,
} = companySlice.actions;

export default companySlice.reducer;
