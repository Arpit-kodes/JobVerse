import React, { useEffect } from 'react';
import Navbar from '../shared/Navbar';
import ApplicantsTable from './ApplicantsTable';
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAllApplicants } from '@/redux/applicationSlice';

const Applicants = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { applicants } = useSelector((store) => store.application);

  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(`${APPLICATION_API_END_POINT}/${id}/applicants`, {
          withCredentials: true,
        });
        dispatch(setAllApplicants(res.data.applicants));
      } catch (error) {
        console.error('Failed to fetch applicants:', error);
      }
    };

    fetchAllApplicants();
  }, [id, dispatch]);

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl sm:text-3xl font-semibold text-white">
            📄 Applicants
          </h1>
          <span className="text-zinc-400 text-sm sm:text-base">
            Total: {applicants?.length || 0}
          </span>
        </div>

        {/* Applicants Table */}
        <div className="bg-zinc-900 border border-zinc-700 rounded-md shadow-md overflow-hidden">
          <ApplicantsTable />
        </div>
      </div>
    </div>
  );
};

export default Applicants;
