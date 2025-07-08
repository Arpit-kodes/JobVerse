import React, { useEffect, useState } from 'react';
import Navbar from './shared/Navbar';
import FilterCard from './FilterCard';
import Job from './Job';
import { useSelector, useDispatch } from 'react-redux';
import { getAllJobs } from '@/redux/jobSlice';
import { motion } from 'framer-motion';
 
const Jobs = () => {
  const dispatch = useDispatch();
  const { allJobs, searchedQuery, loading } = useSelector(store => store.job);
  const [filterJobs, setFilterJobs] = useState([]);

  useEffect(() => {
    dispatch(getAllJobs());
  }, [dispatch]);

  useEffect(() => {
    let jobs = [...allJobs];
    jobs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // newest first

    // --- Salary Range Filtering ---
    if (searchedQuery?.salaryRange) {
      const { min, max } = searchedQuery.salaryRange;
      jobs = jobs.filter(job => job.salary >= min && job.salary <= max);
    }

    // --- Role Filtering ---
    if (searchedQuery?.role) {
      const roleQuery = searchedQuery.role.toLowerCase();
      jobs = jobs.filter(job =>
        job.title.toLowerCase().includes(roleQuery)
      );
    }

    // --- Location Filtering ---
    if (searchedQuery?.location) {
      const locationQuery = searchedQuery.location.toLowerCase();
      jobs = jobs.filter(job =>
        job.location.toLowerCase().includes(locationQuery)
      );
    }

    // --- Keyword Filtering (fallback if passed as string or keyword key) ---
    const keyword = typeof searchedQuery === 'string'
      ? searchedQuery
      : searchedQuery?.keyword || '';

    if (keyword.trim()) {
      const query = keyword.toLowerCase();
      jobs = jobs.filter(job =>
        job.title.toLowerCase().includes(query) ||
        job.description.toLowerCase().includes(query) ||
        job.location.toLowerCase().includes(query)
      );
    }

    setFilterJobs(jobs);
  }, [allJobs, searchedQuery]);

  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />
      <div className="max-w-7xl mx-auto mt-6 px-4">
        <div className="flex gap-6">

          {/* Sidebar Filter */}
          <aside className="w-1/4 hidden md:block">
            <FilterCard />
          </aside>

          {/* Jobs List */}
          <main className="flex-1 h-[88vh] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-zinc-700">
            {loading ? (
              <p className="text-gray-400 text-center mt-10">Loading jobs...</p>
            ) : filterJobs.length <= 0 ? (
              <p className="text-gray-400 text-center mt-10">No jobs found.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filterJobs.map((job) => (
                  <motion.div
                    key={job?._id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.3 }}
                    className="h-full flex"
                  >
                    <div className="w-full h-full">
                      <Job job={job} />
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
