import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setAllJobs } from '@/redux/jobSlice';
import { JOB_API_END_POINT } from '@/utils/constant';

const useGetAllJobs = () => {
  const dispatch = useDispatch();
  const { searchedQuery } = useSelector((store) => store.job);

  const fetchAllJobs = async (customKeyword = null) => {
    try {
      const keyword = customKeyword !== null ? customKeyword : searchedQuery || '';
      const res = await axios.get(
        `${JOB_API_END_POINT}/all-jobs?keyword=${encodeURIComponent(keyword)}`,
        { withCredentials: true }
      );
      if (res.data.success) {
        dispatch(setAllJobs(res.data.jobs));
      }
    } catch (error) {
      console.error("❌ Error fetching all jobs:", error?.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchAllJobs();
  }, [searchedQuery]);

  return { fetchAllJobs };
};

export default useGetAllJobs;
