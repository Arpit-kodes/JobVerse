import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { JOB_API_END_POINT } from '@/utils/constant';

// ✅ Fetch all jobs with optional keyword
export const getAllJobs = createAsyncThunk(
  'job/getAllJobs',
  async (keyword = "", { rejectWithValue }) => {
    try {
      const res = await axios.get(`${JOB_API_END_POINT}/all-jobs?keyword=${keyword}`, {
        withCredentials: true,
      });
      return res.data.jobs;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch jobs');
    }
  }
);

// ✅ Fetch admin's jobs
export const getAdminJobs = createAsyncThunk(
  'job/getAdminJobs',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${JOB_API_END_POINT}/getadminjobs`, {
        withCredentials: true,
      });
      return res.data.jobs;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch admin jobs');
    }
  }
);

// ✅ Delete job by ID
export const deleteJobById = createAsyncThunk(
  'job/deleteJobById',
  async (jobId, { rejectWithValue }) => {
    try {
      await axios.delete(`${JOB_API_END_POINT}/delete/${jobId}`, {
        withCredentials: true,
      });
      return jobId;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to delete job');
    }
  }
);

// ✅ Job Slice
const jobSlice = createSlice({
  name: 'job',
  initialState: {
    allJobs: [],
    allAdminJobs: [],
    allAppliedJobs: [],
    singleJob: null,
    searchedQuery: "",
    loading: false,
    error: null,
  },
  reducers: {
    setSingleJob: (state, action) => {
      state.singleJob = action.payload;
    },
    setSearchedQuery: (state, action) => {
      state.searchedQuery = action.payload;
    },
    setSearchJobByText: (state, action) => {
      state.searchedQuery = action.payload;
    },
    setAllJobs: (state, action) => {
      state.allJobs = action.payload;
    },
    setAllAppliedJobs: (state, action) => {
      state.allAppliedJobs = action.payload;
    },
    setAllAdminJobs: (state, action) => {
      state.allAdminJobs = action.payload;
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
      })

      .addCase(getAdminJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAdminJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.allAdminJobs = action.payload;
      })
      .addCase(getAdminJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteJobById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteJobById.fulfilled, (state, action) => {
        const jobId = action.payload;
        state.loading = false;
        state.allAdminJobs = state.allAdminJobs.filter((job) => job._id !== jobId);
        state.allJobs = state.allJobs.filter((job) => job._id !== jobId);
      })
      .addCase(deleteJobById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setSingleJob,
  setSearchedQuery,
  setSearchJobByText,
  setAllJobs,
  setAllAppliedJobs,
  setAllAdminJobs,
} = jobSlice.actions;

export default jobSlice.reducer;
