import React, { useEffect, useState } from 'react';
import { Badge } from './ui/badge';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { ArrowLeft } from 'lucide-react';

const JobDescription = () => {
  const { singleJob } = useSelector(store => store.job);
  const { user } = useSelector(store => store.auth);
  const [isApplied, setIsApplied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);

  const { id: jobId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  const applyJobHandler = async () => {
    if (!jobId) return toast.error("Invalid job ID");

    try {
      setApplying(true);
      const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {}, {
        withCredentials: true,
      });

      if (res.data.success) {
        setIsApplied(true);
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedSingleJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something went wrong');
    } finally {
      setApplying(false);
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(res.data.job.applications.some(app => app.applicant === user?._id));
        }
      } catch (error) {
        console.error('Error fetching job:', error);
      } finally {
        setTimeout(() => setLoading(false), 300);
      }
    };

    if (user) fetchSingleJob();
  }, [jobId, dispatch, user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="w-full max-w-5xl px-6 animate-pulse space-y-6">
          <div className="h-6 w-1/3 bg-zinc-800 rounded-md"></div>
          <div className="h-8 w-2/3 bg-zinc-800 rounded-md"></div>
          <div className="h-40 bg-zinc-800 rounded-xl"></div>
          <div className="h-20 bg-zinc-800 rounded-lg"></div>
        </div>
      </div>
    );
  }

  if (!singleJob) return null;

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-black via-zinc-900 to-zinc-800 py-10 px-6 md:px-12 text-white">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 text-sm text-gray-400 hover:text-white transition"
      >
        <ArrowLeft size={18} /> Back
      </button>

      <div className="bg-zinc-950 border border-zinc-700 rounded-2xl shadow-lg p-8 max-w-6xl mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-4 text-white">{singleJob?.title}</h1>
            <div className="flex flex-wrap gap-3">
              <Badge className="bg-zinc-800 border border-zinc-700 text-white">
                {singleJob?.position || 1} Position{singleJob?.position > 1 ? 's' : ''}
              </Badge>
              <Badge className="bg-zinc-800 border border-zinc-700 text-white">
                {singleJob?.jobType}
              </Badge>
              <Badge className="bg-zinc-800 border border-zinc-700 text-white">
                ₹ {singleJob?.salary} LPA
              </Badge>
            </div>
          </div>

          <button
            onClick={!isApplied && !applying ? applyJobHandler : undefined}
            disabled={isApplied || applying}
            className={`px-6 py-2 text-sm font-semibold rounded-xl transition-all duration-200 shadow-md
              ${
                isApplied || applying
                  ? 'bg-zinc-700 cursor-not-allowed text-zinc-400'
                  : 'bg-gradient-to-r from-white to-zinc-400 hover:from-gray-200 hover:to-white text-black'
              }
            `}
          >
            {isApplied ? 'Already Applied' : applying ? 'Applying...' : 'Apply Now'}
          </button>
        </div>

        <div className="space-y-5 text-gray-300 text-sm md:text-base leading-relaxed">
          <InfoRow label="Company" value={singleJob?.company?.name || 'Not specified'} />
          <InfoRow label="Location" value={singleJob?.location || 'Remote / Not specified'} />
          <InfoRow label="Experience" value={`${singleJob?.experienceLevel || 0} yrs`} />
          <InfoRow label="Salary" value={`₹ ${singleJob?.salary} LPA`} />
          <InfoRow label="Total Applicants" value={singleJob?.applications?.length || 0} />
          <InfoRow label="Posted Date" value={singleJob?.createdAt?.split('T')[0] || 'N/A'} />

          <div className="pt-4">
            <h3 className="font-semibold text-gray-400 mb-2 text-lg">Job Description</h3>
            <p className="text-gray-200">{singleJob?.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoRow = ({ label, value }) => (
  <p>
    <span className="font-semibold text-gray-400">{label}: </span>
    <span className="text-gray-100">{value}</span>
  </p>
);

export default JobDescription;
