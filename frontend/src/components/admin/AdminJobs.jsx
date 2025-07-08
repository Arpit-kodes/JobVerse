import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import AdminJobsTable from './AdminJobsTable';
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs';
import { setSearchJobByText } from '@/redux/jobSlice';

const AdminJobs = () => {
  useGetAllAdminJobs();
  const [input, setInput] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input]);

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
          <Input
            className="w-full md:w-1/2 bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-400 focus:ring-2 focus:ring-zinc-600"
            placeholder="Search by name or role..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            onClick={() => navigate('/admin/jobs/create')}
            className="bg-zinc-800 hover:bg-zinc-700 text-white transition px-6 py-2"
          >
            + New Job
          </Button>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 shadow-lg">
          <AdminJobsTable />
        </div>
      </div>
    </div>
  );
};

export default AdminJobs;
