import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'

// 🔁 Async Thunk: Fetch all jobs from backend
export const getAllJobs = createAsyncThunk('job/getAllJobs', async (_, { rejectWithValue }) => {
  try {
    const res = await axios.get(`${USER_API_END_POINT}/job/all-jobs`, {
      withCredentials: true,
    });
    return res.data.jobs; // assuming API returns { jobs: [...] }
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || "Failed to fetch jobs");
  }
});

const jobSlice = createSlice({
  name: 'job',
  initialState: {
    allJobs: [],
    allAdminJobs: [],
    singleJob: null,
    searchJobByText: '',
    allAppliedJobs: [],
    searchedQuery: '',
    loading: false,
    error: null,
  },
  reducers: {
    setAllJobs: (state, action) => {
      state.allJobs = action.payload;
    },
    setSingleJob: (state, action) => {
      state.singleJob = action.payload;
    },
    setAllAdminJobs: (state, action) => {
      state.allAdminJobs = action.payload;
    },
    setSearchJobByText: (state, action) => {
      state.searchJobByText = action.payload;
    },
    setAllAppliedJobs: (state, action) => {
      state.allAppliedJobs = action.payload;
    },

    // ✅ Enhanced filtering logic to support merging salary and keyword filters
    setSearchedQuery: (state, action) => {
      const payload = action.payload;

      // If the payload is an object (like { salaryRange: {min, max} }), merge it
      if (typeof payload === 'object' && payload !== null && !Array.isArray(payload)) {
        if (typeof state.searchedQuery === 'object') {
          state.searchedQuery = { ...state.searchedQuery, ...payload };
        } else {
          state.searchedQuery = { ...payload };
        }
      } else {
        // If it's a string (from Hero input or Category click), store separately
        state.searchedQuery = payload;
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getAllJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.allJobs = action.payload;
      })
      .addCase(getAllJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const {
  setAllJobs,
  setSingleJob,
  setAllAdminJobs,
  setSearchJobByText,
  setAllAppliedJobs,
  setSearchedQuery
} = jobSlice.actions;

export default jobSlice.reducer;
