import React from 'react';
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';

const LatestJobs = () => {
  const { allJobs, loading } = useSelector(store => store.job);

  const sortedJobs = [...allJobs].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <section className="bg-gradient-to-b from-black via-[#111] to-black py-20 px-4">
      <div className="max-w-7xl mx-auto text-white">
        {/* 🧠 Section Title */}
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-snug">
            <span className="text-gray-100">Latest</span>{' '}
            <span className="text-gray-300">Opportunities</span> from{' '}
            <span className="text-gray-400">Top Companies</span>
          </h2>
          <p className="text-gray-400 mt-3 text-md md:text-lg max-w-2xl mx-auto">
            Explore trending job openings hand-picked to boost your career.
          </p>
        </div>

        {/* 🧩 Job Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            <div className="col-span-full text-center text-gray-400 text-lg animate-pulse">
              Loading latest jobs...
            </div>
          ) : sortedJobs.length === 0 ? (
            <div className="col-span-full text-center text-gray-500 text-lg">
              🚫 No jobs available right now. Check back soon!
            </div>
          ) : (
            sortedJobs.slice(0, 6).map((job) => (
              <div
                key={job._id}
                className="bg-[#1a1a1a] border border-[#2e2e2e] p-5 rounded-2xl shadow hover:shadow-white/10 transition-shadow duration-300"
              >
                <LatestJobCards job={job} />
              </div>
            ))
          )}
        </div>

        {/* 🔗 View All Button */}
        {!loading && sortedJobs.length > 6 && (
          <div className="text-center mt-10">
            <a
              href="/browse"
              className="inline-block px-6 py-3 rounded-full border border-gray-500 text-gray-300 hover:bg-white hover:text-black transition duration-200"
            >
              View All Jobs
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default LatestJobs;
