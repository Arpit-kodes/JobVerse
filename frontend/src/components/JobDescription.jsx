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

  const { id: jobId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });
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
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(res.data.job.applications.some(app => app.applicant === user?._id));
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  if (!singleJob) return null;

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-black to-zinc-900 py-10 px-6 md:px-12 text-white">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition"
      >
        <ArrowLeft size={18} /> Back
      </button>

      <div className="bg-zinc-900 border border-zinc-700 rounded-2xl shadow-xl p-8 max-w-6xl mx-auto w-full">
        {/* Job Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-3 text-white">{singleJob?.title}</h1>
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
            onClick={!isApplied ? applyJobHandler : undefined}
            disabled={isApplied}
            className={`px-6 py-2 text-sm font-semibold rounded-xl transition-all duration-200 shadow-md
              ${
                isApplied
                  ? 'bg-zinc-700 cursor-not-allowed text-zinc-400'
                  : 'bg-gradient-to-r from-zinc-500 to-zinc-300 hover:from-zinc-400 hover:to-white text-black'
              }
            `}
          >
            {isApplied ? 'Already Applied' : 'Apply Now'}
          </button>
        </div>

        {/* Job Details */}
        <div className="space-y-5 text-zinc-300 text-sm md:text-base">
          <InfoRow label="Company" value={singleJob?.company?.name || 'Not specified'} />
          <InfoRow label="Location" value={singleJob?.location || 'Remote / Not specified'} />
          <InfoRow label="Experience" value={`${singleJob?.experience || 0} yrs`} />
          <InfoRow label="Salary" value={`₹ ${singleJob?.salary} LPA`} />
          <InfoRow label="Total Applicants" value={singleJob?.applications?.length || 0} />
          <InfoRow
            label="Posted Date"
            value={singleJob?.createdAt?.split('T')[0] || 'N/A'}
          />

          <div className="pt-2">
            <h3 className="font-semibold text-zinc-400 mb-2 text-lg">Job Description</h3>
            <p className="leading-relaxed text-zinc-200">{singleJob?.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Info Row
const InfoRow = ({ label, value }) => (
  <p>
    <span className="font-semibold text-zinc-400">{label}: </span>
    <span className="text-zinc-200">{value}</span>
  </p>
);

export default JobDescription;
